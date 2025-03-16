import { configureStore } from '@reduxjs/toolkit';
import formReducer from './sliceForm';
import countriesReducer from './sliceCountry';

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
