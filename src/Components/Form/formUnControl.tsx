import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '../Button/button';
import { schema } from '../../Validation/validationSchema';
import { addCard } from '../../Store/sliceForm';
import { RootState } from '../../Store/store';
import * as yup from 'yup';
import './style.scss';
import { convertFileToBase64 } from '../../service/converFile';

export function FormUnControl() {
  const [savedMessage, setSavedMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countries = useSelector((state: RootState) => state.countries.list);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleCountryInputChange = () => {
    const value = countryRef.current?.value || '';
    if (value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };
  const handleCountrySelect = (country: string) => {
    if (countryRef.current) {
      countryRef.current.value = country;
    }
    setFilteredCountries([]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      country: countryRef.current?.value || '',
      gender: genderRef.current?.value || '',
      file: fileRef.current?.files || ([] as unknown as FileList),
      agree: agreeRef.current?.checked || false,
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      const fileBase64 = await convertFileToBase64(formData.file[0]);

      const cardData = {
        ...formData,
        file: fileBase64,
      };

      setSavedMessage('Information has been saved');
      setTimeout(() => {
        setSavedMessage('');
      }, 2000);

      dispatch(addCard(cardData));
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setErrors(errors);
      }
    }
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label className="form-line">
          Name:
          <input
            type="text"
            placeholder="Enter your name..."
            className="input"
            ref={nameRef}
          />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line">
          Age:
          <input
            type="number"
            className="input"
            placeholder="Enter your age..."
            ref={ageRef}
          />
        </label>
        {errors.age && <p className="error">{errors.age}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line">
          Email:
          <input
            type="email"
            placeholder="Enter your email..."
            className="input"
            ref={emailRef}
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line">
          Country:
          <input
            type="text"
            placeholder="Enter your country..."
            className="input"
            ref={countryRef}
            onChange={handleCountryInputChange}
            autoComplete="off"
          />
          {filteredCountries.length > 0 && (
            <ul className="autocomplete-list">
              {filteredCountries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => handleCountrySelect(country)}
                  className="autocomplete-item"
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </label>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="input-wrapper">
        <label htmlFor="gender-male" className="form-line">
          Male
          <input
            id="gender-male"
            type="radio"
            name="gender"
            value="male"
            ref={genderRef}
          />
        </label>
        <label htmlFor="gender-female" className="form-line">
          Female
          <input
            id="gender-female"
            type="radio"
            name="gender"
            value="female"
            ref={genderRef}
          />
        </label>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line">
          Choose image:
          <input
            id="file"
            type="file"
            accept="image/png, image/jpeg"
            ref={fileRef}
          />
        </label>
        {errors.file && <p className="error">{errors.file}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line">
          I agree:
          <input type="checkbox" ref={agreeRef} />
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}
      </div>

      <div className="input-wrapper_password">
        <label className="form-line">
          Password:
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="input-wrapper_password">
        <label className="form-line">
          Confirm Password:
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password..."
            ref={confirmPasswordRef}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
      {savedMessage ? <p className="form-message">{savedMessage}</p> : <br />}
    </form>
  );
}
