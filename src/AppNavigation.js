import {StackNavigator} from 'react-navigation';
import Home from './modules/Home/Home';

export default StackNavigator(
    {
        Home: {
            screen: Home,
        },
    },
    {
        navigationOptions: {
            header: null,
        },
    },
);
