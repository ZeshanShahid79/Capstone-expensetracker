package capstoneexpensetracker.backend.traveler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/travelers")
@RequiredArgsConstructor
public class TravelerController {

    private final TravelerService travelerService;

    @GetMapping
    List<Traveler> displayTravelersList() {
        return travelerService.displayTravelersList();
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    Traveler addTraveler(@RequestBody NewTraveler newTraveler) {
        return travelerService.addTraveler(newTraveler);
    }

    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void deleteTraveler(@PathVariable String id) {
        try {
            travelerService.deleteTraveler(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    Traveler updateTraveler(@PathVariable String id, @RequestBody Traveler traveler) {
        try {
            if (traveler.id().equals(id)) {
                return travelerService.updateTravelerById(id, traveler);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}

