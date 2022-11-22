package capstoneexpensetracker.backend;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TravelerServiceTest {
    TravelerRepository travelerRepository = mock(TravelerRepository.class);
    TravelerUtils travelerUtils = mock(TravelerUtils.class);
    TravelerService travelerService = new TravelerService(travelerRepository, travelerUtils);

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

    @Test
    void addNewTravelerAndAddAUuid() {

        //GIVEN
        NewTraveler newTraveler = new NewTraveler("Zeshan");
        Traveler traveler = newTraveler.withId("1");


        when(travelerRepository.save(traveler)).thenReturn(traveler);
        when(travelerUtils.generateUUID()).thenReturn("1");

        //WHEN
        Traveler actual = travelerService.addTraveler(newTraveler);

        //THEN
        verify(travelerUtils).generateUUID();
        assertEquals(traveler, actual);
    }
}
