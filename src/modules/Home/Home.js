import React from 'react';
import RN from 'react-native';
import {NavigationActions} from 'react-navigation';

import Root from 'common/Root';
import Box from 'common/Box';
import Separator from 'common/Separator';
import Entry from './components/Entry';

export default class Home extends React.Component {
    handleOnPressSearch = () => {
        const goToSearch = NavigationActions.navigate({routeName: 'Search'});
        this.props.navigation.dispatch(goToSearch);
    };

    render() {
        return (
            <Root useComponent={RN.ScrollView} alwaysBounceVertical={false}>
                <Box safeTop top="bigger" bottom="bigger">
                    <Entry onPressSearch={this.handleOnPressSearch} />
                </Box>
                <Separator />
            </Root>
        );
    }
}
