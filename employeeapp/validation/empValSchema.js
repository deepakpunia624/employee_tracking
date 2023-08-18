const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const empValSchema = {
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
            "userPassword.minOfUppercase":
              "{#label} should contain at least {#min} uppercase character",
            "userPassword.minOfSpecialCharacters":
              "{#label} should contain at least {#min} special character",
            "userPassword.minOfLowercase":
              "{#label} should contain at least {#min} lowercase character",
            "userPassword minOfNumeric":
              "{#label} should contain at least {#min} numeric character",
            "userPassword .noWhiteSpaces":
              "{#label} should not contain white spaces",
            "userPassword onlyLatinCharacters":
              "{#label} should contain only latin characters",
          }),
        confirmPassword: joi.string().required(),
      }),
    };
    module.exports = empValSchema;
    