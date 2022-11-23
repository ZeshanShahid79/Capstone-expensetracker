package capstoneexpensetracker.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class TravelerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;


    @DirtiesContext
    @Test
    void getAllTravelersAndExpectEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelers")).andExpect(status().isOk()).andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void addTraveler() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        //GIVEN

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelers").contentType(MediaType.APPLICATION_JSON).content("""
                {"name": "zeshan"}
                """)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        Traveler traveler = objectMapper.readValue(body, Traveler.class);

        //WHEN

        mockMvc.perform(MockMvcRequestBuilders.get("/api/travelers"))

                //THEN

                .andExpect(status().isOk()).andExpect(content().json("""
                        [{"name": "zeshan",
                        "id": "<id>"}]
                        """.replace("<id>", traveler.id())));
    }

    @Test
    @DirtiesContext
    void deleteTravelerByIdIsSuccessful() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstName": "test",
                                 "lastName": "test",
                                 "email": "test@gmail.com",
                                 "password": "SuperSecret344$$"
                                 }
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Traveler traveler = objectMapper.readValue(body, Traveler.class);

        mockMvc
                .perform(MockMvcRequestBuilders.delete("/api/travelers/" + traveler.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(body));
    }
    @Test
    @DirtiesContext
    void deleteTravelerByIdNotFound() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/travelers/954ujfew90ru30rfi033")).andExpect(status().isNotFound());
    }
    @Test
    @DirtiesContext
    void putRequestUpdateGuestData() throws Exception {

        // GIVEN
        ObjectMapper objectMapper = new ObjectMapper();

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/travelers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "test"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Traveler traveler = objectMapper.readValue(body, Traveler.class);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/travelers/" + traveler.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(("""
                                 {"name": "Simon",
                                 "id" :  "<id>"}
                                """.replace("<id>",traveler.id()))))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                         {"name": "Simon",
                                         "id" :  "<id>"}
                        """.replace("<id>",traveler.id())));
    }

    @Test
    @DirtiesContext
    void putRequestUpdateGuestDataWithBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/travelers/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "test",
                                "id" :  "<id>"}
                                    """))
                .andExpect(status().isBadRequest());
    }


    @Test
    @DirtiesContext
    void putRequestUpdateGuestNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/guests/1337")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstName": "test",
                                "lastName": "test",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$",
                                 "id" :  "1337"}
                                    """))
                .andExpect(status().isNotFound());
    }
}
