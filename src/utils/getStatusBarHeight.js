import RN from 'react-native';
import isIphoneX from './isIphoneX';

export default ({skipAndroid = true} = {}) => {
    if (RN.Platform.OS === 'ios') {
        return isIphoneX() ? 44 : 20;
    }

    if (skipAndroid) {
        return 0;
    }

    return RN.StatusBar.currentHeight;
};
