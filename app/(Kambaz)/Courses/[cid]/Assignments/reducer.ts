import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = { ...assignment, _id: uuidv4() };
            state.assignments = [...state.assignments, newAssignment];
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignment._id ? assignment : a
            );
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            );
        },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;