import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    tasks: [],
    assigned: [],
    count: 0
}

const taskSlice = createSlice({
    name: 'task',
    initialState: INITIAL_STATE,
    reducers: {
        loadTasks: (state, action) => {
            state.tasks = action.payload
            state.count = state.tasks.length
        },
        loadAssignedTasks: (state, action) => {
            state.assigned = action.payload
        },
    }
})

export const { loadTasks, loadAssignedTasks } = taskSlice.actions;
export default taskSlice.reducer;