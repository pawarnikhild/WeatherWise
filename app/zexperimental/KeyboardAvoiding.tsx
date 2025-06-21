// Giving fixed height is good to avoid shrinking when keyboard appers

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
//         keyboardVerticalOffset={50}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView contentContainerStyle={{flexGrow: 1}}>
//             <View style={styles.container}>
//               <TextInput style={styles.input} />
//               <View style={styles.view1}>
//                 <Text style={styles.text}>Some Text</Text>
//                 <Text style={styles.text}>Some Text</Text>
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
//   },
//   view1: {
//     flex: 1,
//     height: 700,
//     backgroundColor: 'red',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   input: {
//     borderWidth: 1,
//   },
//   text: {
//     fontSize: 25,
//     color: 'black',
//   },
// });

// -------------------------------------------------

// This is same code as above but using Tailwind CSS
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Dimensions,
} from 'react-native';
import React from 'react';

const KeyboardAvoiding = () => {
  const screenHeight = Dimensions.get('window').height;
  const targetHeight = screenHeight * 0.8;
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        keyboardVerticalOffset={30}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View className="flex-1 justify-center p-2">
              <TextInput className="border border-gray-400" />
              <View
                style={{height: targetHeight}}
                className="bg-green-500 justify-between items-center my-2">
                {/* <View className="flex-1 bg-red-500 justify-between items-center my-2"> */}
                <Text className="text-[25px] text-black">Some Text</Text>
                <Text className="text-[25px] text-black">Some Text</Text>
                <Text className="text-[25px] text-black">Some Text</Text>
              </View>
              <TextInput className="border border-gray-400" />
              {/* <Text className="text-black text-base">Optional Permission This app needs location permission to get weather information of your location or else you can type your location manually</Text> */}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoiding;
