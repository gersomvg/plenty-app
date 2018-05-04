import React from 'react';
import RN from 'react-native';
import {withNavigationFocus} from 'react-navigation';

import {Scan} from './Scan';

const ScanContainer = withNavigationFocus(Scan);

export {ScanContainer};
