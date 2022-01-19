import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addWeaponToInventoryThunk = createAsyncThunk(
    'addWeaponToInventory/postData',
    async (data) => {
        const response = await axios.post(`/mint/mintItem/${data.itemName}`, { data });
        return response.data
    }
)

export const updateUserStakeMaterialThunk = createAsyncThunk(
    'updateStakeMaterial/postData',
    async (data) => {
        const response = await axios.post('/user/updateStake', { data });
        return response.data
    }
)

const initialState = {
    userId: "",
    inventoryId: "",
    stake: {
        wood: 0,
        ore: 0,
        fish: 0
    },
    weapon: [],
    loggedIn: false
}

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        login(state, action) {
            state.userId = action.payload._id;
            state.inventoryId = action.payload.itemId;
            state.stake = action.payload.stake;
            state.weapon = action.payload.weapon;
            state.loggedIn = true;
        },
        updateUserStakeMaterial(state, action) {
            state.stake[action.payload.name] = action.payload.amount
        },
        addWeaponToInventory(state, action) {
            state.weapon = state.weapon.push(action.payload);
        },
        reset(state) {
            Object.assign(state, initialState);
        }
    }, extraReducers: {
        [addWeaponToInventoryThunk.pending]: (state) => {
            state.loading = true;
        },
        [addWeaponToInventoryThunk.fulfilled]: (state, action) => {
            state.weapon = [...state.weapon, action.payload.item];
            state.loading = false;
        },
        [addWeaponToInventoryThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action;
        },
        [updateUserStakeMaterialThunk.pending]: (state) => {
            state.loading = true;
        },
        [updateUserStakeMaterialThunk.fulfilled]: (state, action) => {
            state.stake[action.payload.materialName] = action.payload.stakeCommit;
            state.loading = false;
        },
        [updateUserStakeMaterialThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action;
        }
    }
})

export const {
    login,
    updateUserStakeMaterial,
    addWeaponToInventory,
    reset
} = userLoginSlice.actions;

export default userLoginSlice.reducer;