import {StackNavigator} from 'react-navigation';

import Home from './modules/Home/Home';
import SearchContainer from './modules/Search/SearchContainer';

export default StackNavigator(
    {
        Home: {
            screen: Home,
        },
        Search: {
            screen: SearchContainer,
        },
    },
    {
        navigationOptions: {
            header: null,
        },
    },
);
