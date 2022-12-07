package capstoneexpensetracker.backend.exceptions;

public class NotravelerWithThisIdException extends RuntimeException {
    public NotravelerWithThisIdException() {
        super("No traveler was found with this id");
    }
}
