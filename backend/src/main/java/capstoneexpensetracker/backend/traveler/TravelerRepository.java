package capstoneexpensetracker.backend.traveler;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;

public interface TravelerRepository extends MongoRepository<Traveler, String> {
    List<Traveler> findAllByIdIn(Collection<String> id);
}
