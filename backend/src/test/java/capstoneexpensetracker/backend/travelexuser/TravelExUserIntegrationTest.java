package capstoneexpensetracker.backend.travelexuser;

import capstoneexpensetracker.backend.security.TravelExUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TravelExUserIntegrationTest {
    @Autowired
    private MockMvc mockMvc;


    String base64ClientCredentials = new String(Base64.encodeBase64("user:SuperSecret344$$".getBytes()));
    String base64ClientCredentials2 = new String(Base64.encodeBase64("frank:SuperSecret344$$".getBytes()));

    @DirtiesContext
    @Test
    void addTravelExUser() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "Test123!"}
                                """))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void loginWithTestUser() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "Test123!"}
                                """))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void loginWithTestUserAndLogout() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "Test123!"}
                                """))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/logout")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login"))
                .andExpect(status().isOk());
    }


    @DirtiesContext
    @Test
    @WithMockUser
    void getTravelExUser() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "Test123!"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TravelExUser travelExUser = objectMapper.readValue(content, TravelExUser.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/" + travelExUser.username())
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "passwordBcrypt": "<passwordBcrypt>"
                                                    }
                        """.replace("<id>", travelExUser.id()).replace("<passwordBcrypt>", travelExUser.passwordBcrypt())));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getTravelExUserWithFalseUser() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/asd")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isUnauthorized());
    }


    @DirtiesContext
    @Test
    void updateTravelExUser() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TravelExUser travelExUser = objectMapper.readValue(content, TravelExUser.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));


        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/user")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "passwordBcrypt": "<passwordBcrypt>"
                                                    }
                        """.replace("<id>", travelExUser.id()).replace("<passwordBcrypt>", travelExUser.passwordBcrypt())));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/travelex-users/" + travelExUser.id())
                .header("Authorization", "Basic " + base64ClientCredentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "id": "<id>",
                        "username": "frank"
                        }
                        """.replace("<id>", travelExUser.id())));


        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/frank")
                        .header("Authorization", "Basic " + base64ClientCredentials2)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "frank",
                                                    "passwordBcrypt": "<passwordBcrypt>"
                                                    }
                        """.replace("<id>", travelExUser.id()).replace("<passwordBcrypt>", travelExUser.passwordBcrypt())));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateUserWithFalseId() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TravelExUser travelExUser = objectMapper.readValue(content, TravelExUser.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/user")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "passwordBcrypt": "<passwordBcrypt>"
                                                    }
                        """.replace("<id>", travelExUser.id()).replace("<passwordBcrypt>", travelExUser.passwordBcrypt())));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/travelex-users/" + travelExUser.id())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "id": "123123123123",
                        "username": "user12"
                        }
                        """)).andExpect(status().isBadRequest());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void deleteUser() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TravelExUser travelExUser = objectMapper.readValue(content, TravelExUser.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/user")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "passwordBcrypt": "<passwordBcrypt>"
                                                    }
                        """.replace("<id>", travelExUser.id()).replace("<passwordBcrypt>", travelExUser.passwordBcrypt())));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/travelex-users/" + travelExUser.id()))
                .andExpect(status().isNoContent());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void deleteUserException() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelex-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TravelExUser travelExUser = objectMapper.readValue(content, TravelExUser.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("user"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelex-users/user")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "passwordBcrypt": "<passwordBcrypt>"
                                                    }
                        """.replace("<id>", travelExUser.id()).replace("<passwordBcrypt>", travelExUser.passwordBcrypt())));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/travelex-users/34234234234"))
                .andExpect(status().isNotFound());
    }
}

