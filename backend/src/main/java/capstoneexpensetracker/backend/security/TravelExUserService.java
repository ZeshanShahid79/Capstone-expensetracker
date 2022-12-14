package capstoneexpensetracker.backend.security;

import capstoneexpensetracker.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;

@Service
@RequiredArgsConstructor
public class TravelExUserService {

    private final TravelExUserRepository travelExUserRepository;
    private final Utils travelerUtils;

    public TravelExUser findUserByUsername(String username) throws ResponseStatusException {
        return travelExUserRepository.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    public void deleteTravelExUser(String id) {
        if (!travelExUserRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        travelExUserRepository.deleteById(id);
    }

    public TravelExUser addTravelExUser(@NotNull NewTravelExUser newTravelExUser) throws ResponseStatusException {
        if (travelExUserRepository.findByUsername(newTravelExUser.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        String passwordBcrypt = travelerUtils.addPasswordBcrypt(newTravelExUser.password());
        TravelExUser travelExUser = new TravelExUser(
                travelerUtils.generateUUID(),
                newTravelExUser.username(),
                passwordBcrypt

        );
        travelExUserRepository.save(travelExUser);
        return travelExUser;
    }

    public TravelExUser updateUserById(UpdateTravelExUser updateTravelExUser) {
        TravelExUser toUpdateTravelExUser = travelExUserRepository.findById(updateTravelExUser.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        TravelExUser updatedTravelExUser = new TravelExUser(
                toUpdateTravelExUser.id(),
                updateTravelExUser.username(),
                toUpdateTravelExUser.passwordBcrypt());

        return travelExUserRepository.save(updatedTravelExUser);
    }
}

