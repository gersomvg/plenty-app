import RN from 'react-native';
import {isIphoneX} from './isIphoneX';

const getSafeTopHeight = ({skipAndroid = true} = {}) => {
    if (RN.Platform.OS === 'ios') {
        return isIphoneX() ? 44 : 20;
    }

    if (skipAndroid) {
        return 0;
    }

    return RN.StatusBar.currentHeight;
};

const getSafeBottomHeight = () => {
    return isIphoneX() ? 16 : 0;
};

export {getSafeTopHeight, getSafeBottomHeight};
