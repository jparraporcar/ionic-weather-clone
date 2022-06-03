import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CityQueryState {
city: string | null;
skip: boolean
}

const initialState: CityQueryState = {
    city: null,
    skip: true
}

export const cityQuerySlice = createSlice({
    name: 'cityQuery',
    initialState,
    reducers: {
        setQueryCity: (state, action: PayloadAction<CityQueryState>)=>{
            state = action.payload
            return state
        }
    }
})

export const { setQueryCity } = cityQuerySlice.actions
export default cityQuerySlice.reducer