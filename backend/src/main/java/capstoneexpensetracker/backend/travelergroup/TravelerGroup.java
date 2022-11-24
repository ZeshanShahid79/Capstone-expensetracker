package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;

import java.util.List;

public record TravelerGroup(
        List<Traveler> travelerList,
        String id
) {
}
