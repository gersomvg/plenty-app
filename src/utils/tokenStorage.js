import { AsyncStorage } from 'react-native';

const tokenStorage = {};
let token = null;

tokenStorage.get = async () => {
    if (token !== null) return token;
    try {
        return await AsyncStorage.getItem('token');
    } catch (e) {}
};

tokenStorage.set = async newToken => {
    token = newToken;
    try {
        await AsyncStorage.setItem('token', newToken);
    } catch (e) {
        tokenStorage.clear();
    }
};

tokenStorage.clear = async () => {
    token = null;
    try {
        return await AsyncStorage.removeItem('token');
    } catch (e) {}
};

export { tokenStorage };
