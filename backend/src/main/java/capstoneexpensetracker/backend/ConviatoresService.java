package capstoneexpensetracker.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ConviatoresService {
    private final ConviatoresRepository conviatoresRepository;
    public List<Traveler> displayConviatoresList() {
        return conviatoresRepository.findAll();
    }
}
