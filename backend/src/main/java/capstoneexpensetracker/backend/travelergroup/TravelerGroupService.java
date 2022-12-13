package capstoneexpensetracker.backend.travelergroup;

import capstoneexpensetracker.backend.exceptions.NoTravelerGroupWithThisIdException;
import capstoneexpensetracker.backend.traveler.Traveler;
import capstoneexpensetracker.backend.traveler.TravelerRepository;
import capstoneexpensetracker.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TravelerGroupService {

    private final TravelerGroupRepository travelerGroupRepository;
    private final TravelerRepository travelerRepository;
    private final Utils travelerUtils;


    public List<TravelerGroup> displayTravelerGroupList() {
        return travelerGroupRepository.findAll();
    }

    public TravelerGroup addTravelerGroup(NewTravelerGroup newTravelerGroup) {
        String uuid = travelerUtils.generateUUID();
        List<GroupMember> travelerList = newTravelerGroup.travelerList();
        if (newTravelerGroup.travelerList() == null) {
            travelerList = new ArrayList<>();
        }
        TravelerGroup travelerGroup = new TravelerGroup(newTravelerGroup.description(), travelerList, uuid);
        return travelerGroupRepository.save(travelerGroup);
    }

    public void deleteTravelerGroup(String id) {
        if (!travelerGroupRepository.existsById(id)) {
            throw new NoTravelerGroupWithThisIdException();
        }
        travelerGroupRepository.deleteById(id);
    }

    public TravelerGroup updateTravelerGroupById(String id, TravelerGroup travelerGroup) {
        if (!travelerGroupRepository.existsById(id)) {
            throw new NoTravelerGroupWithThisIdException();
        }
        return travelerGroupRepository.save(travelerGroup);
    }

    public List<Traveler> getTravelersByGroupId(String travelerGroupId) {
        List<String> travelerListOfIds = travelerGroupRepository
                .findById(travelerGroupId)
                .orElseThrow(NoTravelerGroupWithThisIdException::new)
                .travelerList().stream().map(GroupMember::id).toList();
        return travelerRepository.findAllByIdIn(travelerListOfIds);
    }
}
