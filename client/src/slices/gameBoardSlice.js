import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGameDataThunk = createAsyncThunk(
    'fetchGameData/getData',
    async (data) => {
        const response = await axios.post('/game/fetchBoard', { data });
        return response.data.gameData.explorer;
    }
);

export const createBoardThunk = createAsyncThunk(
    'createBoard/postData',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('/game/createExploreBoard', { data });
            return response.data.gameData.explorer
        } catch (err) {
            return rejectWithValue(err.response.data.msg);
        }
    }
);

export const updateGameBoardThunk = createAsyncThunk(
    'updateGameBoard/postData',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('/game/updateGameBoard', { data });
            return response.data.updatedData.explorer;
        } catch (err) {
            return rejectWithValue(err.response.data.msg)
        }
    }
);

const gameBoardSlice = createSlice({
    name: 'gameBoard',
    initialState: {
        explorer: {
            startCount: 0,
            endCount: 0,
            gameBoard: [[]],
            inProgres: false,
            prizeMap: {},
            prizeArray: []
        },
        error: "",
        loading: false
    },
    reducers: {
        addToStartCounter(state) {
            state.explorer.startCount = state.explorer.startCount + 1;
        },
        createBoard(state, action) {
            state.explorer.gameBoard = action.payload;
        },
        fetchGameData(state) {
            return state
        }
    }, extraReducers: {
        [fetchGameDataThunk.pending]: (state) => {
            state.loading = true;
        },
        [fetchGameDataThunk.fulfilled]: (state, action) => {
            state.explorer.startCount = action.payload.startCount;
            state.explorer.endCount = action.payload.endCount;
            state.explorer.gameBoard = action.payload.gameBoard;
            // state = { ...state, explorer: action.payload };
            state.loading = false;
            state.error = ""
        },
        [fetchGameDataThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createBoardThunk.pending]: (state) => {
            state.loading = true;
        },
        [createBoardThunk.fulfilled]: (state, action) => {
            state.explorer = action.payload
            state.loading = false;
            state.error = ""
        },
        [createBoardThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateGameBoardThunk.pending]: (state) => {
            state.loading = true;
        },
        [updateGameBoardThunk.fulfilled]: (state, action) => {
            // state = { ...state, explorer: action.payload };
            // TODO: Find better pattern
            state.explorer.startCount = action.payload.startCount;
            state.explorer.endCount = action.payload.endCount;
            state.explorer.gameBoard = action.payload.gameBoard;
            state.explorer.prizeMap = action.payload.prizeMap;
            state.explorer.prizeArray = action.payload.prizeArray;
            state.loading = false;
            state.error = ""
        },
        [updateGameBoardThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {
    addToStartCounter,
    createBoard
} = gameBoardSlice.actions;

export default gameBoardSlice.reducer;