export type fetchLocationsParamsType = {
    cityName: string
}

export type fetchWeatherForecastParamsType = {
    cityName?: string,
    coordinates?: {
        latitude: number,
        longitude: number
      }
    days: number,
}

export type endpointType = string
