import {StackNavigator} from 'react-navigation';

import Home from './modules/Home/Home';
import SearchContainer from './modules/Search/SearchContainer';
import ProductContainer from './modules/Product/ProductContainer';

export default StackNavigator(
    {
        Home: {
            screen: Home,
        },
        Search: {
            screen: SearchContainer,
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
