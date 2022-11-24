package capstoneexpensetracker.backend.travelergroup;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
