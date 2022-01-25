import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import gameBoardSlice from "../slices/gameBoardSlice";
import materialCounterSlice from "../slices/materialCounterSlice";
import mintMaterialsSlice from "../slices/mintMaterialsSlice";
import stakeSlice from "../slices/stakeSlice";
import transactionSlice from "../slices/transactionSlice";
import userInventorySlice from "../slices/userInventorySlice";
import userLoginSlice from "../slices/userLoginSlice";
import weaponSelectionSlice from "../slices/weaponSelectionSlice";
import storageSession from 'redux-persist/lib/storage/session'

const reducers = combineReducers({
    gameBoardSlice,
    materialCounterSlice,
    mintMaterialsSlice,
    stakeSlice,
    transactionSlice,
    userInventorySlice,
    userLoginSlice,
    weaponSelectionSlice
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['register', 'rehydrate'],
            },
        }),
})

export default store;