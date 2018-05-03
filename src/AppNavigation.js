import {StackNavigator} from 'react-navigation';

import {Home, SearchContainer, ProductContainer, Scan} from './modules';

export default StackNavigator(
    {
        Home: {
            screen: Home,
        },
        Search: {
            screen: SearchContainer,
        },
        Scan: {
            screen: Scan,
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
