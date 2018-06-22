import { createStackNavigator } from 'react-navigation';

import * as modules from './modules';

const MainStack = createStackNavigator(
    {
        Home: {
            screen: modules.Home,
        },
        Search: {
            screen: modules.Search,
        },
        Scan: {
            screen: modules.ScanContainer,
        },
        Product: {
            screen: modules.ProductContainer,
        },
    },
    {
        headerMode: 'none',
    },
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        Login: {
            screen: modules.Login,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
);

export default RootStack;
