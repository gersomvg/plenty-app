import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, ErrorMessageWithButton, FeedbackForm } from 'common';
import { getSafeBottomHeight } from 'utils';
import { styling } from 'config';
import { Product } from './Product';
import { SubTags } from './SubTags';

class Products extends React.PureComponent {
    static propTypes = {
        products: PT.array.isRequired,
        fetchStatus: PT.string.isRequired,
        fetchMoreStatus: PT.string.isRequired,
        onPressProduct: PT.func.isRequired,
        onLoad: PT.func.isRequired,
        onLoadMore: PT.func.isRequired,
        tagId: PT.number,
        onPressTag: PT.func.isRequired,
        reachedBottom: PT.bool.isRequired,
        collapseSubTags: PT.bool.isRequired,
        onToggleCollapse: PT.func.isRequired,
        style: PT.any,
    };

    keyExtractor = item => item.id.toString();

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
                keyExtractor={this.keyExtractor}
                windowSize={3}
                keyboardShouldPersistTaps="handled"
                extraData={this.props}
                onEndReached={this.props.onLoadMore}
            />
        );
    }

    renderHeader = () => {
        return (
            <SubTags
                tagId={this.props.tagId}
                style={styles.subTags}
                onPress={this.props.onPressTag}
                collapseSubTags={this.props.collapseSubTags}
                onToggleCollapse={this.props.onToggleCollapse}
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
        paddingBottom: 16 + getSafeBottomHeight(),
    },
    subTags: {
        marginBottom: 16,
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
