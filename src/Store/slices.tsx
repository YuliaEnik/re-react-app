import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  page: number;
}

const savedState = localStorage.getItem('searchState');
const initialState: SearchState = savedState
  ? JSON.parse(savedState)
  : { query: '', page: 1 };

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setQuery, setPage } = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;
export default searchSliceReducer;
