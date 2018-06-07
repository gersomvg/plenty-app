import React from 'react';
import RN from 'react-native';

import { Text, IconButton, ErrorMessageWithButton } from 'common';
import { styling } from 'config';
import { ProductInfo, DynamicHeaderBar, Classification, Shops } from './components';
import { getSafeTopHeight, getSafeBottomHeight } from 'utils';

class Product extends React.PureComponent {
    scrollY = new RN.Animated.Value(0);
    onScrollEvent = RN.Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
        useNativeDriver: true,
    });

    render() {
        return (
            <RN.View style={styles.screen}>
                {{
                    initial: this.renderLoading,
                    loading: this.renderLoading,
                    loaded: this.renderProductInfo,
                    notfound: this.renderNotFound,
                    error: this.renderError,
                }[this.props.fetchStatus]()}
                <IconButton style={styles.back} icon="back" onPress={this.props.onPressBack} />
            </RN.View>
        );
    }

    renderLoading = () => {
        return <RN.ActivityIndicator />;
    };

    renderProductInfo = () => {
        return [
            <RN.Animated.ScrollView
                style={styles.scroller}
                onScroll={this.onScrollEvent}
                scrollEventThrottle={16}
                key="info"
            >
                <ProductInfo product={this.props.product} />
                <Classification product={this.props.product} style={styles.classification} />
                <Shops product={this.props.product} />
            </RN.Animated.ScrollView>,
            <DynamicHeaderBar
                product={this.props.product}
                onPressBack={this.props.onPressBack}
                scrollY={this.scrollY}
                appearAfter={120}
                key="bar"
            />,
        ];
    };

    renderNotFound = () => {
        const message = 'Dit product staat (nog) niet in de app';
        const buttonLabel = 'Ga terug';
        return (
            <ErrorMessageWithButton
                onPress={this.props.onPressBack}
                message={message}
                buttonLabel={buttonLabel}
            />
        );
    };

    renderError = () => {
        const message = 'Laden is niet gelukt';
        const buttonLabel = 'Probeer opnieuw';
        return (
            <ErrorMessageWithButton
                onPress={this.props.onReload}
                message={message}
                buttonLabel={buttonLabel}
            />
        );
    };
}

const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    scroller: {
        flex: 1,
        paddingTop: getSafeTopHeight(),
        paddingBottom: getSafeBottomHeight(),
    },
    classification: {
        marginVertical: 16,
    },
    back: {
        position: 'absolute',
        left: 0,
        top: getSafeTopHeight() + 16,
    },
});

export default Product;
