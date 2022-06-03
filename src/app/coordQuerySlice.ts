import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordQueryState {
    lat: number | null;
    lon: number | null;
    skip: boolean
}

const initialState: CoordQueryState = {
    lat: null,
    lon: null,
    skip: true
}

export const coordQuerySlice = createSlice({
    name: 'coordQuery',
    initialState,
    reducers: {
        setQueryCoord: (state, action: PayloadAction<CoordQueryState>)=>{
            state = action.payload
            return state
        }
    }
})

export const { setQueryCoord } = coordQuerySlice.actions
export default coordQuerySlice.reducer