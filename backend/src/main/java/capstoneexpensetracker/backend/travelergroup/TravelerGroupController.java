package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    TravelerGroup addTravelerGroup(@RequestBody NewTravelerGroup newTravelerGroup) {
        return travelerGroupService.addTravelerGroup(newTravelerGroup);
    }

    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void deleteTraveler(@PathVariable String id) {
        travelerGroupService.deleteTravelerGroup(id);

    }

    @PutMapping("{id}")
    TravelerGroup updateTravelerGroup(@PathVariable String id, @RequestBody TravelerGroup travelerGroup) {

        if (travelerGroup.id().equals(id)) {
            return travelerGroupService.updateTravelerGroupById(id, travelerGroup);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

    }

    @GetMapping("{travelerGroupId}/travelers")
    List<Traveler> getTravelersByGroupId(@PathVariable String travelerGroupId) {
        return travelerGroupService.getTravelersByGroupId(travelerGroupId);
    }
}
