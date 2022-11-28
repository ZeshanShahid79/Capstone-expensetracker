package capstoneexpensetracker.backend.traveler;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
            throw new NoSuchElementException("No such Element with this ID");
        }
        travelerRepository.deleteById(id);
    }

    public Traveler updateTravelerById(String id, Traveler traveler) {
        List<Traveler> travelerList = travelerRepository.findAll();
        for (Traveler travelerToFind : travelerList) {
            if (travelerToFind.id().equals(id)) {
                return travelerRepository.save(traveler);

            }
        }
        throw new NoSuchElementException("No traveler was found with this id");
    }


}

