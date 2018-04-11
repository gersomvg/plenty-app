import React from 'react';
import RN from 'react-native';
import {NavigationActions} from 'react-navigation';

import Root from 'common/Root';
import Box from 'common/Box';
import Separator from 'common/Separator';
import SearchAndFilters from './components/SearchAndFilters';

export default class Home extends React.Component {
    handleOnPressBack = () => {
        const goBack = NavigationActions.back();
        this.props.navigation.dispatch(goBack);
    };

    render() {
        return (
            <Root>
                <Box safeTop left="none" right="bigger">
                    <SearchAndFilters onPressBack={this.handleOnPressBack} />
                </Box>
                <Separator />
            </Root>
        );
    }
}
