import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {theme} from '../theme';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import {debounce} from 'lodash';

import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {weatherImages} from '../constants';
import { storeLocation, retrieveLocation } from '../utils/asyncStorage';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyLocation();
  }, []);

  // This function fetches default or previously searched location
  const fetchMyLocation = async () => {
    let myCity = await retrieveLocation('city')
    let defaultCity = 'Delhi';
    if(myCity) defaultCity = myCity;
    setLoading(true);
    fetchWeatherForecast({
      cityName: defaultCity,
      days: 10
    }).then(data => {
      setWeather(data);
      setLoading(false);
      console.log('Initial forecast data fetched');
      // console.log(JSON.stringify(data));
    })
  }

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
      storeLocation('city', location.name)
      console.log('Forecast data fetched');
      // console.log(JSON.stringify(data));
    });
  };

  const handleSearch = (text: string) => {
    console.log(text);
    if (text.length > 2) {
      fetchLocations({cityName: text}).then(data => {
        console.log('Locations data fetched');
        // console.log(JSON.stringify(data));
        setLocations(data);
      });
    }
  };

  const hadnleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/bg.png')}
        className="absolute h-full w-full"
        blurRadius={70}
      />
      {
        loading ? (
          <View className='flex-1 justify-center items-center'>
            {/* <Text className='text-white text-4xl'>Loading...</Text> */}
            <Progress.CircleSnail size={140} thickness={10} color='#0bb3b2' />

          </View>
        ) : (
          <SafeAreaView className="flex-1">
        <View className="mx-4 relative z-50" style={{height: '7%'}}>
          {/*sytle kadhun check karne farak padtoy ka */}
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
            }}>
            {showSearch && (
              <TextInput
                placeholder="Search city"
                placeholderTextColor="lightgrey"
                className="flex-1 pl-6 h-10 text-base text-white"
                onChangeText={hadnleTextDebounce}
              />
            )}

            <TouchableOpacity
              className="rounded-full p-3 m-1"
              style={{backgroundColor: theme.bgWhite(0.3)}}
              onPress={() => setShowSearch(!showSearch)}>
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch && (
            <View className="absolute w-full top-16 bg-gray-300 rounded-3xl">
              {locations.map((location, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';
                return (
                  <TouchableOpacity
                    key={index}
                    className={
                      'flex-row p-3 px-4 mb-1 border-0 items-center ' +
                      borderClass
                    }
                    onPress={() => handleLocationPress(location)}>
                    <MapPinIcon size={20} color="grey" />
                    <Text className="text-black text-lg ml-2">
                      {location?.name}, {location?.region}, {location?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View className="mx-4 mb-2 flex flex-1 justify-around">
          <Text className="text-white text-center text-2xl font-bold">
            {location?.name},
            <Text className="text-lg font-semibold text-gray-300">
              {' ' + location?.country}
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              // source={require('../assets/images/partlycloudy.png')}
              // source={{uri: 'https://cdn.weatherapi.com/weather/64x64/day/353.png'}}
              source={{uri: 'https:'+current?.condition?.icon}} // This is for displaying original image
              // source={weatherImages[current?.condition?.text]} // These are our improved images instead of originals
              className="h-52 w-52"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center text-6xl font-bold ml-5 text-white">
              {current?.temp_c}&#176;
              {/* This add degree symbol or do simply following */}
              {/* 25°C */}
            </Text>
            <Text className="text-center text-xl ml-5 tracking-widest text-white">
              {current?.condition?.text}
            </Text>
          </View>
          <View className="mx-4 flex-row justify-between">
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require('../assets/icons/wind.png')}
                className="h-6 w-6"
              />
              <Text className="font-semibold text-base text-white">
                {' '}
                {current?.wind_kph} km
              </Text>
            </View>
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require('../assets/icons/drop.png')}
                className="h-6 w-6"
              />
              <Text className="font-semibold text-base text-white">
                {' '}
                {current?.humidity} %
              </Text>
            </View>
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require('../assets/icons/sun.png')}
                className="h-6 w-6"
              />
              <Text className="font-semibold text-base text-white">
                {' '}
                {weather?.forecast?.forecastday[0].astro.sunrise}
              </Text>
            </View>
          </View>
        </View>
        <View className="mb-2 space-y-3">
          <View className="mx-5 space-x-2 flex-row items-center">
            <CalendarDaysIcon size={22} color="white" />
            <Text className="text-base text-white">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 15}}
            showsHorizontalScrollIndicator={false}>
            {weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: 'long' };
              let dayName = date.toLocaleDateString('en-US', options);

              date
              return (
                <View
                  key={index}
                  className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
                  style={{backgroundColor: theme.bgWhite(0.15)}}>
                  <Image
                    // source={weatherImages[item?.day?.condition?.text]}
                    source={{uri: 'https:'+item?.day?.condition?.icon}}
                    className="h-11 w-11"
                  />
                  {/* <Text className="text-white">{item?.date}</Text> */}
                  <Text className="text-white">{dayName}</Text>
                  <Text className="text-xl font-semibold text-white">{item?.day?.avgtemp_c}°C</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
        )

      }
      
      {/* <Text className='text-4xl text-red-600'>HomeScreen</Text> */}
    </View>
  );
};

export default HomeScreen;
