


/**
 * userName: allow all except space
 * password: must have 1 upercase 1 number 1 special character as least 6 character
 * 
 */

export const regexValidation = {
    userName: /^[A-Za-z\d@#$!%*?&.]*$/,
    checkPassword: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&.])[A-Za-z\d@#$!%*?&.]{6,}$/ 
}