package capstoneexpensetracker.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/travelex-users")
@RequiredArgsConstructor
public class TravelExUserController {

    private final TravelExUserService travelExUserService;

    @PostMapping
    public TravelExUser addTravelExUser(@Valid @RequestBody NewTravelExUser newTravelExUser) {
        return travelExUserService.addTravelExUser(newTravelExUser);
    }

    @GetMapping("/login")
    public String me() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/{username}")
    public TravelExUser profile(@PathVariable String username) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        if (!usernameFromSession.equals(username)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The username you want to display not equals to your session username");
        }
        return travelExUserService.findUserByUsername(username);
    }

    @PutMapping("/{id}")
    public TravelExUser profileUpdate(@PathVariable String id, @RequestBody TravelExUser travelExUser) {
        if (!travelExUser.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The username you want to update not equals to your req Body user.id");
        }
        return travelExUserService.updateUserById(id, travelExUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChratUser(@PathVariable String id) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        TravelExUser chratUserFromRepo = travelExUserService.findUserByUsername(usernameFromSession);
        if (!id.equals(chratUserFromRepo.id())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The username you want to delete not found!");
        }
        travelExUserService.deleteTravelExUser(id);
    }


    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }
}
