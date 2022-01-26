import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateMaterialThunk = createAsyncThunk(
    'updateMaterial/postData',
    async (data) => {
        const inventoryResponse = await axios.post('/inventory/full', { id: data.userId })
        data['material'] = inventoryResponse.data.items[data.materialName] - data.amount;
        const response = await axios.post(`inventory/${data.materialName}`,
            { data })
        return response.data.updatedData
    }
)

export const subtractMintingMaterialsThunk = createAsyncThunk(
    'subtractMintingMaterials/postData',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/inventory/mint/subtractMaterial`, { data })
            return response.data.updatedData
        } catch (err) {
            console.log('err here')
            return rejectWithValue(err.response.data.msg);
        }
    }
)

export const collectRewardThunk = createAsyncThunk(
    'collectReward/postData',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('game/collectReward', { data });
            return response.data.updateData;
        } catch (err) {
            console.log(rejectWithValue(err.response.data.msg));
        }
    }
)

export const explorerEtherPaymentThunk = createAsyncThunk(
    'explorerEtherPayment/postData',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('game/etherCollect', { data });
            return response.data.updateData;
        } catch (err) {
            console.log(rejectWithValue(err.response.data.msg));
        }
    }
)

const initialState = {
    inventory: {
        ether: 0,
        wood: 0,
        ore: 0,
        fish: 0,
        diamond: 0
    },
    loading: false,
    error: ""
}

const userInventorySlice = createSlice({
    name: "userInventory",
    initialState,
    reducers: {
        fetchFullInventory(state, action) {
            state.inventory.ether = action.payload.ether;
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
            state.inventory.diamond = action.payload.diamond;
        },
        updateMaterial(state, action) {
            state.inventory[action.payload.materialName] = state.inventory[action.payload.materialName] - action.payload.amount;
        },
        subtractMintingMaterials(state, action) {
            state.inventory.wood = state.inventory.wood - action.payload.wood;
            state.inventory.ore = state.inventory.ore - action.payload.ore;
            state.inventory.fish = state.inventory.fish - action.payload.fish;
            state.inventory.ether = state.inventory.ether - action.payload.ether;
        },
        resetInventoryCount(state) {
            Object.assign(state, initialState);
        }
    },
    extraReducers: {
        [updateMaterialThunk.pending]: (state) => {
            state.loading = true;
        },
        [updateMaterialThunk.fulfilled]: (state, action) => {
            state.inventory[action.payload.type] = action.payload.amount;
            state.loading = false;
        },
        [updateMaterialThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action;
        },
        [subtractMintingMaterialsThunk.pending]: (state) => {
            state.loading = true;
        },
        [subtractMintingMaterialsThunk.fulfilled]: (state, action) => {
            state.inventory.ether = action.payload.ether;
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
            state.inventory.diamond = action.payload.diamond;
            state.loading = false;
            state.error = "";
        },
        [subtractMintingMaterialsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [collectRewardThunk.pending]: (state) => {
            state.loading = true;
        },
        [collectRewardThunk.fulfilled]: (state, action) => {
            state.inventory.ether = action.payload.ether;
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
            state.inventory.diamond = action.payload.diamond;
            state.loading = false;
            state.error = ""
        },
        [collectRewardThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [explorerEtherPaymentThunk.pending]: (state) => {
            state.loading = true;
        },
        [explorerEtherPaymentThunk.fulfilled]: (state, action) => {
            state.inventory.ether = action.payload.ether;
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
            state.inventory.diamond = action.payload.diamond;
            state.loading = false;
            state.error = ""
        },
        [explorerEtherPaymentThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {
    fetchFullInventory,
    updateMaterial,
    subtractMintingMaterials,
    resetInventoryCount
} = userInventorySlice.actions;

export default userInventorySlice.reducer;