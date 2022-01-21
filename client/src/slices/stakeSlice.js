import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchStakeDataThunk = createAsyncThunk(
    'fetchStakeData/getData',
    async () => {
        // TODO: Changed from GET to POST to work with heroku 
        const response = await axios.post('/stake/all')
        return response.data.item;
    }
)

export const updateStakeMaterialThunk = createAsyncThunk(
    'updateStakeMaterial/postMaterial',
    async (stakeData) => {
        const response = await axios.post(`/stake/${stakeData.material}`, {
            materialName: stakeData.materialName,
            amount: stakeData.amount,
            stakeId: stakeData.stakeId,
            stakeAmount: stakeData.stakeAmount
        })
        return response.data.materialInfo;
    }
)

export const withdrawMaterialThunk = createAsyncThunk(
    'withdrawMaterial/postMaterial',
    async (stakeData) => {
        const response = await axios.post(`/stake/${stakeData.material}`, {
            materialName: stakeData.materialName,
            amount: (stakeData.amount * -1),
            stakeId: stakeData.stakeId,
            stakeAmount: stakeData.stakeAmount
        })
        return response.data.materialInfo;
    }
)

const stakeSlice = createSlice({
    name: "stake",
    initialState: {
        inventory: {
            wood: 0,
            ore: 0,
            fish: 0,
        },
        loading: false,
        error: ""
    },
    reducers: {
        fetchStakeData(state, action) {
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
        },
        updateStakeMaterial(state, action) {
            state.inventory[action.payload.name] = action.payload.amount;
        }
    },
    extraReducers: {
        [fetchStakeDataThunk.pending]: (state) => {
            state.loading = true;
        },
        [fetchStakeDataThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
        },
        [fetchStakeDataThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateStakeMaterialThunk.pending]: (state) => {
            state.loading = true;
        },
        [updateStakeMaterialThunk.fulfilled]: (state, action) => {
            state.inventory[action.payload.name] = action.payload.amount;
            state.loading = false;
            state.error = ""
        },
        [updateStakeMaterialThunk.rejected]: (state, action) => {
            state.error = action.payload.err;
        }
    }
});

export const {
    fetchStakeData,
    updateStakeMaterial
} = stakeSlice.actions;
export default stakeSlice.reducer;