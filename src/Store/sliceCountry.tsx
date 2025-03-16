import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountriesState {
  list: string[];
}

const initialState: CountriesState = {
  list: [
    'Belarus',
    'USA',
    'Poland',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Ukraine',
    'Russia',
    'Canada',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
