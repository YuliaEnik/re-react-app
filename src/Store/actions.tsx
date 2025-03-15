import { IData } from '../Components/Form/types';

export const ADD_CARD = 'ADD_CARD';

interface AddCardAction {
  type: typeof ADD_CARD;
  payload: IData;
}

export type FormActionTypes = AddCardAction;

export const addCard = (card: IData): AddCardAction => ({
  type: ADD_CARD,
  payload: card,
});
