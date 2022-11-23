package capstoneexpensetracker.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TravelerService {
    private final TravelerRepository travelerRepository;
    private final TravelerUtils travelerUtils;

    public List<Traveler> displayTravelersList() {
        return travelerRepository.findAll();
    }

    Traveler addTraveler(NewTraveler newTraveler) {
        String uuid = travelerUtils.generateUUID();
        Traveler traveler = new Traveler(newTraveler.name(), uuid);
        return travelerRepository.save(traveler);
    }

    public Traveler deleteTraveler(String id) {
        Optional<Traveler> travelerToFind = travelerRepository
                .findAll()
                .stream()
                .filter(traveler -> traveler.id().equals(id))
                .findFirst();
        if (travelerToFind.isEmpty()) {
            throw new NoSuchElementException("Element with this Id not found");
        }
        Traveler traveler = travelerToFind.get();
        travelerRepository.deleteById(id);
        return traveler;
    }

    public Traveler updateTravelerById(String id, Traveler traveler) {
        List<Traveler> travelerList = travelerRepository.findAll();
        for (Traveler person : travelerList) {
            if (person.id().equals(id)) {
                return travelerRepository.save(traveler);

            }
        }
        throw new NoSuchElementException("No traveler was found with this id");
    }
}

