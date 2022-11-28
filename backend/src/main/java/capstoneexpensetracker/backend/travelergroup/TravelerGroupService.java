package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.traveler.TravelerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<Traveler> travelerList = newTravelerGroup.travelerList();
        if (newTravelerGroup.travelerList() == null) {
            travelerList = new ArrayList<>();
        }
        TravelerGroup travelerGroup = new TravelerGroup(newTravelerGroup.description(), travelerList, uuid);

        return travelerGroupRepository.save(travelerGroup);
    }

    public void deleteTravelerGroup(String id) {
        travelerGroupRepository.deleteById(id);
    }
}
