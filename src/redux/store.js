import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal.slice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
    }
})

export default store