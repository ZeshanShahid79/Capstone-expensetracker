package capstoneexpensetracker.backend.travelertests;

import capstoneexpensetracker.backend.exceptions.NotravelerWithThisIdException;
import capstoneexpensetracker.backend.traveler.NewTraveler;
import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.traveler.TravelerRepository;
import capstoneexpensetracker.backend.traveler.TravelerService;
import capstoneexpensetracker.backend.utils.Utils;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class TravelerServiceTest {
    TravelerRepository travelerRepository = mock(TravelerRepository.class);
    Utils travelerUtils = mock(Utils.class);
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

        Traveler updatedTraveler = new Traveler("Robert", "1");


        //WHEN

        when(travelerRepository.existsById("1")).thenReturn(true);
        when(travelerRepository.save(updatedTraveler)).thenReturn(updatedTraveler);
        Traveler actual = travelerService.updateTravelerById("1", updatedTraveler);

        //THEN

        assertEquals(updatedTraveler, actual);
    }

    @Test
    void updateTravelerByInvalidId() {

        //GIVEN

        String id = "2";
        Traveler updatedTraveler = new Traveler("Robert", "4");


        when(travelerRepository.existsById(id)).thenReturn(false);
        when(travelerRepository.save(updatedTraveler)).thenReturn(updatedTraveler);

        //WHEN

        try {
            travelerService.updateTravelerById(id, updatedTraveler);
            fail();
        } catch (NotravelerWithThisIdException e) {
            verify(travelerRepository).existsById(id);
            verify(travelerRepository, never()).save(updatedTraveler);
        }
    }

}
