package capstoneexpensetracker.backend.security;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public record NewTravelExUser(
        @NotBlank
        String username,
        @Pattern(regexp = "^(?=[^A-Z]*+[A-Z])(?=[^a-z]*+[a-z])(?=\\D*+\\d)(?=[^#?!@$ %^&*-]*+[#?!@$ %^&*-]).{8,}$", message = "Password must have minimum eight characters, at least one letter and one number!")
        String password
) {
}
