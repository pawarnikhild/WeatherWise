import axios from "axios";
import { weatherApiApiKey } from "../utils/constants";
import { fetchLocationsParamsType, fetchWeatherForecastParamsType, endpointType } from "../types/api";
import { forecastApiData } from '../utils/weatherWiseData'
// const locationEndpoint = params => `http://api.weatherstack.com/current?access_key=${apiKey}&query=${params.cityName}`

const locationEndpoint = (params: fetchLocationsParamsType) => `https://api.weatherapi.com/v1/search.json?key=${weatherApiApiKey}&q=${params.cityName}`
const forecastEndpointForCityName = (params: fetchWeatherForecastParamsType) => `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiApiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const forecastEndpointForCoordinates = (params: fetchWeatherForecastParamsType) => `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiApiKey}&q=${params.coordinates?.latitude},${params.coordinates?.longitude}&days=${params.days}&aqi=no&alerts=no`;

const apiCall = async (endpoint: endpointType) => {
    const options = {
        method: 'GET',
        url: endpoint
    };
    try {
        // const response = await axios.request(options);
        // console.log('API called')
        // return response.data;
        const response = forecastApiData;
        return response;

    } catch (error) {
        console.log('Error: ', error);
        return error;

    }
}

export const fetchLocations = (params: fetchLocationsParamsType) => {
    return apiCall(locationEndpoint(params));
}

export const fetchWeatherForecast = (params: fetchWeatherForecastParamsType) => {
    const { cityName, coordinates: coordinates } = params;
    // console.log('Params in fetchWeatherForecast', params)
    if (cityName) {
        return apiCall(forecastEndpointForCityName(params));
    } else if (coordinates) {
        return apiCall(forecastEndpointForCoordinates(params));
    } else {
        console.log('Error in fetchWeatherForecast both cityName or coordinates are missing!')
        throw new Error('Either cityName or coordinates must be provided');
    }
}
