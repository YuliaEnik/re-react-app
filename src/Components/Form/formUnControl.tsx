import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '../Button/button';
import { schema } from '../../Validation/validationSchema';
import { addCard } from '../../Store/slice';
import * as yup from 'yup';
import './style.scss';

export function FormUnControl() {
  const [savedMessage, setSavedMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
        <label htmlFor="name" className="form-line">
          Name:
          <input
            id="name"
            type="text"
            placeholder="Enter your name..."
            className="input"
            autoComplete="off"
            ref={nameRef}
          />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="input-wrapper">
        <label htmlFor="age" className="form-line">
          Age:
          <input
            id="age"
            type="number"
            className="input"
            placeholder="Enter your age..."
            ref={ageRef}
          />
        </label>
        {errors.age && <p className="error">{errors.age}</p>}
      </div>

      <div className="input-wrapper">
        <label htmlFor="email" className="form-line">
          Email:
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="input"
            autoComplete="off"
            ref={emailRef}
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="input-wrapper">
        <label htmlFor="country" className="form-line">
          Country:
          <select id="country" className="input" ref={countryRef}>
            <option value=""> </option>
            <option value="Belarus"> Belarus </option>
            <option value="USA"> USA </option>
            <option value="Poland"> Poland </option>
            <option value="Germany"> Germany </option>
          </select>
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
        <label htmlFor="file" className="form-line">
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
        <label htmlFor="agree" className="form-line">
          I agree:
          <input id="agree" type="checkbox" ref={agreeRef} />
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}
      </div>

      <div className="input-wrapper_password">
        <label htmlFor="password" className="form-line">
          Password:
          <input
            id="password"
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
        <label htmlFor="confirmPassword" className="form-line">
          Confirm Password:
          <input
            id="confirmPassword"
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
      {savedMessage && <p className="form-message">{savedMessage}</p>}
    </form>
  );
}
