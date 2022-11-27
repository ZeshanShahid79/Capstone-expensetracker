package capstoneexpensetracker.backend.travelergroup;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

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

    @DeleteMapping("{id}")
    TravelerGroup deleteTravelerGroup(@PathVariable String id) {
        try {
            return travelerGroupService.deleteTravelerGroup(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }
}
