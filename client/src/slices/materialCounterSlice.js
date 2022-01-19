import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wood: 0,
    ore: 0,
    fish: 0,
    ether: 0
}

const materialCounterSlice = createSlice({
    name: "materialCounter",
    initialState,
    reducers: {
        addToCounter(state, action) {
            state[action.payload] = state[action.payload] + 1;
        },
        subToCounter(state, action) {
            state[action.payload] = state[action.payload] - 1;
        },
        resetCounter(state) {
            Object.assign(state, initialState)
        }
    }
});

export const {
    addToCounter,
    subToCounter,
    resetCounter
} = materialCounterSlice.actions;
export default materialCounterSlice.reducer;