import axios from "axios";
import { weatherApiApiKey } from "../utils/constants";
import { fetchLocationsParamsType, fetchWeatherForecastParamsType, endpointType } from "../types/api";
// const locationEndpoint = params => `http://api.weatherstack.com/current?access_key=${apiKey}&query=${params.cityName}`

const locationEndpoint = (params: fetchLocationsParamsType) => `https://api.weatherapi.com/v1/search.json?key=${weatherApiApiKey}&q=${params.cityName}`
const forecastEndpoint = (params: fetchWeatherForecastParamsType) => `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiApiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const apiCall = async (endpoint: endpointType) => {
    const options = {
        method: 'GET',
        url: endpoint
    };
    try {
        const response = await axios.request(options);
        console.log('API called')
        return response.data;

    } catch (error) {
        console.log('Error: ', error);
        return error;

    }
}

export const fetchLocations = (params: fetchLocationsParamsType) => {
    return apiCall(locationEndpoint(params));
}

export const fetchWeatherForecast = (params: fetchWeatherForecastParamsType) => {
    return apiCall(forecastEndpoint(params));
}
