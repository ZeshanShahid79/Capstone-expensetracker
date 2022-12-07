package capstoneexpensetracker.backend.exceptions;


public class NoTravelerGroupWithThisIdException extends RuntimeException {
    public NoTravelerGroupWithThisIdException() {
        super("No TravelerGroup with this Id was found");
    }
}
