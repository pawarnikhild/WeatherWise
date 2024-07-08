import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocation = async (key, value)=> {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Stored searched location in Async Storage')
        
    } catch (error) {
        console.log('Error while storing location in Async Storage:', error);
    }
}

export const retrieveLocation = async (key)=> {
    try {
        return await AsyncStorage.getItem(key);
        console.log('Retrieved previously searched location from Async Storage')
        
    } catch (error) {
        console.log('Error while retrieving location in Async Storage:', error);
    }
}
