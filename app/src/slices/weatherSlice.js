import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherData, fetchForecastData } from '../utils/weatherAPI';

// Async thunks for fetching data
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, units }, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherData(city, units);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async ({ city, units }, { rejectWithValue }) => {
    try {
      const data = await fetchForecastData(city, units);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  current: null,
  forecast: null,
  loading: false,
  error: null,
  unit: 'metric',
  theme: 'light',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch weather cases
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = "We couldn't connect to the server (API error). Please try again in a few moments.";
      })
      
      // Fetch forecast cases
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state) => {
        state.loading = false;
        state.error = "We couldn't connect to the server (API error). Please try again in a few moments."
      });
  },
});

export const { setUnit, toggleTheme, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;