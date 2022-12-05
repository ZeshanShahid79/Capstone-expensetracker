package capstoneexpensetracker.backend.bill;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/bill")
@RequiredArgsConstructor
public class BillController {


    private final BillService billService;

    @GetMapping("{travelerGroupId}")
    Bill getGroupBill(@PathVariable String travelerGroupId) {
        return billService.getBillByGroupId(travelerGroupId);
    }
}
