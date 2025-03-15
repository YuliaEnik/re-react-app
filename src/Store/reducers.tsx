import { IData } from '../Components/Form/types';
import { ADD_CARD, FormActionTypes } from './actions';

interface IState {
  cards: IData[];
}

const initialState: IState = {
  cards: [],
};

export const formReducer = (
  state = initialState,
  action: FormActionTypes
): IState => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    default:
      return state;
  }
};
