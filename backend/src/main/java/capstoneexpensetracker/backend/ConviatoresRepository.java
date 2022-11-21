package capstoneexpensetracker.backend;


import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConviatoresRepository extends MongoRepository<Traveler,String> {
}
