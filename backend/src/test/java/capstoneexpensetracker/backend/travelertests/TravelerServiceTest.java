package capstoneexpensetracker.backend.travelertests;

import capstoneexpensetracker.backend.traveler.*;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
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
    void addNewTravelerWithAnId() {

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

    @Test
    void updateTravelerByValidId() {

        //GIVEN

        Traveler traveler = new Traveler("Steven", "1");
        Traveler updatedTraveler = new Traveler("Robert", "1");
        List<Traveler> travelersList = new ArrayList<>(List.of(traveler));


        //WHEN

        when(travelerRepository.findAll()).thenReturn(travelersList);
        when(travelerRepository.save(updatedTraveler)).thenReturn(updatedTraveler);
        Traveler actual = travelerService.updateTravelerById("1", updatedTraveler);

        //THEN

        assertEquals(updatedTraveler, actual);
    }

    @Test
    void updateTravelerByInvalidId() {

        //GIVEN

        String id = "2";
        List<Traveler> travelers = new ArrayList<>();
        Traveler traveler1 = new Traveler("Steven", id);
        Traveler updatedTraveler = new Traveler("Robert", "4");
        travelers.add(traveler1);

        when(travelerRepository.findAll()).thenReturn(travelers);
        when(travelerRepository.save(updatedTraveler)).thenReturn(updatedTraveler);

        //WHEN

        try {
            travelerService.updateTravelerById("4", updatedTraveler);
            fail();
        } catch (NoSuchElementException e) {
            verify(travelerRepository).findAll();
            verify(travelerRepository, never()).save(updatedTraveler);
        }
    }
}
