package capstoneexpensetracker.backend;


import org.springframework.data.mongodb.repository.MongoRepository;

public interface TravelerRepository extends MongoRepository<Traveler, String> {
}
