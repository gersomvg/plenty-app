import React from 'react';
import RN from 'react-native';
import {NavigationActions} from 'react-navigation';

import {Box, Separator} from 'common';
import {styling} from 'config';
import Entry from './components/Entry';

export default class Home extends React.Component {
    handleOnPressSearch = () => {
        const goToSearch = NavigationActions.navigate({routeName: 'Search'});
        this.props.navigation.dispatch(goToSearch);
    };

    render() {
        return (
            <RN.ScrollView alwaysBounceVertical={false} style={styling.flexWhite}>
                <Box safeTop top="bigger" bottom="bigger">
                    <Entry onPressSearch={this.handleOnPressSearch} />
                </Box>
                <Separator />
            </RN.ScrollView>
        );
    }
}
