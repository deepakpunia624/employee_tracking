const joi = require("joi")
const { joiPasswordExtendCore} = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const empValSchema ={

    registerEmployee: joi.object({
        empName:joi.string()
        .min(3)
        .max(20)
        .message({
            "string.min":"{#label} should contain at least {#limit} characters ",
            "string.max":"{#label} should contain at least {#limit} characters ",
    })
        .required(),
    empEmail: joi
        .string()
        .email()
        .message("Invalid email address")
        .required(),
    empPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          'userPassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
          'userPassword.minOfSpecialCharacters':'{#label} should contain at least {#min} special character',
          'userPassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
          'userPassword minOfNumeric': '{#label} should contain at least {#min} numeric character',
          'userPassword .noWhiteSpaces': '{#label} should not contain white spaces',
          'userPassword onlyLatinCharacters': '{#label} should contain only latin characters',
    }),
    empPhone:joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .message("invalid mobile number")
        .required(),
    empCity:joi
        .string()
        .required(),
    empGender: joi
        .string()
        .required(),
    empAddress: joi
        .string()
        .required(),
    empWorkingStatus: joi
        .string()
        .required(),
    empTechnologies: joi
        .string()
        .required()
    }).unknown(true),

loginEmployee: joi.object({
    empEmail:joi
        .string()
        .email()
        .message("Invalid email address")
        .required(),
    empPassword: joi
        .string()
        .required(),
    }).unknown(true),

resetPassword: joi.object({
        newPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          'userPassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
          'userPassword.minOfSpecialCharacters':'{#label} should contain at least {#min} special character',
          'userPassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
          'userPassword minOfNumeric': '{#label} should contain at least {#min} numeric character',
          'userPassword .noWhiteSpaces': '{#label} should not contain white spaces',
          'userPassword onlyLatinCharacters': '{#label} should contain only latin characters',
    }),
        confirmPassword: joi
            .string()
            .required()
        })

}
module.exports = empValSchema
