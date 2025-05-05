import { createAction } from '@reduxjs/toolkit';

export const openModal = createAction<{ id: number }>('modal/openModal');
export const closeModal = createAction('modal/closeModal');
