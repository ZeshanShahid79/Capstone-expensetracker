package capstoneexpensetracker.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TravelExUserRepository extends MongoRepository<TravelExUser, String> {
    Optional<TravelExUser> findByUsername(String username);

}
