import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    createTaskModal: false,
    addNewMemberModal: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: INITIAL_STATE,
    reducers: {
        openModal: (state, action) => {
            const modalName = action.payload;
            state[modalName] = true;
        },
        closeModal: (state, action) => {
            const modalName = action.payload;
            state[modalName] = false;
        },
        toggleModal: (state, action) => {
            const modalName = action.payload;
            state[modalName] = !state[modalName];
        },
        closeAllModals: (state) => {
            Object.keys(state).forEach(modal => {
                state[modal] = false;
            });
        }
    }
});

export const { openModal, closeModal, toggleModal, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
