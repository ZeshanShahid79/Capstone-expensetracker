package capstoneexpensetracker.backend.utils;

import capstoneexpensetracker.backend.security.SecurityConfig;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

class UtilsTest {

    Utils utils = new Utils();

    @Test
    void addUUIDasString() {
        //given
        String randomString = UUID.randomUUID().toString();
        //when
        String actual = utils.generateUUID();
        //then
        assertNotEquals(randomString, actual);
    }

    @Test
    void addPasswordBcrypt() {
        //given
        String password = "password";
        String passwordString = SecurityConfig.passwordEncoder.encode(password);
        //when
        String actual = utils.addPasswordBcrypt(password);
        //then
        assertNotEquals(passwordString, actual);
    }
}
