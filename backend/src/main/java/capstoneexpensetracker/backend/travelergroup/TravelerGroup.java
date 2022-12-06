package capstoneexpensetracker.backend.travelergroup;


import java.util.List;


public record TravelerGroup(
        String description,
        List<GroupMember> travelerList,
        String id
) {
}
