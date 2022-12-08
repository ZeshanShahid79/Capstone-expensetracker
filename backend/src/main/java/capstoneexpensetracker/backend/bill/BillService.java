package capstoneexpensetracker.backend.bill;

import capstoneexpensetracker.backend.exceptions.NoTravelerGroupWithThisIdException;
import capstoneexpensetracker.backend.travelergroup.GroupMember;
import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BillService {
    private final TravelerGroupRepository travelerGroupRepository;


    public Bill getBillByGroupId(String travelerGroupId) {
        List<BigDecimal> amountList = travelerGroupRepository
                .findById(travelerGroupId)
                .orElseThrow(NoTravelerGroupWithThisIdException::new)
                .travelerList().stream().map(GroupMember::amount).toList();
        return new Bill(amountList.stream().reduce(BigDecimal.ZERO, BigDecimal::add));
    }

    public Bill updateGroupBill(String groupId, String travellerId, BigDecimal amount) {
        TravelerGroup groupToUpdate = travelerGroupRepository.findById(groupId).orElseThrow(NoTravelerGroupWithThisIdException::new);
        List<GroupMember> memberToUpdate = groupToUpdate.travelerList().stream().map(traveler -> {
            if (traveler.id().equals(travellerId)) {
                return new GroupMember(travellerId, traveler.name(), traveler.amount().add(amount));
            } else {
                return traveler;
            }
        }).toList();
        TravelerGroup updatedTravelerGroup = new TravelerGroup(groupToUpdate.description(), memberToUpdate, groupId);
        travelerGroupRepository.save(updatedTravelerGroup);
        List<BigDecimal> amountList = memberToUpdate.stream().map(GroupMember::amount).toList();
        return new Bill(amountList.stream().reduce(BigDecimal.ZERO, BigDecimal::add));
    }


}
