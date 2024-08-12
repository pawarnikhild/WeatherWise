import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocation = async (value: string) => {
    try {
        await AsyncStorage.setItem('storedLocation', value);
        console.log('Stored searched location in Async Storage')
    } catch (error) {
        console.log('Error while storing location in Async Storage:', error);
    }
}

export const retrieveLocation = async () => {
    try {
        console.log('Retrieved previously searched location from Async Storage');
        return await AsyncStorage.getItem('storedLocation');
    } catch (error) {
        console.log('Error while retrieving location in Async Storage:', error);
    }
}

export const storeUserPermissionIntent = async (value: string) => {
    try {
        await AsyncStorage.setItem('userPermissionIntent', value);
        console.log('Stored userPermissionIntent as', value);
    } catch (error) {
        console.log('Error in storing userPermissionIntent', error)
    }
}

export const retrieveUserPermissionIntent = async () => {
    try {
        return await AsyncStorage.getItem('userPermissionIntent');

    } catch (error) {
        console.log('Error in storing userPermissionIntent', error)
    }
}
