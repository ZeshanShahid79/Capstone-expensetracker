package capstoneexpensetracker.backend.travelergroup;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/traveler-groups")
@RequiredArgsConstructor
public class TravelerGroupController {

    private final TravelerGroupService travelerGroupService;

    @GetMapping
    List<TravelerGroup> displayTravelerGroupList() {
        return travelerGroupService.displayTravelerGroupList();
    }

    @PostMapping
    TravelerGroup addTravelerGroup(@RequestBody NewTravelerGroup newTravelerGroup) {
        return travelerGroupService.addTravelerGroup(newTravelerGroup);
    }
}
