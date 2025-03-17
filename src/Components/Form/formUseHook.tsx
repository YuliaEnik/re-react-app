import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IData, IDataForm } from './types';
import { Button } from '../Button/button';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../Store/sliceForm';
import { useNavigate } from 'react-router-dom';
import { schema } from '../../Validation/validationSchema';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RootState } from '../../Store/store';
import './style.scss';

export function FormUseHook() {
  const [savedMessage, setSavedMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries.list);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
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
  useEffect(() => {
    if (inputValue) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [inputValue, countries]);

  const handleCountrySelect = (country: string) => {
    setInputValue(country);
    setFilteredCountries([]);
    setValue('country', country);
  };
  return (
    <>
      <form
        id="myForm"
        className="form-wrapper"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-wrapper">
          <label className="form-line">
            Name:
            <input
              type="text"
              placeholder="Enter your name..."
              className="input"
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
            <input
              type="text"
              placeholder="Enter your country..."
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => setTimeout(() => setFilteredCountries([]), 200)}
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
            <input
              type="hidden"
              {...register('country', { required: 'Enter country' })}
            />
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
              id="file"
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
    </>
  );
}
