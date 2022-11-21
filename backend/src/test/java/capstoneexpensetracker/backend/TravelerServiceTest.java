package capstoneexpensetracker.backend;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TravelerServiceTest {
    TravelerRepository travelerRepository = mock(TravelerRepository.class);
    TravelerService travelerService = new TravelerService(travelerRepository);

    @Test
    void getTravelerList(){
        //GIVEN
        List<Traveler> travelers = new ArrayList<>();
        Traveler traveler = new Traveler("Zeshan");
        travelers.add(traveler);
        //WHEN
        when(travelerRepository.findAll()).thenReturn(travelers);
        List<Traveler> actual = travelerRepository.findAll();
        //THEN
        assertEquals(travelers,actual);
    }
}
