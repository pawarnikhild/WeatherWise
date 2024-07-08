import axios from "axios";
import { weatherApiApiKey } from "../constants";

// const locationEndpoint = params => `http://api.weatherstack.com/current?access_key=${apiKey}&query=${params.cityName}`

const locationEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${weatherApiApiKey}&q=${params.cityName}`
const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiApiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const apiCall = async (endpoint) => {
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

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}


export const fetchLocations = params => {
    return apiCall(locationEndpoint(params));
}

