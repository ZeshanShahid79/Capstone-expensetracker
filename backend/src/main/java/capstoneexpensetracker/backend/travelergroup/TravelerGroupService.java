package capstoneexpensetracker.backend.travelergroup;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelerGroupService {

    private final TravelerGroupRepository travelerGroupRepository;

    public List<TravelerGroup> displayTravelerGroupList() {
        return travelerGroupRepository.findAll();
    }
}
