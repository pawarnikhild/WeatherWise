/**
 * Work in Progress: Actual Location Permission Flow
 *
 * Status: This is actual flow of getting permission from user and is working but due to behavior of android it not working as intended.
 *
 * Known Issues:
 * - When clicked outside of the permission dialog raised by request function for first time, it returns 'blocked' instead of 'denied' as permission status.
 *      Expected Behavior: It should return 'denied', allowing the app to request permission a second time programmatically.
 *      Android allows developers to request permission twice before requiring the user to manually enable it in app settings.
 *
 *      If the permission is granted initially, then revoked via app settings, made request again and then clicked outside the dialog then it correctly returns 'denied'.
 *
 * Note:
 * From documentation - Android will never return 'blocked' on permission function check, you have to call request function to get the actual status.
 *
 * Solution:
 * - No solution has been identified yet. It seems to be an Android system issue that React Native can't do anything in it.
 * - Currently, permission is requested only once in the app. If denied, users must manually enable it in the app settings.
 *
 * Next Steps:
 * - Seek advice or solutions from online communities or experts.
 *
 * Created on: 08-08-2024
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {fetchWeatherForecast} from '../services/weather-api';

const ActualLocationPermissionFlow = () => {
  const checkLocationPermission = async () => {
    // let permissionStatus = await check('android.permission.ACCESS_COARSE_LOCATION'); // This is from android
    let permissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ); // This is from react-native-permission
    console.log('permissionStatus in CLP ', permissionStatus);
    if (permissionStatus === 'granted') {
      console.log('Checked: Location permission granted');
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
    let permissionStatus = await request(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
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
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  };

  const checkLocationEnabled = async () => {
    const isLocationEnabled = await DeviceInfo.isLocationEnabled();
    console.log('isLocationEnabled in CLE', isLocationEnabled);
    if (!isLocationEnabled) {
      turnOnLocationAlert();
    } else {
      console.log('checkLocationEnabled:', 'Location services are enabled.');
      getCurrentLocation();
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

  // This function takes some time to complete execution
  const getCurrentLocation = () => {
    console.log('Getting current location...');
    Geolocation.getCurrentPosition(
      position => {
        console.log('Current location:', JSON.stringify(position));
      },
      error => {
        console.log('GetCurrentPosition Error', JSON.stringify(error));
      },
      {enableHighAccuracy: true},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.whiteText}>Actual Location Permission Flow</Text>
      <Button title="Request Permission" onPress={checkLocationPermission} />
    </View>
  );
};

export default ActualLocationPermissionFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
});
