import isEmail from 'sane-email-validation';

const buildValidate = required => {
  const validate = values => {
    let errors = {};
    required.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });

    if (values.email && !isEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };
  return validate;
};

export default buildValidate;
