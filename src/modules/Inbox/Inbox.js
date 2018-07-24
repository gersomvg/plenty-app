import React from 'react';
import RN from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import { withFetch } from 'hocs';
import { getSafeTopHeight } from 'utils';
import { ElevatedHeader, Text } from 'common';
import { HeaderContent, Messages } from './components';

@withFetch
class Inbox extends React.PureComponent {
    state = {
        showArchived: false,
        fetchStatus: 'initial',
        fetchMoreStatus: 'initial',
        messages: [],
        nextLink: null,
    };

    componentDidMount() {
        this.loadMessages();
    }

    loadMessages = async () => {
        try {
            if (this.fetch) this.fetch.cancel();
            if (this.fetchMore) this.fetchMore.cancel();
            this.setState({
                fetchStatus: 'loading',
                fetchMoreStatus: 'initial',
                messages: [],
                nextLink: null,
            });
            this.fetch = this.props.fetch('feedback.get')({ archived: this.state.showArchived });
            const data = await this.fetch.promise;
            this.setState({ fetchStatus: 'loaded', messages: data.items, nextLink: data.nextLink });
        } catch (e) {
            if (!e.isCanceled) this.setState({ fetchStatus: 'error' });
        }
    };

    loadMoreMessages = async ({ retryAfterError = false } = {}) => {
        const { fetchStatus, fetchMoreStatus, nextLink } = this.state;
        const blockedOnLoading = fetchStatus !== 'loaded' || fetchMoreStatus === 'loading';
        const blockedOnError = fetchMoreStatus === 'error' && !retryAfterError;
        if (blockedOnLoading || blockedOnError || !nextLink) return;

        try {
            this.setState({ fetchMoreStatus: 'loading' });
            this.fetchMore = this.props.fetch('feedback.get')({ nextLink: nextLink });
            const data = await this.fetchMore.promise;
            this.setState(state => ({
                ...state,
                fetchMoreStatus: 'loaded',
                messages: _.uniqBy(state.messages.concat(data.items), item => item.id),
                nextLink: data.nextLink,
            }));
        } catch (e) {
            if (!e.isCanceled) this.setState({ fetchMoreStatus: 'error' });
        }
    };

    changeShowArchived = async showArchived => {
        await this.setState({ showArchived });
        this.loadMessages();
    };

    goToProduct = product => {
        this.props.navigation.push('Product', { product });
    };

    goToCreate = barcode => {
        if (barcode) {
            this.props.navigation.push('ProductEditor', { product: { barcodes: [barcode] } });
        } else {
            this.props.navigation.push('ProductEditor');
        }
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    archiveMessage = async id => {
        try {
            await this.props.fetch('feedback.update')({ id, archived: !this.state.showArchived })
                .promise;
            this.setState(state => ({
                ...state,
                messages: state.messages.filter(message => message.id !== id),
            }));
        } catch (e) {
            RN.Alert.alert('Er is iets misgegaan bij het (de)archiveren van dit product');
        }
    };

    render() {
        return (
            <RN.View style={styles.screen}>
                <ElevatedHeader style={styles.header}>
                    <HeaderContent
                        showArchived={this.state.showArchived}
                        onChangeShowArchived={this.changeShowArchived}
                        onPressBack={this.goBack}
                    />
                </ElevatedHeader>
                <Messages
                    style={styles.messages}
                    messages={this.state.messages}
                    fetchStatus={this.state.fetchStatus}
                    fetchMoreStatus={this.state.fetchMoreStatus}
                    onPressProduct={this.goToProduct}
                    onPressCreate={this.goToCreate}
                    onPressArchive={this.archiveMessage}
                    onLoad={this.loadMessages}
                    onLoadMore={this.loadMoreMessages}
                />
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        zIndex: 2,
    },
    messages: {
        zIndex: 1,
        marginTop: HeaderContent.HEIGHT + getSafeTopHeight(),
    },
});

export { Inbox };
