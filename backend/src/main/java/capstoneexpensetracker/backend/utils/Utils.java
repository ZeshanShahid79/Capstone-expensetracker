package capstoneexpensetracker.backend.utils;

import capstoneexpensetracker.backend.security.SecurityConfig;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class Utils {

    public String generateUUID() {
        UUID randomID = UUID.randomUUID();
        return randomID.toString();
    }

    public String addPasswordBcrypt(String password) {
        return SecurityConfig.passwordEncoder.encode(password);
    }
}
