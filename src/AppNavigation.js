import { createStackNavigator } from 'react-navigation';

import { Home, Search, ProductContainer, ScanContainer } from './modules';

export default createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        Search: {
            screen: Search,
        },
        Scan: {
            screen: ScanContainer,
        },
        Product: {
            screen: ProductContainer,
        },
    },
    {
        navigationOptions: {
            header: null,
        },
    },
);
