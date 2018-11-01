import { Dimensions, Platform } from 'react-native';

const isIphoneWithNotch = () => {
    const dimensions = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimensions.height === 812 ||
            dimensions.width === 812 ||
            dimensions.height === 896 ||
            dimensions.width === 896)
    );
};

export { isIphoneWithNotch };
