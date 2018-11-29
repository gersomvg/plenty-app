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
        ProductEditor: {
            screen: modules.ProductEditor,
        },
        Scraper: {
            screen: modules.Scraper,
        },
        Inbox: {
            screen: modules.Inbox,
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
        Onboarding: {
            screen: modules.Onboarding,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
);

export default RootStack;
