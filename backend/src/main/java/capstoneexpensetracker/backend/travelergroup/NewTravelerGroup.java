package capstoneexpensetracker.backend.travelergroup;

import java.math.BigDecimal;
import java.util.Map;

public record NewTravelerGroup(
        String description,
        Map<String, BigDecimal> travelerList

) {


    public TravelerGroup withId(String id) {
        TravelerGroup travelerGroup = new TravelerGroup(description(), travelerList(), id);
        return travelerGroup;
    }


}
