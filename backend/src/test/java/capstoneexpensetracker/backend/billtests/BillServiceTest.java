package capstoneexpensetracker.backend.billtests;

import capstoneexpensetracker.backend.bill.Bill;
import capstoneexpensetracker.backend.bill.BillService;
import capstoneexpensetracker.backend.exceptions.NotravelerWithThisIdException;
import capstoneexpensetracker.backend.travelergroup.GroupMember;
import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class BillServiceTest {


    private final TravelerGroupRepository travelerGroupRepository = mock(TravelerGroupRepository.class);


    private final BillService billService = new BillService(travelerGroupRepository);


    @Test
    void getBill() {
        //GIVEN

        TravelerGroup travelerGroup = new TravelerGroup("description", List.of(new GroupMember("1", "name", BigDecimal.ZERO)), "1");
        Bill bill = new Bill(travelerGroup.travelerList().stream().map(GroupMember::amount).reduce(BigDecimal.ZERO, BigDecimal::add));

        //WHEN

        when(travelerGroupRepository.findById("1")).thenReturn(Optional.of(travelerGroup));
        Bill actual = billService.getBillByGroupId("1");
        //THEN
        assertEquals(bill, actual);
    }

    @Test
    void updateGroupBill() {
        //GIVEN
        String groupId = "2";
        String travellerId = "1212";
        BigDecimal amount = new BigDecimal(20);
        TravelerGroup travelerGroup = new TravelerGroup("description", List.of(new GroupMember(travellerId, "hans", amount)), groupId);
        Bill expected = new Bill(new BigDecimal(40));

        //WHEN
        when(travelerGroupRepository.findById(groupId)).thenReturn(Optional.of(travelerGroup));
        Bill actual = billService.updateGroupBill(groupId, travellerId, amount);
        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void updateGroupBillReturnsTravelerNotToUpdate() {
        //GIVEN
        String groupId = "2";
        String travellerId = "12";
        BigDecimal amount = new BigDecimal(20);
        TravelerGroup travelerGroup = new TravelerGroup("description", List.of(new GroupMember("1211", "hans", amount)), groupId);
        //WHEN
        when(travelerGroupRepository.findById(groupId)).thenReturn(Optional.of(travelerGroup));
        try {
            billService.updateGroupBill(groupId, travellerId, amount);
            fail();
        } catch (NotravelerWithThisIdException e) {
            //THEN
            verify(travelerGroupRepository).findById(groupId);
        }
    }
}
