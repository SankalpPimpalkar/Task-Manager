import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal.slice";
import authReducer from "./slices/auth.slice";
import taskReducer from "./slices/task.slice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        task: taskReducer
    }
})

export default store