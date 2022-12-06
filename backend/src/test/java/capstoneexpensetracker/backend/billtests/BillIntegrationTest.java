package capstoneexpensetracker.backend.billtests;

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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BillIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @DirtiesContext
    @Test
    void getGroupBillAndExpectToGetASum() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        String body = mockMvc.perform(MockMvcRequestBuilders.post("/api/traveler-groups").contentType(MediaType.APPLICATION_JSON).content("""
                      {
                      "description": "test",
                                    "travelerList": [{"id":"123","amount": 0.2}]
                                }
                """)).andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        TravelerGroup travelerGroup = objectMapper.readValue(body, TravelerGroup.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/bill/" + travelerGroup.id()).contentType(MediaType.APPLICATION_JSON).content("""
                {
                    "sum": 0.2
                }
                """));

    }
}
