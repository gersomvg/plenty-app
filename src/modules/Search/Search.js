import React from 'react';
import RN from 'react-native';
import {NavigationActions} from 'react-navigation';

import Root from 'common/Root';
import Box from 'common/Box';
import Separator from 'common/Separator';
import SearchAndFilters from './components/SearchAndFilters';
import Results from './components/Results';

export default class Home extends React.Component {
    state = {searchValue: ''};

    handleOnPressBack = () => {
        const goBack = NavigationActions.back();
        this.props.navigation.dispatch(goBack);
    };

    handleOnSearch = searchValue => this.setState({searchValue});

    render() {
        return (
            <Root>
                <Box safeTop left="none" right="bigger">
                    <SearchAndFilters
                        onPressBack={this.handleOnPressBack}
                        onSearch={this.handleOnSearch}
                        searchValue={this.state.searchValue}
                    />
                </Box>
                <Separator />
                <Box spacing="bigger">
                    <Results />
                </Box>
            </Root>
        );
    }
}
