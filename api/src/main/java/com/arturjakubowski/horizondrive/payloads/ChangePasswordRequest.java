package com.arturjakubowski.horizondrive.payloads;

import com.arturjakubowski.horizondrive.constants.Global;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChangePasswordRequest {

    @NotNull(message = Global.NULL_PASSWORD)
    @NotBlank(message = Global.EMPTY_PASSWORD)
    @Max(value = Global.PASSWORD_MAX_LENGTH, message = Global.TOO_LONG_PASSWORD)
    @Pattern(regexp = Global.PASSWORD_REGEXP, message = Global.WRONG_PASSWORD)
    String oldPassword;

    @NotNull(message = Global.NULL_PASSWORD)
    @NotBlank(message = Global.EMPTY_PASSWORD)
    @Max(value = Global.PASSWORD_MAX_LENGTH, message = Global.TOO_LONG_PASSWORD)
    @Pattern(regexp = Global.PASSWORD_REGEXP, message = Global.WRONG_PASSWORD)
    String newPassword;
}
