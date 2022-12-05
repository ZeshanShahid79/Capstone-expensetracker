package capstoneexpensetracker.backend.travelergroup;

import java.math.BigDecimal;
import java.util.Map;

public record TravelerGroup(
        String description,
        Map<String, BigDecimal> travelerList,
        String id
) {
}
