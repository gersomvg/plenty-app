import {StackNavigator} from 'react-navigation';

import Home from './modules/Home/Home';
import Search from './modules/Search/Search';

export default StackNavigator(
    {
        Home: {
            screen: Home,
        },
        Search: {
            screen: Search,
        },
    },
    {
        navigationOptions: {
            header: null,
        },
    },
);
