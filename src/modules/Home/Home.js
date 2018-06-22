import React from 'react';
import RN from 'react-native';

import { getSafeTopHeight, getSafeBottomHeight } from 'utils';
import { SearchAndScan, Categories } from './components';

class Home extends React.Component {
    handleOnPressSearch = () => {
        this.props.navigation.push('Search', { autoFocus: true });
    };

    handleOnPressScan = () => {
        this.props.navigation.push('Scan');
    };

    handleOnPressCategory = categoryId => {
        this.props.navigation.push('Search', { categoryId });
    };

    handleOnLongPressTitle = () => {
        this.props.navigation.push('Login');
    };

    render() {
        return (
            <RN.ScrollView alwaysBounceVertical={false} style={styles.screen}>
                <SearchAndScan
                    onPressSearch={this.handleOnPressSearch}
                    onPressScan={this.handleOnPressScan}
                    onLongPressTitle={this.handleOnLongPressTitle}
                    style={styles.searchAndScan}
                />
                <Categories onPress={this.handleOnPressCategory} />
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
    },
    searchAndScan: {
        paddingHorizontal: 16,
        marginBottom: 48,
    },
});

export { Home };
