import { createReducer } from '@reduxjs/toolkit';
import { closeModal, openModal } from '../Actions/modalActions';

interface ModalState {
  isOpen: boolean;
  id: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  id: null,
};

const detailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openModal, (state, action) => {
      state.isOpen = true;
      state.id = action.payload.id;
    })
    .addCase(closeModal, (state) => {
      state.isOpen = false;
      state.id = null;
    });
});

export default detailsReducer;
