import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    projects: [],
    count: 0
}

const projectSlice = createSlice({
    name: 'task',
    initialState: INITIAL_STATE,
    reducers: {
        loadProjects: (state, action) => {
            state.projects = action.payload
            state.count = state.projects.length
        },
    }
})

export const { loadProjects } = projectSlice.actions;
export default projectSlice.reducer;