package capstoneexpensetracker.backend.travelergroup;

import java.math.BigDecimal;

public record GroupMember(
        String id,
        BigDecimal amount
) {
}
