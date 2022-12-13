package capstoneexpensetracker.backend.security;


public record TravelExUser(
        String id,
        String username,
        String passwordBcrypt

) {
}
