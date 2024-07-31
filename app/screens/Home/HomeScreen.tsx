import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { fetchLocations, fetchWeatherForecast } from '../../services/weather-api';
import { storeLocation, retrieveLocation } from '../../utils/asyncStorage';
import { weatherType } from '../../types/HomeScreenTypes';

import HomeScreenView from './HomeScreenView';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState<weatherType>({
    current: {
      condition: {
        text: '',
        icon: '',
      },
      temp_c: '',
      wind_kph: 0,
      humidity: 0,
    },
    location: {
      name: '',
      region: '',
      country: '',
    },
    forecast: {
      forecastday: [
        {
          date: '',
          day: {
            avgtemp_c: 0,
            condition: {
              text: '',
              icon: '',
              code: 0,
            },
          },
          astro: {
            sunrise: '',
          },
        },
      ],
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyLocation();
  }, []);

  // This function fetches default or previously searched location
  const fetchMyLocation = async () => {
    let myCity = await retrieveLocation('city');
    let defaultCity = 'Delhi';
    if (myCity) defaultCity = myCity;
    setLoading(true);
    fetchWeatherForecast({
      cityName: defaultCity,
      days: 10,
    }).then(data => {
      setWeather(data);
      setLoading(false);
      console.log('Initial forecast data fetched');
      // console.log(JSON.stringify(data));
    });
  };
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleLocationPress = (location: any) => {
    console.log(location);
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: location.name,
      days: 14,
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeLocation('city', location.name);
      console.log('Forecast data fetched');
      // console.log(JSON.stringify(data));
    });
  };

  const handleSearch = (text: string) => {
    console.log(text);
    if (text.length > 2) {
      fetchLocations({ cityName: text }).then(data => {
        console.log('Locations data fetched');
        // console.log(JSON.stringify(data));
        setLocations(data);
      });
    }
  };

  const hadnleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  return (
    <HomeScreenView
      showSearch={showSearch}
      locations={locations}
      weather={weather}
      loading={loading}
      hadnleTextDebounce={hadnleTextDebounce}
      toggleShowSearch={toggleShowSearch}
      handleLocationPress={handleLocationPress}
    />
  );
};

export default HomeScreen;
