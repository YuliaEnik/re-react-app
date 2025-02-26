import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedData {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
}

export interface IStateISelectedData {
  data: ISelectedData[];
}

const savedSelectedCards = localStorage.getItem('selectedCards');
const initialState: IStateISelectedData = savedSelectedCards
  ? { data: JSON.parse(savedSelectedCards) }
  : { data: [] };

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<ISelectedData>) => {
      const card = action.payload;
      const index = state.data.findIndex((c) => c.id === card.id);

      if (index === -1) {
        state.data.push(card);
      } else {
        state.data.splice(index, 1);
      }
    },
    cleanSelectedCards: (state) => {
      state.data = [];
    },
  },
});

export const { toggleCard, cleanSelectedCards } = selectedCardsSlice.actions;
export const selectedCardsSliceReducer = selectedCardsSlice.reducer;
export default selectedCardsSliceReducer;
