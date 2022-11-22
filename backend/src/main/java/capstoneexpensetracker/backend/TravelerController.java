package capstoneexpensetracker.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

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
}
