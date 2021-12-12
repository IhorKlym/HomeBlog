// @flow

import validate from 'validate.js';

// reconfigure standard error messages
validate.validators.presence.options = {
  message: function msg (value, attribute) {
    let fieldName = attribute ? attribute.replace('_', ' ') : 'This field';
    fieldName = fieldName.replace( /([A-Z])/g, ' $1' );
    fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    return validate.format('%{fieldName} can not be blank!', { fieldName });
  }
};

const defaultRules = {
  presence: { presence: { allowEmpty: false } },
  select: { presence: { allowEmpty: false, message: 'Please select at least one item!' } },
  url: { presence: { allowEmpty: false }, url: { message: 'Please provide valid url!' } },
  email: { presence: { allowEmpty: true }, email: { message: 'oops that isn’t a real email format' } },
  password: {
    presence: { allowEmpty: true },
    format: {
      pattern: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[\wа-я]))(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,}).*$/,
      message: 'We’ll need at least 6 characters with a combination of letters, numbers, and punctuation marks!'
    }
  },
  confirm_password: {
    presence: { allowEmpty: true },
    format: {
      pattern: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[\wа-я]))(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,}).*$/,
      message: 'We’ll need at least 6 characters long with a combination of letters, numbers, and punctuation marks!'
    },
    equality: {
      attribute: 'password',
      message: 'New password and Confirmation password do not match!'
    }
  }
};

const Validate = (data: {}, rules: {}) => {
  const validationRules = {};
  const options = {
    fullMessages: false
  };

  // create validation rules based on keys from store
  Object.keys(rules).forEach(key => {
    const value = rules[key];
    validationRules[key] = defaultRules[value] ? defaultRules[value] : value;
  });

  const errors = validate(data, validationRules, options);

  const result = errors && Object.keys(errors).map(key => {
    errors[key] = errors[key].toString();
    errors[key]= errors[key].replace(',• ', '\n• ');
    return true;
  });

  return { isValid: !result, errors };
};

export default Validate;
