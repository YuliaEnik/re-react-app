import { configureStore, Middleware } from '@reduxjs/toolkit';
import modalReducer from '~/Reducers/modalReducer';
import searchSliceReducer from '~/Reducers/searchReducer';
import selectedCardsSliceReducer from '~/Reducers/selectedCardsReducer';
import { artworksApi } from '~/service/getApi';


const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (typeof window !== 'undefined') {
    const state = store.getState();
    localStorage.setItem('searchState', JSON.stringify(state.search));
    localStorage.setItem('selectedCards', JSON.stringify(state.selectedCards.data));
  }
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
export type AppDispatch = typeof store.dispatch;
