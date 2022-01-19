import { createSlice } from "@reduxjs/toolkit";


const transactionSlice = createSlice({
    name: "transactions",
    initialState: {
        transaction: []
    },
    reducers: {
        fetchTransactionData(state, action) {
            state.transaction = action.payload;
        },
        updateTransaction(state, action) {
            state.transaction = [...state.transaction, action.payload];
        }
    }
});

export const { fetchTransactionData, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;