package capstoneexpensetracker.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hello")
@RequiredArgsConstructor
public class Testcontroller {

   private final ConviatoresService conviatoresService;
    @GetMapping
    List<Traveler> displayConviatoresList(){
        return conviatoresService.displayConviatoresList();
    }
}
