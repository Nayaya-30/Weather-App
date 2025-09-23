import axios from 'axios';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city, units = 'metric') => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        units: units,
        appid: apiKey
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Weather data not found');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchForecastData = async (city, units = 'metric') => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        units: units,
        appid: apiKey
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Forecast data not found');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
};