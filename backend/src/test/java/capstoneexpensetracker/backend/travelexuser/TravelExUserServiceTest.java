package capstoneexpensetracker.backend.travelexuser;

import capstoneexpensetracker.backend.security.NewTravelExUser;
import capstoneexpensetracker.backend.security.TravelExUser;
import capstoneexpensetracker.backend.security.TravelExUserRepository;
import capstoneexpensetracker.backend.security.TravelExUserService;
import capstoneexpensetracker.backend.utils.Utils;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TravelExUserServiceTest {

    TravelExUserRepository travelExUserRepository = mock(TravelExUserRepository.class);
    Utils utils = mock(Utils.class);
    TravelExUserService travelExUserService = new TravelExUserService(travelExUserRepository, utils);

    @Test
    void addTravelExUser() {
        //GIVEN
        TravelExUser travelExUser = new TravelExUser("1", "tester12", "test");
        NewTravelExUser newTravelExUser = new NewTravelExUser("tester12", "test");

        //WHEN
        when(travelExUserRepository.findByUsername(travelExUser.username())).thenReturn(Optional.empty());
        when(utils.addPasswordBcrypt(newTravelExUser.password())).thenReturn("test");
        when(utils.generateUUID()).thenReturn("1");
        TravelExUser actual = travelExUserService.addTravelExUser(newTravelExUser);
        verify(travelExUserRepository).findByUsername(travelExUser.username());
        verify(utils).addPasswordBcrypt(newTravelExUser.password());
        verify(utils).generateUUID();
        //THEN
        assertEquals(travelExUser, actual);
    }

    @Test
    void addTravelExException() {
        //GIVEN
        TravelExUser travelExUser = new TravelExUser("1", "tester12", "test");
        NewTravelExUser newTravelExUser = new NewTravelExUser("tester12", "test");
        //WHEN
        when(travelExUserRepository.findByUsername(newTravelExUser.username())).thenReturn(Optional.of(travelExUser));
        String message = null;
        try {
            travelExUserService.addTravelExUser(newTravelExUser);
        } catch (ResponseStatusException e) {
            message = e.getMessage();
        }
        //THEN
        assertEquals("400 BAD_REQUEST", message);
    }

    @Test
    void findByUsernameThrowException() {
        //given
        TravelExUser travelExUser = new TravelExUser("1", "tester12", "test");

        //when
        when(travelExUserRepository.findByUsername(travelExUser.username())).thenReturn(Optional.empty());
        String message = null;
        try {
            travelExUserService.findUserByUsername(travelExUser.username());
        } catch (ResponseStatusException e) {
            message = e.getMessage();
        }
        //then
        verify(travelExUserRepository).findByUsername(travelExUser.username());
        assertEquals("404 NOT_FOUND", message);
    }

    @Test
    void findByUsername() {
        //given
        TravelExUser travelExUser = new TravelExUser("1", "tester12", "test");

        //when
        when(travelExUserRepository.findByUsername(travelExUser.username())).thenReturn(Optional.of(travelExUser));

        TravelExUser actual = travelExUserService.findUserByUsername(travelExUser.username());

        //then
        verify(travelExUserRepository).findByUsername(travelExUser.username());
        assertEquals(travelExUser, actual);
    }


    @Test
    void updateTravelExUserOK() {
        TravelExUser travelExUser = new TravelExUser("1", "tester12", "test");
        TravelExUser updatedTravelExUser = new TravelExUser("1", "Zeshan12", "test");
        //when
        when(travelExUserRepository.existsById(updatedTravelExUser.id())).thenReturn(true);
        when(travelExUserRepository.save(updatedTravelExUser)).thenReturn(updatedTravelExUser);
        TravelExUser actual = travelExUserService.updateUserById("1", updatedTravelExUser);
        //then
        assertEquals(updatedTravelExUser, actual);
    }

    @Test
    void updateTravelExUserException() {
        String message = null;
        TravelExUser updatedTravelExUser = new TravelExUser("1", "Zeshan12", "test");
        //when
        when(travelExUserRepository.findById(updatedTravelExUser.id())).thenReturn(Optional.empty());
        try {
            travelExUserService.updateUserById("1", updatedTravelExUser);
        } catch (RuntimeException e) {
            message = e.getMessage();
        }
        //then
        assertEquals("404 NOT_FOUND", message);
    }

    @Test
    void deleteTravelExUser() {
        // given
        String id = "123123123123";
        // when
        when(travelExUserRepository.existsById(id)).thenReturn(true);
        doNothing().when(travelExUserRepository).deleteById(id);
        //then
        travelExUserService.deleteTravelExUser(id);
        verify(travelExUserRepository).deleteById(id);
    }

    @Test
    void deleteTravelExUserThrowException() {
        // given
        String id = "123123123123";
        String message = null;
        // when
        when(travelExUserRepository.existsById(id)).thenReturn(false);
        try {
            travelExUserService.deleteTravelExUser(id);
        } catch (ResponseStatusException e) {
            message = e.getMessage();
        }
        //then

        assertEquals("404 NOT_FOUND", message);
    }
}
