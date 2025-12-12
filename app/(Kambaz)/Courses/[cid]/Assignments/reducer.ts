import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    modules: assignments,
};
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addAssignment: (state, { payload: module }) => {

        },
        deleteAssignment: (state, { payload: module }) => {

        },
        updateAssignment: (state, { payload: module }) => {

        }
    },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
    modulesSlice.actions;
export default modulesSlice.reducer;