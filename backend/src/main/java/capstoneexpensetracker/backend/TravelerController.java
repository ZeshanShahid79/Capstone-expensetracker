package capstoneexpensetracker.backend;

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

    @PostMapping
    Traveler addTraveler(@RequestBody NewTraveler newTraveler) {
        return travelerService.addTraveler(newTraveler);
    }

    @DeleteMapping("{id}")
    Traveler deleteTraveler(@PathVariable String id) {
        try {
            return travelerService.deleteTraveler(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }

    }
}
