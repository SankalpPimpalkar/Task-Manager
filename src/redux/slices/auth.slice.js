import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    user: null,
    isAuthenticated: false,
    isLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
        },
        logoutUser: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
