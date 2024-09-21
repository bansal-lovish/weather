
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
    'weathers/fetchWeather',
    async (query:string) => {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${query}&key=004cac201ef14672aea52234240606`);
        return response.data;
    }
);
export const fetchForecast = createAsyncThunk(
  'weathers/fetchForecast',
  async (query:any) => {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=12&key=004cac201ef14672aea52234240606`);
      return response.data;
  }
);
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: [],
        forecast:[],
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error state when starting to fetch
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null; // Reset error state on successful fetch
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message ?? null; // Set error to null if action.error.message is undefined
            })
            .addCase(fetchForecast.pending, (state) => {
              state.loading = true;
              state.error = null; // Reset error state when starting to fetch
          })
          .addCase(fetchForecast.fulfilled, (state, action) => {
              state.loading = false;
              state.forecast = action.payload;
              state.error = null; // Reset error state on successful fetch
          })
          .addCase(fetchForecast.rejected, (state, action) => {
              state.loading = false;
              state.error = action?.error?.message ?? null; // Set error to null if action.error.message is undefined
          });
    }
});

export default weatherSlice.reducer;