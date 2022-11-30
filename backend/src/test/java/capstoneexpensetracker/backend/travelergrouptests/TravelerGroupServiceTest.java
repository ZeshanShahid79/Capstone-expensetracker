package capstoneexpensetracker.backend.travelergrouptests;


import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.traveler.TravelerUtils;
import capstoneexpensetracker.backend.travelergroup.NewTravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class TravelerGroupServiceTest {
    TravelerGroupRepository travelerGroupRepository = mock(TravelerGroupRepository.class);
    TravelerUtils travelerUtils = mock(TravelerUtils.class);
    TravelerGroupService travelerGroupService = new TravelerGroupService(travelerGroupRepository, travelerUtils);

    @Test
    void getTravelerGroupList() {

        //GIVEN

        TravelerGroup travelerGroup = new TravelerGroup("description", List.of(new Traveler("zeshan", "1")), "1");
        List<TravelerGroup> travelerGroupList = List.of(travelerGroup);

        //WHEN

        when(travelerGroupRepository.findAll()).thenReturn(travelerGroupList);
        List<TravelerGroup> actual = travelerGroupService.displayTravelerGroupList();

        //THEN
        assertEquals(travelerGroupList, actual);
    }

    @Test
    void addNewTravelerWithAnId() {

        //GIVEN
        NewTravelerGroup newTravelerGroup = new NewTravelerGroup("description", List.of(new Traveler("Zeshan", "1")));
        TravelerGroup travelerGroup = newTravelerGroup.withId("1");

        when(travelerGroupRepository.save(travelerGroup)).thenReturn(travelerGroup);
        when(travelerUtils.generateUUID()).thenReturn("1");

        //WHEN
        TravelerGroup actual = travelerGroupService.addTravelerGroup(newTravelerGroup);

        //THEN
        verify(travelerUtils).generateUUID();
        assertEquals(travelerGroup, actual);
    }

    @Test
    void addNewTravelerGroupWithouthTravelerList() {

        //GIVEN
        NewTravelerGroup newTravelerGroup = new NewTravelerGroup("description", null);
        TravelerGroup travelerGroup = new TravelerGroup("description", new ArrayList<>(), "1");


        when(travelerGroupRepository.save(travelerGroup)).thenReturn(travelerGroup);
        when(travelerUtils.generateUUID()).thenReturn("1");

        //WHEN
        TravelerGroup actual = travelerGroupService.addTravelerGroup(newTravelerGroup);


        //THEN
        verify(travelerUtils).generateUUID();
        assertEquals(travelerGroup, actual);
    }

    @Test
    void updateTravelerGroupByInvalidId() {

        //GIVEN
        TravelerGroup updatedTravelerGroup = new TravelerGroup("mallorca", List.of(new Traveler("zeshan", "1")), "1");


        when(travelerGroupRepository.existsById("1")).thenReturn(false);
        when(travelerGroupRepository.save(updatedTravelerGroup)).thenReturn(updatedTravelerGroup);

        //WHEN
        try {
            travelerGroupService.updateTravelerGroupById("4", updatedTravelerGroup);
            fail();
        } catch (NoSuchElementException e) {
            verify(travelerGroupRepository).existsById("4");
            verify(travelerGroupRepository, never()).save(updatedTravelerGroup);
        }
    }
}
