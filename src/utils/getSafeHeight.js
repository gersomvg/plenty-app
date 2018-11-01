import RN from 'react-native';
import { isIphoneWithNotch } from './isIphoneWithNotch';

const getSafeTopHeight = ({ skipAndroid = true } = {}) => {
    if (RN.Platform.OS === 'ios') {
        return isIphoneWithNotch() ? 44 : 20;
    }

    if (skipAndroid) {
        return 0;
    }

    return RN.StatusBar.currentHeight;
};

const getSafeBottomHeight = () => {
    return isIphoneWithNotch() ? 16 : 0;
};

export { getSafeTopHeight, getSafeBottomHeight };
