package capstoneexpensetracker.backend.travelergroup;

import java.util.List;

public record NewTravelerGroup(
        String description,
        List<String> travelerList

) {


    public TravelerGroup withId(String id) {
        TravelerGroup travelerGroup = new TravelerGroup(description(), travelerList(), id);
        return travelerGroup;
    }


}
