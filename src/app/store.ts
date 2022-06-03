import { configureStore } from '@reduxjs/toolkit'
import coordQueryReducer from '../app/coordQuerySlice'
import { coordQueryApi } from '../services/weather'
import cityQueryReducer from '../app/cityQuerySlice'

export const store = configureStore({
    reducer: {
        coordQuery: coordQueryReducer,
        cityQuery: cityQueryReducer,
        [coordQueryApi.reducerPath]: coordQueryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coordQueryApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch