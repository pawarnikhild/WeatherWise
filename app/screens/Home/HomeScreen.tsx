import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { debounce } from 'lodash';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';

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
    // fetchMyLocation();
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    // let permissionStatus = await check('android.permission.ACCESS_COARSE_LOCATION'); // This is from android
    let permissionStatus;
    if (Platform.OS === 'android') {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION); // This is from react-native-permission
    } else if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
    // console.log('permissionStatus in CLP ', permissionStatus);
    // console.log('RESULTS', RESULTS)
    // console.log('PERMISSIONS', PERMISSIONS)
    if (permissionStatus === 'granted') {
      console.log('Location permission granted');
      checkLocationEnabled();
    } else {
      askLocationPermissionAlert();
    }
  };

  const askLocationPermissionAlert = () => {
    Alert.alert(
      'Optional Location Permission',
      'This app needs location permission to provide weather information for your location, but if you prefer not to share your location, you can manually set it instead.',
      [
        {
          text: 'Maybe later',
          onPress: () => canDoItLaterFromMenuAlert(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Refused to request permissions!'),
        },
        {
          text: 'Ok',
          onPress: () => requestLocationPermission(),
        },
      ],
    );
  };

  const canDoItLaterFromMenuAlert = () => {
    Alert.alert(
      'You Can Do This Later',
      'You can enable location permission anytime from the menu',
      [
        {
          text: 'Ok',
          onPress: () => console.log('Ok Pressed!'),
        },
      ],
    );
  };

  const requestLocationPermission = async () => {
    let permissionStatus;
    if (Platform.OS === 'android') {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    } else if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
    console.log('permissionStatus in RLP ', permissionStatus);
    if (permissionStatus === 'granted') {
      checkLocationEnabled();
    } else if (permissionStatus === 'denied') {
      canDoItLaterFromMenuAlert();
    } else {
      // permissionStatus = 'blocked'
      canDoFromSettingAlert();
    }
  };

  const canDoFromSettingAlert = () => {
    Alert.alert(
      'Enable Location Permission',
      'To continue using this feature, enable location permissions through the app settings. Click the button below to go to settings.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Refused to go to App Settings!'),
        },
        {
          text: 'Go to settings',
          onPress: () => {
            if (Platform.OS === 'android') {
              Linking.openSettings()
            } else if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            }
          },
        },
      ],
    );
  };

  const checkLocationEnabled = async () => {
    const isLocationEnabled = await DeviceInfo.isLocationEnabled();
    // console.log('isLocationEnabled in CLE', isLocationEnabled);
    if (!isLocationEnabled) {
      turnOnLocationAlert();
    } else {
      console.log('checkLocationEnabled:', 'Location services are enabled');
      getCurrentLocationWeather();
    }
  };

  const turnOnLocationAlert = () => {
    Alert.alert(
      'Location Services Disabled',
      'Location services are turned off. Enable them to use this feature.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Refused to go to Location Settings!'),
        },
        {
          text: 'Open settings',
          onPress: () => {
            if (Platform.OS === 'android') {
              Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
            } else if (Platform.OS === 'ios') {
              Linking.openURL('App-Prefs:Privacy');
            }
          },
        },
      ],
    );
  };

  const getCurrentLocationWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('Current location:', JSON.stringify(position));
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        // @ts-ignore
        setLoading(true);
        fetchWeatherForecast({
          // cityName: 'pune',
          coordinates: location,
          days: 10,
        }).then(data => {
          //@ts-ignore
          setWeather(data);
          setLoading(false);
          console.log('Forecast data fetched using current location');
          // console.log(JSON.stringify(data));
        });
      },
      error => {
        // Alert.alert('GetCurrentPosition Error', JSON.stringify(error))
        console.log('GetCurrentPosition Error', JSON.stringify(error));
      },
      // {enableHighAccuracy: true},
    );
  };
  // console.log('#########', currentLocation)

  // Manual location search ---------------------------------------------------------------------

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
      //@ts-ignore
      setWeather(data);
      setLoading(false);
      console.log('Initial forecast data fetched');
      console.log(JSON.stringify(data));
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
      //@ts-ignore
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
        //@ts-ignore
        setLocations(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  return (
    <HomeScreenView
      showSearch={showSearch}
      locations={locations}
      weather={weather}
      loading={loading}
      handleTextDebounce={handleTextDebounce}
      toggleShowSearch={toggleShowSearch}
      handleLocationPress={handleLocationPress}
      requestLocationPermission={requestLocationPermission}
      checkLocationPermission={checkLocationPermission}
    />
  );
};

export default HomeScreen;
