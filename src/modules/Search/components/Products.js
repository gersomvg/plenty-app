import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text, ErrorMessageWithButton} from 'common';
import {getSafeBottomHeight} from 'utils';
import {Product} from './Product';

class Products extends React.PureComponent {
    static propTypes = {
        products: PT.array.isRequired,
        fetchStatus: PT.string.isRequired,
        fetchMoreStatus: PT.string.isRequired,
        onPressProduct: PT.func.isRequired,
        onLoad: PT.func.isRequired,
        onLoadMore: PT.func.isRequired,
        style: PT.any,
    };

    keyExtractor = item => item.id.toString();

    getItemLayout = (data, index) => ({
        length: Product.height,
        offset: index * Product.height + 16,
        index,
    });

    render() {
        return (
            <RN.FlatList
                style={this.props.style}
                contentContainerStyle={styles.contentContainer}
                data={this.props.products}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmpty}
                ListFooterComponent={this.renderFooter}
                getItemLayout={this.getItemLayout}
                keyExtractor={this.keyExtractor}
                windowSize={3}
                keyboardShouldPersistTaps="handled"
                extraData={`${this.props.fetchStatus}${this.props.fetchMoreStatus}`}
                onEndReached={this.props.onLoadMore}
            />
        );
    }

    renderItem = ({item}) => {
        const onPress = () => this.props.onPressProduct({product: item});
        return <Product product={item} onPress={onPress} />;
    };

    renderFooter = () => {
        const isAnyLoading =
            this.props.fetchStatus === 'loading' || this.props.fetchMoreStatus === 'loading';
        if (isAnyLoading) {
            return this.renderLoading();
        }
        const isAnyError =
            this.props.fetchStatus === 'error' || this.props.fetchMoreStatus === 'error';
        if (isAnyError) {
            return this.renderRetry();
        }
        return null;
    };

    renderLoading = () => {
        return (
            <RN.View style={styles.row}>
                <RN.ActivityIndicator />
            </RN.View>
        );
    };

    renderRetry = () => {
        const onPress =
            this.props.fetchStatus === 'error'
                ? this.props.onLoad
                : () => this.props.onLoadMore({retryAfterError: true});
        const message = 'Laden is niet gelukt';
        const buttonLabel = 'Probeer opnieuw';
        return (
            <RN.View style={styles.row}>
                <ErrorMessageWithButton
                    onPress={onPress}
                    message={message}
                    buttonLabel={buttonLabel}
                />
            </RN.View>
        );
    };

    renderEmpty = () => {
        if (this.props.fetchStatus !== 'loaded') return null;
        return (
            <RN.View style={styles.row}>
                <Text>Geen producten gevonden</Text>
            </RN.View>
        );
    };
}

const styles = RN.StyleSheet.create({
    contentContainer: {
        paddingTop: 16,
        paddingBottom: 16 + getSafeBottomHeight(),
    },
    row: {
        padding: 16,
    },
});

export {Products};
