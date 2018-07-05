import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import { getSafeTopHeight, getSafeBottomHeight } from 'utils';
import { SearchAndScan, Categories, AdminTools } from './components';

@connect(({ auth }) => ({
    isAuthorized: auth.status === 'AUTHORIZED',
    isSuperAdmin: auth.user && auth.user.superAdmin,
}))
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

    handleOnPressCreate = () => {
        this.props.navigation.push('ProductEditor');
    };

    handleOnLongPressTitle = () => {
        if (this.props.isAuthorized) {
            this.props.dispatch.auth.unauthorize();
        } else {
            this.props.navigation.push('Login');
        }
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
                {this.props.isAuthorized && (
                    <AdminTools
                        isSuperAdmin={this.props.isSuperAdmin}
                        style={styles.adminTools}
                        onPressCreate={this.handleOnPressCreate}
                        onPressInbox={() => {}}
                        onPressSuper={() => {}}
                    />
                )}
                <Categories onPress={this.handleOnPressCategory} style={styles.categories} />
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
    },
    adminTools: {
        marginTop: 32,
        paddingHorizontal: 16,
    },
    categories: {
        marginTop: 48,
    },
});

export { Home };
