/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './../Reducers/searchReducer';
import selectedCardsReducer from './../Reducers/selectedCardsReducer';
import { render } from '@testing-library/react';

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      search: searchReducer,
      selectedCards: selectedCardsReducer,
    },
    preloadedState: initialState,
  });
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { initialState = {}, store = createMockStore(initialState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const setupApiStore = (api: any) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};
