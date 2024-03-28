import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchBoardResultState = {
    searchBoardResult: any[];
    totalPages: number
};

const defaultState: SearchBoardResultState = {
    searchBoardResult: [],
    totalPages:1
};

export const searchBoardResultSlice = createSlice({
    name: 'searchBoardResult',
    initialState: defaultState,
    reducers: {
        setSearchBoardResult(state, action: PayloadAction<any[]>) { 
            state.searchBoardResult = action.payload; 
        },
        setTotalPages(state, action: PayloadAction<number>) { 
            state.totalPages = action.payload; 
        }
    }
});

export const { setSearchBoardResult,setTotalPages } = searchBoardResultSlice.actions;

export default searchBoardResultSlice.reducer;
