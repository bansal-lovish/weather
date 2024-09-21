import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/iso');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchCitiesByCountry = createAsyncThunk(
    'countries/fetchCitiesByCountry',
    async (countryName: string, thunkAPI) => {
      try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
          country: countryName
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
      }
    }
  );

const weatherSlice = createSlice({
    name: 'country',
    initialState: {
        data: [],
        cities:[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error state when starting to fetch
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null; // Reset error state on successful fetch
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null; // Set error message
            })
            .addCase(fetchCitiesByCountry.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error state when starting to fetch
            })
            .addCase(fetchCitiesByCountry.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
                state.error = null; // Reset error state on successful fetch
            })
            .addCase(fetchCitiesByCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null; // Set error message
            });
    },
});

export default weatherSlice.reducer;
