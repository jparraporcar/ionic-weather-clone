import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface CurrentWeatherQuery {
    lat: Number | null;
    lon: Number | null;
    appid: string
    units: string
}

interface CityWeatherQuery {
    q: string | null;
    appid: string;
    units: string;
}

export const coordQueryApi = createApi({
    reducerPath: 'coordQueryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/'}),
    endpoints: (builder) => ({
        getCurrentPositionWeather: builder.query<any,CurrentWeatherQuery>({
            query: (arg) =>{
                const {lat, lon, appid, units} = arg
                return {
                    url: '/weather',
                    params: {lat, lon, appid, units}
                }
            }
        }),
        getWeatherByCity: builder.query<any,CityWeatherQuery>({
            query: (arg) => {
                const {q, appid, units} = arg
                return {
                    url: 'weather',
                    params: {q, appid, units}

                }
            }
        })
    })
})

export const { useGetCurrentPositionWeatherQuery, useGetWeatherByCityQuery } = coordQueryApi
