package capstoneexpensetracker.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelerService {
    private final TravelerRepository travelerRepository;

    public List<Traveler> displayTravelerList() {
        return travelerRepository.findAll();
    }
}
