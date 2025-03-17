import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&<>])[A-Za-z\d@#$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@#$!%*?&)'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  country: yup.string().required('Country is required'),
  file: yup
    .mixed<FileList>()
    .required('File is required')
    .test('fileSize', 'File size must be less than 2MB', (value) => {
      if (!value.length) return false;
      return value[0].size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Only PNG and JPEG files are allowed', (value) => {
      if (!value.length) return false;
      return ['image/png', 'image/jpeg'].includes(value[0].type);
    }),
  agree: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions'),
});
