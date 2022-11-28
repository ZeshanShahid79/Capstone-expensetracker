package capstoneexpensetracker.backend.travelergrouptests;

import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
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
class TravelerGroupIntegrationTest {

    @Autowired
    private MockMvc mockMvc;


    @DirtiesContext
    @Test
    void getAllTravelerGroupsAndExpectEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/traveler-groups")).andExpect(status().isOk()).andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void addTravelerGroup() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        //GIVEN

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/traveler-groups").contentType(MediaType.APPLICATION_JSON).content("""
                {"travelerList":[{"name":"peter","id":"123"}]}
                """)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body, TravelerGroup.class);

        //WHEN

        mockMvc.perform(MockMvcRequestBuilders.get("/api/traveler-groups"))

                //THEN

                .andExpect(status().isOk()).andExpect(content().json("""
                        [{
                            "travelerList": [
                                {
                                    "name": "peter",
                                    "id": "123"
                                }
                            ],
                            "id": "<id>"
                        }]
                        """.replace("<id>", travelerGroup.id())));
    }

    @Test
    @DirtiesContext
    void deleteTravelerByIdIsSuccessful() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/traveler-groups")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                        {
                                        "description": "test",
                                    "travelerList": [
                                        {
                                            "name": "peter",
                                            "id": "123"
                                        }
                                    ]
                                }
                                        """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body, TravelerGroup.class);

        mockMvc
                .perform(MockMvcRequestBuilders.delete("/api/traveler-groups/" + travelerGroup.id()))
                .andExpect(status().isOk());
    }

//    @Test
//    @DirtiesContext
//    void deleteTravelerGroupByIdNotFound() throws Exception {
//
//        mockMvc.perform(MockMvcRequestBuilders.delete("/api/traveler-groups/954ujfew90ru30rfi0332345")).andExpect(status().isNotFound());
//    }
}
