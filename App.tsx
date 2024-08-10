import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HomeScreen from './app/screens/Home/HomeScreen'
import KeyboardAvoiding from './app/zexperimental/KeyboardAvoiding'
import ActualLocationPermissionFlow from './app/zexperimental/LocationPermissionFlowIssue'

const App = () => {
  return (
    <HomeScreen />
    // <KeyboardAvoiding />
    // <ActualLocationPermissionFlow />
  )
}

export default App

const styles = StyleSheet.create({})