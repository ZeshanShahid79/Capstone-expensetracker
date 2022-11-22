package capstoneexpensetracker.backend;

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

    public void addTraveler(NewTraveler newTraveler) {
        String uuid = travelerUtils.generateUUID();
        Traveler traveler = new Traveler(newTraveler.name(), uuid);
        travelerRepository.save(traveler);
    }
}
