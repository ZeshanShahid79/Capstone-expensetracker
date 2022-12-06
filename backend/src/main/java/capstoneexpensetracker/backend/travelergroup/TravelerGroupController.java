package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;
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

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    TravelerGroup addTravelerGroup(@RequestBody NewTravelerGroup newTravelerGroup) {
        return travelerGroupService.addTravelerGroup(newTravelerGroup);
    }

    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void deleteTraveler(@PathVariable String id) {
        try {
            travelerGroupService.deleteTravelerGroup(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    TravelerGroup updateTravelerGroup(@PathVariable String id, @RequestBody TravelerGroup travelerGroup) {
        try {
            if (travelerGroup.id().equals(id)) {
                return travelerGroupService.updateTravelerGroupById(id, travelerGroup);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID does not exist");
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{travelerGroupId}/travelers")
    List<Traveler> getTravelersByGroupId(@PathVariable String travelerGroupId) {
        return travelerGroupService.getTravelersByGroupId(travelerGroupId);
    }
}
