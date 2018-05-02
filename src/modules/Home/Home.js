import React from 'react';
import RN from 'react-native';
import {NavigationActions} from 'react-navigation';

import {getSafeTopHeight, getSafeBottomHeight} from 'utils';
import {Entry} from './components';

export default class Home extends React.Component {
    handleOnPressSearch = () => {
        const goToSearch = NavigationActions.navigate({routeName: 'Search'});
        this.props.navigation.dispatch(goToSearch);
    };

    render() {
        return (
            <RN.ScrollView alwaysBounceVertical={false} style={styles.screen}>
                <Entry onPressSearch={this.handleOnPressSearch} />
            </RN.ScrollView>
        );
    }
}

const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32 + getSafeTopHeight(),
        paddingBottom: 32 + getSafeBottomHeight(),
        paddingHorizontal: 16,
    },
});
