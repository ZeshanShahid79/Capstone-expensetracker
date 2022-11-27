package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.traveler.TravelerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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

    public TravelerGroup deleteTravelerGroup(String id) {
        TravelerGroup travelerGroupToFind = travelerGroupRepository
                .findAll()
                .stream()
                .filter(travelerGroup -> travelerGroup.id().equals(id))
                .findFirst().orElseThrow(() -> new NoSuchElementException("Element with this Id not found"));

        travelerGroupRepository.deleteById(id);
        return travelerGroupToFind;
    }
}
