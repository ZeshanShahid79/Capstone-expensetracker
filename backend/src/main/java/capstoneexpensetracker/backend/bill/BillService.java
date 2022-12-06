package capstoneexpensetracker.backend.bill;

import capstoneexpensetracker.backend.travelergroup.GroupMember;
import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class BillService {
    private final TravelerGroupRepository travelerGroupRepository;


    public Bill getBillByGroupId(String travelerGroupId) {
        List<BigDecimal> amountList = travelerGroupRepository
                .findById(travelerGroupId)
                .orElseThrow(() -> new NoSuchElementException("No such element found with this id"))
                .travelerList().stream().map(GroupMember::amount).toList();
        return new Bill(amountList.stream().reduce(BigDecimal.ZERO, BigDecimal::add));
    }

}
