package capstoneexpensetracker.backend;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TravelerServiceTest {
    TravelerRepository travelerRepository = mock(TravelerRepository.class);
    TravelerService travelerService = new TravelerService(travelerRepository);

    @Test
    void getTravelerList() {
        //GIVEN

        Traveler traveler = new Traveler("Zeshan", "2");
        List<Traveler> travelers = List.of(traveler);

        //WHEN
        when(travelerRepository.findAll()).thenReturn(travelers);
        List<Traveler> actual = travelerService.displayTravelersList();
        //THEN
        assertEquals(travelers, actual);
    }
}
