package capstoneexpensetracker.backend.traveler;

public record NewTraveler(
        String name
) {
    public Traveler withId(String id) {
        Traveler traveler = new Traveler(name(), id);
        return traveler;
    }
}
