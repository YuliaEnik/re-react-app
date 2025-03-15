import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '../Components/Form/types';

interface IState {
  cards: IData[];
}

const initialState: IState = {
  cards: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<IData>) => {
      state.cards.push(action.payload);
    },
  },
});

export const { addCard } = formSlice.actions;
export default formSlice.reducer;
