package capstoneexpensetracker.backend.bill;

import capstoneexpensetracker.backend.travelergroup.TravelerGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class BillService {
    private final TravelerGroupRepository travelerGroupRepository;


    public Bill getBillByGroupId(String travelerGroupId) {
        Collection<BigDecimal> sum = travelerGroupRepository
                .findById(travelerGroupId)
                .orElseThrow(() -> new NoSuchElementException("No such element found with this id"))
                .travelerList().values();
        return new Bill(sum.stream().reduce(BigDecimal.ZERO, BigDecimal::add));
    }

}
