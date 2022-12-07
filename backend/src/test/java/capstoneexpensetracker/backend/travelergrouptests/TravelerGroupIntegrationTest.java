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
                {"description":"mallorca",
                "travelerList": [{"id":"123","amount":0.1}]
                }
                """)).andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body, TravelerGroup.class);

        //WHEN

        mockMvc.perform(MockMvcRequestBuilders.get("/api/traveler-groups"))

                //THEN

                .andExpect(status().isOk()).andExpect(content().json("""
                        [{"description":"mallorca",
                            "travelerList": [{"id":"123","amount":0.1}],
                            "id": "<id>"
                        }]
                        """.replace("<id>", travelerGroup.id())));
    }

    @Test
    @DirtiesContext
    void deleteTravelerByIdIsSuccessful() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/traveler-groups").contentType(MediaType.APPLICATION_JSON).content("""
                        {
                        "description": "test",
                    "travelerList": [{"id":"123","amount": 0.2}]
                }
                        """)).andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body, TravelerGroup.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/traveler-groups/" + travelerGroup.id())).andExpect(status().isNoContent());
    }

    @Test
    @DirtiesContext
    void deleteTravelerGroupByIdNotFound() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/traveler-groups/954ujfew90ru30rfi0332345")).andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void putRequestUpdateTravelerGroupData() throws Exception {

        // GIVEN

        ObjectMapper objectMapper = new ObjectMapper();

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/traveler-groups").contentType(MediaType.APPLICATION_JSON).content("""
                        {
                        "description": "test",
                    "travelerList": [{"id":"123","amount": 0.2}]
                }
                        """)).andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body, TravelerGroup.class);

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/traveler-groups/" + travelerGroup.id()).contentType(MediaType.APPLICATION_JSON).content("""
                        {
                                                "description": "mallorca 2022",
                                            "travelerList": [{"id":"123","amount": 0.2}],
                                            "id": "<id>"
                                        }
                        """.replace("<id>", travelerGroup.id())))

                //THEN
                .andExpect(status().isOk()).andExpect(content().json("""
                        {
                                                "description": "mallorca 2022",
                                            "travelerList": [{"id":"123","amount": 0.2}],
                                            "id": "<id>"
                                        }
                        """.replace("<id>", travelerGroup.id())));

    }

    @Test
    @DirtiesContext
    void putRequestUpdateTravelerGroupWithBadRequest() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.put("/api/traveler-groups/1").contentType(MediaType.APPLICATION_JSON).content("""
                        {
                        "description": "test",
                    "travelerList": [{"id":"123","amount": 0}],
                    "id": "2"
                }
                        """)).andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    void putRequestUpdateTravelerGroupIsNotFound() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.put("/api/traveler-groups/1").contentType(MediaType.APPLICATION_JSON).content("""
                        {
                        "description": "test",
                    "travelerList": [{"id":"123","amount":0.2}],
                    "id": "1"
                }
                        """)).andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void getTravelersByGroupIdAndExpectEmptyList() throws Exception {
        // GIVEN

        ObjectMapper objectMapper = new ObjectMapper();

        String body1 = mockMvc.perform(MockMvcRequestBuilders.post("/api/traveler-groups").contentType(MediaType.APPLICATION_JSON).content("""
                        {
                     "description": "test",
                    "travelerList": []
                }
                        """)).andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body1, TravelerGroup.class);

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/traveler-groups/" + travelerGroup.id() + "/travelers"))
                .andExpect(status().isOk())
                .andExpect(content()
                        .json("""
                                []
                                """));
    }
}

