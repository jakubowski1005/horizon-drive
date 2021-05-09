package com.arturjakubowski.horizondrive.payloads;

import com.arturjakubowski.horizondrive.constants.Global;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    @NotNull(message = Global.NULL_USERNAME)
    @NotBlank(message = Global.EMPTY_USERNAME)
    @Min(value = Global.USERNAME_MIN_LENGTH, message = Global.TOO_SHORT_USERNAME)
    @Max(value = Global.USERNAME_MAX_LENGTH, message = Global.TOO_LONG_USERNAME)
    String username;

    @NotNull(message = Global.NULL_EMAIL)
    @NotBlank(message = Global.EMPTY_EMAIL)
    @Email(message = Global.WRONG_EMAIL)
    String email;

    @NotNull(message = Global.NULL_PASSWORD)
    @NotBlank(message = Global.EMPTY_PASSWORD)
    @Max(value = Global.PASSWORD_MAX_LENGTH, message = Global.TOO_LONG_PASSWORD)
    @Pattern(regexp = Global.PASSWORD_REGEXP, message = Global.WRONG_PASSWORD)
    String password;
}
