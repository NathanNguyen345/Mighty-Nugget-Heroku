import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeaponThunk = createAsyncThunk(
    'fetchWeapon/fetchWeaponThunk',
    async () => {
        // TODO: Changed from GET to POST to work with heroku 
        const response = await axios.post('weapon/all');
        return response.data.weapon
    }
)

const weaponSelectionSlice = createSlice({
    name: "weaponSelection",
    initialState: {
        error: "",
        loading: false,
        weaponList: [],
    },
    reducers: {
        fetchWeapon(state, action) {
            state.weaponList = action.payload;
        },
    },
    extraReducers: {
        [fetchWeaponThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchWeaponThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.weaponList = action.payload;
            state.error = "";
        },
        [fetchWeaponThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchWeapon } = weaponSelectionSlice.actions;
export default weaponSelectionSlice.reducer;