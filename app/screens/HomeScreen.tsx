import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {theme} from '../theme';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locatoins, setLocations] = useState([1, 2, 3]);

  const handleLocationPress = (location) => {
    console.log(location)
  }
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/bg.png')}
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
      </SafeAreaView>
      {/* <Text className='text-4xl text-red-600'>HomeScreen</Text> */}
    </View>
  );
};

export default HomeScreen;
