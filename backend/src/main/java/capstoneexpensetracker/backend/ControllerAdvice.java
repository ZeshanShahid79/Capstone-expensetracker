package capstoneexpensetracker.backend;

import capstoneexpensetracker.backend.exceptions.NoTravelerGroupWithThisIdException;
import capstoneexpensetracker.backend.exceptions.NotravelerWithThisIdException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@org.springframework.web.bind.annotation.ControllerAdvice
@Component
public class ControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler({NoTravelerGroupWithThisIdException.class, NotravelerWithThisIdException.class})
    public ResponseEntity<String> handleNoTravelerGroupWithThisId(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
}
