import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IData, IDataForm } from './types';
import { Button } from '../Button/button';
import { useDispatch } from 'react-redux';
import { addCard } from '../../Store/slice';
import { useNavigate } from 'react-router-dom';
import { schema } from '../../Validation/validationSchema';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './style.scss';

export function FormUseHook() {
  const [savedMessage, setSavedMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IDataForm>({ mode: 'onChange', resolver: yupResolver(schema) });

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<IDataForm> = async (data) => {
    const fileBase64 = await convertFileToBase64(data.file[0]);

    const cardData: IData = {
      ...data,
      file: fileBase64,
      agree: data.agree,
    };

    setSavedMessage('Information has been saved');
    setTimeout(() => {
      setSavedMessage('');
    }, 2000);

    dispatch(addCard(cardData));
    reset();
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="name" className="form-line">
            Name:
            <input
              id="name"
              type="text"
              placeholder="Enter your name..."
              className="input"
              autoComplete="off"
              {...register('name')}
            />
          </label>
          {errors.name ? (
            <p className="error">{errors.name.message}</p>
          ) : (
            <br />
          )}
        </div>
        <div className="input-wrapper">
          <label className="form-line">
            Age:
            <input
              type="number"
              className="input"
              placeholder="Enter your age..."
              {...register('age', {
                required: 'The age should contain only numbers',
              })}
            />
          </label>
          {errors.age ? <p className="error">{errors.age.message}</p> : <br />}
        </div>
        <div className="input-wrapper">
          <label className="form-line">
            Email:
            <input
              type="email"
              placeholder="Enter your email..."
              className="input"
              autoComplete="off"
              {...register('email', {
                required: 'Email is required',
              })}
            />
          </label>
          {errors.email ? (
            <p className="error">{errors.email.message}</p>
          ) : (
            <br />
          )}
        </div>
        <div className="input-wrapper">
          <label className="form-line">
            Country:
            <select
              className="input"
              {...register('country', { required: 'Enter country' })}
            >
              <option value=""> </option>
              <option value="Belarus"> Belarus </option>
              <option value="USA"> USA </option>
              <option value="Poland"> Poland </option>
              <option value="Germany"> Germany </option>
            </select>
          </label>
          {errors.country ? (
            <p className="error">{errors.country.message}</p>
          ) : (
            <br />
          )}
        </div>
        <div className="input-wrapper">
          <label className="form-line">
            Male
            <input
              type="radio"
              {...register('gender', {
                required: 'Choose your gender',
              })}
              value="male"
            />
          </label>
          <label className="form-line">
            Female
            <input
              type="radio"
              {...register('gender', {
                required: 'Choose your gender',
              })}
              value="female"
            />
          </label>
          {errors.gender ? (
            <p className="error">{errors.gender.message}</p>
          ) : (
            <br />
          )}
        </div>
        <div className="input-wrapper">
          <label className="form-line">
            Choose image:
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register('file', { required: 'Choosse a file' })}
            />
          </label>
          {errors.file ? (
            <p className="error">{errors.file.message}</p>
          ) : (
            <br />
          )}
        </div>
        <div className="input-wrapper">
          <label className="form-line">
            I agree:
            <input
              type="checkbox"
              {...register('agree', {
                required: 'You need to agree',
              })}
            />
          </label>
          {errors.agree ? (
            <p className="error">{errors.agree.message}</p>
          ) : (
            <br />
          )}
        </div>
        <div className="input-wrapper_password">
          <label className="form-line">
            Password:
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password..."
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </label>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="input-wrapper_password">
          <label className="form-line">
            Confirm Password:
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password..."
              {...register('confirmPassword', {
                required: 'confirmPassword is required',
              })}
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
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
        {savedMessage ? <p className="form-message">{savedMessage}</p> : <br />}
      </form>
      <div></div>
    </>
  );
}
