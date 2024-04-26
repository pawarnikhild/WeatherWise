import React, {useState} from 'react';
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

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locatoins, setLocations] = useState([1, 2, 3]);

  const handleLocationPress = (location: any) => {
    console.log(location);
  };
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/bg.png')}
        className="absolute h-full w-full"
        blurRadius={70}
      />
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
              />
            )}

            <TouchableOpacity
              className="rounded-full p-3 m-1"
              style={{backgroundColor: theme.bgWhite(0.3)}}
              onPress={() => setShowSearch(!showSearch)}>
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
          {locatoins.length > 0 && showSearch && (
            <View className="absolute w-full top-16 bg-gray-300 rounded-3xl">
              {locatoins.map((location, index) => {
                let showBorder = index + 1 != locatoins.length;
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
                      London, United States
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View className="mx-4 mb-2 flex flex-1 justify-around">
          <Text className="text-white text-center text-2xl font-bold">
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={require('../assets/images/partlycloudy.png')}
              className="h-52 w-52"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center text-6xl font-bold ml-5 text-white">
              23&#176;{/* This add degree symbol or do simply following */}
              {/* 25°C */}
            </Text>
            <Text className="text-center text-xl ml-5 tracking-widest text-white">
              Partly Cloudy
            </Text>
          </View>
          <View className="mx-4 flex-row justify-between">
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require('../assets/icons/wind.png')}
                className="h-6 w-6"
              />
              <Text className="font-semibold text-base text-white"> 22 km</Text>
            </View>
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require('../assets/icons/drop.png')}
                className="h-6 w-6"
              />
              <Text className="font-semibold text-base text-white"> 23 %</Text>
            </View>
            <View className="space-x-2 flex-row items-center">
              <Image
                source={require('../assets/icons/sun.png')}
                className="h-6 w-6"
              />
              <Text className="font-semibold text-base text-white">
                {' '}
                6:05 AM
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
            <View
              className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-xl font-semibold text-white'>25°C</Text>
            </View>
            <View
              className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-xl font-semibold text-white'>25°C</Text>
            </View>
            <View
              className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-xl font-semibold text-white'>25°C</Text>
            </View>
            <View
              className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-xl font-semibold text-white'>25°C</Text>
            </View>
            <View
              className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-xl font-semibold text-white'>25°C</Text>
            </View>
            <View
              className="mr-4 w-24 space-y-1 py-3 flex justify-center items-center rounded-3xl"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-xl font-semibold text-white'>25°C</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* <Text className='text-4xl text-red-600'>HomeScreen</Text> */}
    </View>
  );
};

export default HomeScreen;
