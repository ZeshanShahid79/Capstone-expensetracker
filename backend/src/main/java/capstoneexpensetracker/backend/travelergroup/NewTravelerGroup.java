package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;

import java.util.List;

public record NewTravelerGroup(
        String description,
        List<Traveler> travelerList

) {


    public TravelerGroup withId(String id) {
        TravelerGroup travelerGroup = new TravelerGroup(description(), travelerList(), id);
        return travelerGroup;
    }


}
