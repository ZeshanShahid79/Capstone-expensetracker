package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.TravelerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelerGroupService {

    private final TravelerGroupRepository travelerGroupRepository;
    private final TravelerUtils travelerUtils;

    public List<TravelerGroup> displayTravelerGroupList() {
        return travelerGroupRepository.findAll();
    }

    public TravelerGroup addTravelerGroup(NewTravelerGroup newTravelerGroup) {
        String uuid = travelerUtils.generateUUID();
        TravelerGroup travelerGroup = new TravelerGroup(newTravelerGroup.travelerList(), uuid);
        return travelerGroupRepository.save(travelerGroup);
    }
}
