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
    async (data) => {
        const response = await axios.post(`/inventory/mint/subtractMaterial`, { data })
        return response.data.updatedData
    }
)

const userInventorySlice = createSlice({
    name: "userInventory",
    initialState: {
        inventory: {
            wood: 0,
            ore: 0,
            fish: 0,
            ether: 0,
        },
        loading: false,
        error: ""
    },
    reducers: {
        fetchFullInventory(state, action) {
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
            state.inventory.ether = action.payload.ether;
        },
        updateMaterial(state, action) {
            state.inventory[action.payload.materialName] = state.wood - action.payload.amount;
        },
        subtractMintingMaterials(state, action) {
            state.inventory.wood = state.inventory.wood - action.payload.wood;
            state.inventory.ore = state.inventory.ore - action.payload.ore;
            state.inventory.fish = state.inventory.fish - action.payload.fish;
            state.inventory.ether = state.inventory.ether - action.payload.ether;
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
            state.inventory.wood = action.payload.wood;
            state.inventory.ore = action.payload.ore;
            state.inventory.fish = action.payload.fish;
            state.inventory.ether = action.payload.ether;
            state.loading = false;
        },
        [subtractMintingMaterialsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action;
        }
    }
})

export const {
    fetchFullInventory,
    updateMaterial,
    subtractMintingMaterials
} = userInventorySlice.actions;

export default userInventorySlice.reducer;