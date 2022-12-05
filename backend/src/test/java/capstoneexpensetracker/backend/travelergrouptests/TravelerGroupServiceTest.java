package capstoneexpensetracker.backend.travelergrouptests;


import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.traveler.TravelerRepository;
import capstoneexpensetracker.backend.traveler.TravelerUtils;
import capstoneexpensetracker.backend.travelergroup.NewTravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupService;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class TravelerGroupServiceTest {
    TravelerGroupRepository travelerGroupRepository = mock(TravelerGroupRepository.class);
    TravelerUtils travelerUtils = mock(TravelerUtils.class);
    TravelerRepository travelerRepository = mock(TravelerRepository.class);
    TravelerGroupService travelerGroupService = new TravelerGroupService(travelerGroupRepository, travelerRepository, travelerUtils);

    @Test
    void getTravelerGroupList() {

        //GIVEN

        TravelerGroup travelerGroup = new TravelerGroup("description", Map.of("1", BigDecimal.ZERO), "1");
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
        NewTravelerGroup newTravelerGroup = new NewTravelerGroup("description", Map.of("1", BigDecimal.ZERO));
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
        TravelerGroup travelerGroup = new TravelerGroup("description", new HashMap<>(), "1");


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
        TravelerGroup updatedTravelerGroup = new TravelerGroup("mallorca", Map.of("1", BigDecimal.ZERO), "1");


        when(travelerGroupRepository.existsById("12")).thenReturn(false);

        //WHEN
        try {
            travelerGroupService.updateTravelerGroupById("4", updatedTravelerGroup);
            fail();
        } catch (NoSuchElementException e) {
            verify(travelerGroupRepository).existsById("4");
            verify(travelerGroupRepository, never()).save(updatedTravelerGroup);
        }
    }

    @Test
    void getTravelersByGroupId() {
        //GIVEN
        TravelerGroup travelerGroup = new TravelerGroup("des", Map.of("1", BigDecimal.ZERO), "1");
        List<String> travelerList = List.of("1");
        List<Traveler> travelers = List.of(new Traveler("Zeshan", "1"));
        when(travelerGroupRepository.findById("1")).thenReturn(Optional.of(travelerGroup));
        when(travelerRepository.findAllByIdIn(travelerList)).thenReturn(travelers);
        //WHEN
        List<Traveler> actual = travelerGroupService.getTravelersByGroupId("1");
        //THEN
        assertEquals(travelers, actual);
    }

    @Test
    void getTravelersByWrongGroupIdThrowsException() {

        when(travelerGroupRepository.findById("1")).thenReturn(Optional.empty());
        try {
            travelerGroupService.getTravelersByGroupId("2");
            fail();
        } catch (NoSuchElementException e) {
            verify(travelerGroupRepository).findById("2");
            verify(travelerRepository, never()).findAllByIdIn(any());
            assertEquals("No such element found with this id", e.getMessage());
        }

    }
}
