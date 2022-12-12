package capstoneexpensetracker.backend.travelergroup;

import java.math.BigDecimal;

public record GroupMember(
        String id,
        String name,
        BigDecimal amount,
        BigDecimal due
) {
}
