import { configureStore, Middleware } from '@reduxjs/toolkit';
import searchSliceReducer from './slices';
import { artworksApi } from '../service/getApi';
import modalReducer from '../Reducers/modalReducer';
import selectedCardsSliceReducer from './selectedCards';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('searchState', JSON.stringify(state.search));
  localStorage.setItem(
    'selectedCards',
    JSON.stringify(state.selectedCards.data)
  );
  return result;
};

export const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    selectedCards: selectedCardsSliceReducer,
    [artworksApi.reducerPath]: artworksApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      artworksApi.middleware,
      localStorageMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
