import React from 'react';
import RN from 'react-native';
import {NavigationActions} from 'react-navigation';

import {getSafeTopHeight, getSafeBottomHeight} from 'utils';
import {SearchAndScan} from './components';

class Home extends React.Component {
    handleOnPressSearch = () => {
        const goToSearch = NavigationActions.navigate({routeName: 'Search'});
        this.props.navigation.dispatch(goToSearch);
    };

    handleOnPressScan = () => {
        const goToScan = NavigationActions.navigate({routeName: 'Scan'});
        this.props.navigation.dispatch(goToScan);
    };

    render() {
        return (
            <RN.ScrollView alwaysBounceVertical={false} style={styles.screen}>
                <SearchAndScan
                    onPressSearch={this.handleOnPressSearch}
                    onPressScan={this.handleOnPressScan}
                />
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

export {Home};
