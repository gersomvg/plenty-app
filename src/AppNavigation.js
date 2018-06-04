import { createStackNavigator } from 'react-navigation';

import { Home, SearchContainer, ProductContainer, ScanContainer } from './modules';

export default createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        Search: {
            screen: SearchContainer,
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
