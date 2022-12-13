package capstoneexpensetracker.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    public static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final TravelExUserService travelExUserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/", "/ALLEBROWSERROUTERLINKS", "/static/**", "/index.html", "/api/travelex-users/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/travelex-users").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/travelex-users/{id}").authenticated()
                .antMatchers("/api/travelex-users/logout", "/api/travelex-users/{username}").authenticated()
                .antMatchers("/api/travelers/**", "/api/traveler-groups/**", "/api/bill/**").permitAll()
                .anyRequest().denyAll()
                .and().build();
    }

    @Bean
    public PasswordEncoder encoder() {
        return passwordEncoder;
    }

    @Bean
    public UserDetailsManager userDetailsService() {

        String udmException = "You cannot use this custom UserDetailsManager for this action.";
        return new UserDetailsManager() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                TravelExUser userByName = travelExUserService.findUserByUsername(username);
                if (userByName == null) {
                    throw new UsernameNotFoundException("Username not found");
                }
                return User.builder()
                        .username(username)
                        .password(userByName.passwordBcrypt())
                        .roles("BASIC")
                        .build();
            }

            @Override
            public void createUser(UserDetails user) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public void updateUser(UserDetails user) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public void deleteUser(String username) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public void changePassword(String oldPassword, String newPassword) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public boolean userExists(String username) {
                throw new UnsupportedOperationException(udmException);
            }
        };
    }
}
