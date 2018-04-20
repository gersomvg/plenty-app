import {isIphoneX} from './isIphoneX';

const getBottomSafeHeight = () => {
    return isIphoneX() ? 16 : 0;
};

export {getBottomSafeHeight};
