export interface IErrors {
  nameError: string;
  ageError: string;
  emailError: string;
  countryError: string;
  sexError: string;
  agreeError: string;
  passwordError: string;
  confirmPasswordError: string;
  fileError: string;
}

export interface IFormState {
  message: string;
  errors: IErrors;
}

export type Props = Record<string, never>;

export interface IData {
  name: string;
  age: number;
  email: string;
  country: string;
  gender: string;
  agree: boolean;
  password: string;
  confirmPassword: string;
  file: string;
}

export type FormData = IData[];

export interface IDataForm {
  name: string;
  age: number;
  email: string;
  country: string;
  gender: string;
  agree: boolean;
  password: string;
  confirmPassword: string;
  file: FileList;
}
