package capstoneexpensetracker.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/hello")
public class Testcontroller {

    @GetMapping
    String hello(){
        return "Hello Moin Moin geh bitte ";
    }
}