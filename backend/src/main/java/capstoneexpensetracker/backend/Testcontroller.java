package capstoneexpensetracker.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hello")
@RequiredArgsConstructor
public class Testcontroller {

   private final TravelerService travelerService;
    @GetMapping
    List<Traveler> displayConviatoresList(){
        return travelerService.displayTravelerList();
    }
}
