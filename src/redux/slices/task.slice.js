import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    tasks: [],
    count: 0
}

const taskSlice = createSlice({
    name: 'task',
    initialState: INITIAL_STATE,
    reducers: {
        loadTasks: (state, action) => {
            state.tasks = action.payload
            state.count = state.tasks.length
        }
    }
})

export const { loadTasks } = taskSlice.actions;
export default taskSlice.reducer;