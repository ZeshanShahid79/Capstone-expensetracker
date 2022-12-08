package capstoneexpensetracker.backend.bill;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bill")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @GetMapping("{travelerGroupId}")
    Bill getGroupBill(@PathVariable String travelerGroupId) {
        return billService.getBillByGroupId(travelerGroupId);
    }

    @PutMapping("{groupId}/traveller/{travellerId}/amount")
    Bill updateGroupBill(@PathVariable String groupId, @PathVariable String travellerId, @RequestBody UpdateAmount amountData) {
        return billService.updateGroupBill(groupId, travellerId, amountData.amount());
    }
}
