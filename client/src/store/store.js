import { configureStore } from "@reduxjs/toolkit";
import materialCounterSlice from "../slices/materialCounterSlice";
import mintMaterialsSlice from "../slices/mintMaterialsSlice";
import stakeSlice from "../slices/stakeSlice";
import transactionSlice from "../slices/transactionSlice";
import userInventorySlice from "../slices/userInventorySlice";
import userLoginSlice from "../slices/userLoginSlice";
import weaponSelectionSlice from "../slices/weaponSelectionSlice";

const store = configureStore({
    reducer: {
        materialCounterSlice,
        mintMaterialsSlice,
        stakeSlice,
        transactionSlice,
        userInventorySlice,
        userLoginSlice,
        weaponSelectionSlice
    }
})

export default store;