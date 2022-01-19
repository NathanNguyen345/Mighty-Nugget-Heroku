import { createSlice } from "@reduxjs/toolkit";

const mintMaterialSlice = createSlice({
    name: "mintMaterials",
    initialState: {
        item: "",
        materials: {
            wood: 0,
            ore: 0,
            fish: 0,
            ether: 0
        }
    },
    reducers: {
        fetchFullMaterial(state, action) {
            state.item = action.payload.item;
            state.materials.wood = action.payload.wood;
            state.materials.ore = action.payload.ore;
            state.materials.fish = action.payload.fish;
            state.materials.ether = action.payload.ether;
        }
    }
});

export const { fetchFullMaterial } = mintMaterialSlice.actions;
export default mintMaterialSlice.reducer;