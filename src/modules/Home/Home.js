import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import { getSafeTopHeight, getSafeBottomHeight } from 'utils';
import { SearchAndScan, Tags, AdminTools, RecentProducts } from './components';

@connect(({ auth, onboarding }) => ({
    isAuthorized: auth.status === 'AUTHORIZED',
    isSuperAdmin: auth.user && auth.user.superAdmin,
    isOnboarded: onboarding.finished,
}))
class Home extends React.Component {
    componentDidMount = () => {
        if (!this.props.isOnboarded) {
            this.props.navigation.push('Onboarding');
        }
    };

    handleOnPressSearch = () => {
        this.props.navigation.push('Search', { autoFocus: true, collapseSubTags: true });
    };

    handleOnPressRecentTitle = () => {
        this.props.navigation.push('Search', {
            collapseSubTags: true,
            classifications: 'YES,MAYBE',
        });
    };

    handleOnPressRecentProduct = product => {
        this.props.navigation.push('Product', { product });
    };

    handleOnPressScan = () => {
        this.props.navigation.push('Scan');
    };

    handleOnPressTag = tagId => {
        this.props.navigation.push('Search', { tagId, classifications: 'YES,MAYBE' });
    };

    handleOnPressCreate = () => {
        this.props.navigation.push('ProductEditor');
    };

    handleOnPressInbox = () => {
        this.props.navigation.push('Inbox');
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
            <RN.ScrollView
                alwaysBounceVertical={false}
                style={styles.screen}
                contentContainerStyle={styles.screenInner}
            >
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
                        onPressInbox={this.handleOnPressInbox}
                        onPressSuper={() => {}}
                    />
                )}
                <RecentProducts
                    onPressTitle={this.handleOnPressRecentTitle}
                    onPressProduct={this.handleOnPressRecentProduct}
                    style={styles.recentProducts}
                />
                <Tags onPress={this.handleOnPressTag} style={styles.tags} />
            </RN.ScrollView>
        );
    }
}

const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    screenInner: {
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
    recentProducts: {
        marginTop: 32,
        marginHorizontal: 16,
    },
    tags: {
        marginTop: 36,
    },
});

export { Home };
