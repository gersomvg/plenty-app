import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, ErrorMessageWithButton, FeedbackForm } from 'common';
import { getSafeBottomHeight } from 'utils';
import { styling } from 'config';
import { Product } from './Product';
import { FilterTags } from './FilterTags';

class Products extends React.PureComponent {
    static propTypes = {
        products: PT.array.isRequired,
        fetchStatus: PT.string.isRequired,
        fetchMoreStatus: PT.string.isRequired,
        onPressProduct: PT.func.isRequired,
        onLoad: PT.func.isRequired,
        onLoadMore: PT.func.isRequired,
        filters: PT.object.isRequired,
        onPressFilter: PT.func.isRequired,
        onRemoveFilter: PT.func.isRequired,
        isAnyFilterActive: PT.bool.isRequired,
        style: PT.any,
    };

    state = { extraData: null };

    static getDerivedStateFromProps = (props, state) => {
        const { extraData } = state;
        if (
            extraData === null ||
            extraData.fetchStatus !== props.fetchStatus ||
            extraData.fetchMoreStatus !== props.fetchMoreStatus ||
            extraData.filters !== props.filters
        ) {
            return {
                extraData: {
                    fetchStatus: props.fetchStatus,
                    fetchMoreStatus: props.fetchMoreStatus,
                    filters: props.filters,
                },
            };
        }
        return null;
    };

    keyExtractor = item => item.id.toString();

    getItemLayout = (data, index) => ({
        length: Product.height,
        offset:
            index * Product.height + 16 + (this.props.isAnyFilterActive ? FilterTags.height : 0),
        index,
    });

    render() {
        return (
            <RN.FlatList
                style={this.props.style}
                contentContainerStyle={styles.contentContainer}
                data={this.props.products}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderHeader}
                ListEmptyComponent={this.renderEmpty}
                ListFooterComponent={this.renderFooter}
                getItemLayout={this.getItemLayout}
                keyExtractor={this.keyExtractor}
                windowSize={3}
                keyboardShouldPersistTaps="handled"
                extraData={this.state.extraData}
                onEndReached={this.props.onLoadMore}
            />
        );
    }

    renderHeader = () => {
        if (!this.props.isAnyFilterActive) return null;
        return (
            <FilterTags
                filters={this.props.filters}
                onPressFilter={this.props.onPressFilter}
                onRemoveFilter={this.props.onRemoveFilter}
            />
        );
    };

    renderItem = ({ item }) => {
        const onPress = () => this.props.onPressProduct({ product: item });
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
        if (this.props.reachedBottom) {
            const title = 'Staat jouw favoriet er niet bij?';
            const subtitle =
                'We zijn druk bezig om zo veel mogelijk producten toe te voegen. Zou je ons willen tippen welk product je mist?';
            const placeholder = 'Omschrijving van product';
            const buttonLabel = 'Verstuur';
            return (
                <FeedbackForm
                    title={title}
                    subtitle={subtitle}
                    placeholder={placeholder}
                    buttonLabel={buttonLabel}
                    style={styles.feedback}
                />
            );
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
                : () => this.props.onLoadMore({ retryAfterError: true });
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
        padding: 32,
    },
    feedback: {
        marginHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 24,
        marginTop: 32,
        borderTopWidth: 1,
        borderColor: styling.COLOR_BORDER_LIGHT,
    },
});

export { Products };
