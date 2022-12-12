package capstoneexpensetracker.backend.bill;

import capstoneexpensetracker.backend.exceptions.NoTravelerGroupWithThisIdException;
import capstoneexpensetracker.backend.exceptions.NotravelerWithThisIdException;
import capstoneexpensetracker.backend.travelergroup.GroupMember;
import capstoneexpensetracker.backend.travelergroup.TravelerGroup;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BillService {
    private final TravelerGroupRepository travelerGroupRepository;


    public Bill getBillByGroupId(String travelerGroupId) {
        List<BigDecimal> amountList = travelerGroupRepository
                .findById(travelerGroupId)
                .orElseThrow(NoTravelerGroupWithThisIdException::new)
                .travelerList()
                .stream()
                .map(GroupMember::amount)
                .toList();
        return new Bill(amountList.stream().reduce(BigDecimal.ZERO, BigDecimal::add));
    }

    public Bill updateGroupBill(String groupId, String travellerId, BigDecimal amount) {

        TravelerGroup groupToUpdate = travelerGroupRepository
                .findById(groupId)
                .orElseThrow(NoTravelerGroupWithThisIdException::new);

        GroupMember travelerToFind = groupToUpdate
                .travelerList()
                .stream()
                .filter(t -> t.id().equals(travellerId))
                .findFirst()
                .orElseThrow(NotravelerWithThisIdException::new);


        BigDecimal travelerAmount = travelerToFind.amount().add(amount);
        BigDecimal sizeOfList = new BigDecimal(groupToUpdate.travelerList().size());
        BigDecimal due = travelerAmount.divide(sizeOfList, 2, RoundingMode.HALF_DOWN);

        GroupMember travelerToUpdate = new GroupMember(travelerToFind.id(), travelerToFind.name(), travelerToFind.amount().add(amount), due);
        List<GroupMember> listOfGroupMembers = new ArrayList<>(groupToUpdate.travelerList());
        listOfGroupMembers.set(groupToUpdate.travelerList().indexOf(travelerToFind), travelerToUpdate);


        TravelerGroup updatedTravelerGroup = new TravelerGroup(groupToUpdate.description(), listOfGroupMembers, groupId);

        travelerGroupRepository.save(updatedTravelerGroup);
        List<BigDecimal> amountList = listOfGroupMembers
                .stream().map(GroupMember::amount)
                .toList();
        return new Bill(amountList.stream().reduce(BigDecimal.ZERO, BigDecimal::add));
    }
}
