// import {
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
//   Keyboard,
// } from 'react-native';
// import React from 'react';

// const KeyboardAvoiding = () => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         keyboardVerticalOffset={30}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView contentContainerStyle={{flexGrow: 1}}>
//             <View
//               style={styles.container}
              
//             >
//               <View style={styles.view1}>
//                 <Text style={styles.text}>Some Text</Text>
//               </View>
//               <TextInput style={styles.input} />
//               {/* <Text style={styles.text}>Optional Permission This apps needs location permission to get weather information of your location or else you can type your location manually</Text> */}
//             </View>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default KeyboardAvoiding;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//     // backgroundColor: 'green'
//   },
//   view1: {
//     // flex: 1,
//     height: 700,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     // borderColor: 'black',
//     borderWidth: 1,
//   },
//   text: {
//     fontSize: 25,
//     color: 'black',
//   },
// });

// -------------------------------------------------

import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    Image
  } from 'react-native';
  import React from 'react';

  
  const KeyboardAvoiding = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={30}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View
                style={styles.container}
              >
                <TextInput style={styles.input} />
                {/* <View style={styles.view1}>
                  <Text style={styles.text}>Some Text</Text>
                </View> */}
                <Text style={styles.text}>Optional Permission This apps needs location permission to get weather information of</Text>
                <Image style={{height: 100, width: 200 }} source={{ uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'}} />
                <Text style={styles.text}>Your location or else you can type your location manually</Text>
                <Text style={styles.text}>Optional Permission This apps needs location permission to get weather information of</Text>
                <Image style={{height: 100, width: 200 }} source={{ uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'}} />
                <Text style={styles.text}>Your location or else you can type your location manually</Text>
                
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default KeyboardAvoiding;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      padding: 10,
      // backgroundColor: 'green'
    },
    view1: {
      // flex: 1,
      height: 700,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      // borderColor: 'black',
      borderWidth: 1,
    },
    text: {
      fontSize: 25,
      color: 'black',
      margin: 30
    },
  });
  