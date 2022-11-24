package capstoneexpensetracker.backend.travelergrouptests;


import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TravelerGroupServiceTest {
    TravelerGroupRepository travelerGroupRepository = mock(TravelerGroupRepository.class);
    TravelerGroupService travelerGroupService = new TravelerGroupService(travelerGroupRepository);

    @Test
    void getTravelerGroupList() {

        //GIVEN

        TravelerGroup travelerGroup = new TravelerGroup(List.of(new Traveler("zeshan", "1")), "1");
        List<TravelerGroup> travelerGroupList = List.of(travelerGroup);

        //WHEN

        when(travelerGroupRepository.findAll()).thenReturn(travelerGroupList);
        List<TravelerGroup> actual = travelerGroupService.displayTravelerGroupList();

        //THEN
        assertEquals(travelerGroupList, actual);
    }
}
