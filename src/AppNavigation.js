import {StackNavigator} from 'react-navigation';

import {Home, SearchContainer, ProductContainer, ScanContainer} from './modules';

export default StackNavigator(
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
