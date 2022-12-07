package capstoneexpensetracker.backend.traveler;


import capstoneexpensetracker.backend.exceptions.NotravelerWithThisIdException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelerService {
    private final TravelerRepository travelerRepository;
    private final TravelerUtils travelerUtils;

    public List<Traveler> displayTravelersList() {
        return travelerRepository.findAll();
    }

    public Traveler addTraveler(NewTraveler newTraveler) {
        String uuid = travelerUtils.generateUUID();
        Traveler traveler = new Traveler(newTraveler.name(), uuid);
        return travelerRepository.save(traveler);
    }

    public void deleteTraveler(String id) {
        if (!travelerRepository.existsById(id)) {
            throw new NotravelerWithThisIdException();
        }
        travelerRepository.deleteById(id);
    }

    public Traveler updateTravelerById(String id, Traveler traveler) {
        if (!travelerRepository.existsById(id)) {
            throw new NotravelerWithThisIdException();
        }
        return travelerRepository.save(traveler);
    }
}
