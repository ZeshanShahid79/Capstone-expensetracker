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

    public void deleteTravelerGroup(String id) {
        if (!travelerGroupRepository.existsById(id)) {
            throw new NoSuchElementException("No such Element with this ID");
        }
        travelerGroupRepository.deleteById(id);
    }

    public TravelerGroup updateTravelerGroupById(String id, TravelerGroup travelerGroup) {
        if (!travelerGroupRepository.existsById(id)) {
            throw new NoSuchElementException("No such Element with this ID");
        }
        return travelerGroupRepository.save(travelerGroup);
    }
}
