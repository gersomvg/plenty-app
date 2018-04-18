import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import Box from 'common/Box';
import RetryLoading from 'common/RetryLoading';
import Text from 'common/Text';
import Product from './Product';

import getBottomSafeHeight from 'utils/getBottomSafeHeight';

export default class Products extends React.PureComponent {
    static propTypes = {
        products: PT.array.isRequired,
        fetchStatus: PT.string.isRequired,
        fetchMoreStatus: PT.string.isRequired,
        onPressProduct: PT.func.isRequired,
        onLoad: PT.func.isRequired,
        onLoadMore: PT.func.isRequired,
    };

    keyExtractor = item => item.id.toString();

    getItemLayout = (data, index) => ({
        length: Product.height,
        offset: index * Product.height + 8,
        index,
    });

    render() {
        return (
            <RN.FlatList
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
        const onPress = () => this.props.onPressProduct(item);
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
            <Box>
                <RN.ActivityIndicator />
            </Box>
        );
    };

    renderRetry = () => {
        const onPress =
            this.props.fetchStatus === 'error'
                ? this.props.onLoad
                : () => this.props.onLoadMore({retryAfterError: true});
        return (
            <Box>
                <RetryLoading onPress={onPress} />
            </Box>
        );
    };

    renderEmpty = () => {
        if (this.props.fetchStatus !== 'loaded') return null;
        return (
            <Box>
                <Text>Geen producten gevonden</Text>
            </Box>
        );
    };
}

const styles = RN.StyleSheet.create({
    contentContainer: {
        paddingTop: 8,
        paddingBottom: 8 + getBottomSafeHeight(),
    },
});
