package capstoneexpensetracker.backend;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class TravelerUtils {

    public String generateUUID() {
        UUID randomID = UUID.randomUUID();
        return randomID.toString();
    }
}