package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;

import java.util.List;

public record NewTravelerGroup(
        List<Traveler> travelerList
) {


    public TravelerGroup withId(String id) {
        TravelerGroup travelerGroup = new TravelerGroup(travelerList(), id);
        return travelerGroup;
    }


}
