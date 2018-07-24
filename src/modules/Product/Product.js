import React from 'react';
import RN from 'react-native';

import { Text, IconButton, ErrorMessageWithButton, FeedbackForm } from 'common';
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
            <RN.KeyboardAvoidingView
                behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.screen}
            >
                {{
                    initial: this.renderLoading,
                    loading: this.renderLoading,
                    loaded: this.renderProductInfo,
                    notfound: this.renderNotFound,
                    error: this.renderError,
                }[this.props.fetchStatus]()}
                <IconButton style={styles.back} icon="back" onPress={this.props.onPressBack} />
            </RN.KeyboardAvoidingView>
        );
    }

    renderLoading = () => {
        return <RN.ActivityIndicator />;
    };

    renderProductInfo = () => (
        <React.Fragment>
            <RN.Animated.ScrollView
                style={styles.scroller}
                contentContainerStyle={styles.scrollerInner}
                onScroll={this.onScrollEvent}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="never"
            >
                <ProductInfo product={this.props.product} />
                <Classification product={this.props.product} style={styles.classification} />
                <Shops product={this.props.product} />
                {this.renderFeedback()}
            </RN.Animated.ScrollView>
            <DynamicHeaderBar
                product={this.props.product}
                onPressBack={this.props.onPressBack}
                scrollY={this.scrollY}
                appearAfter={120}
            />
            {this.props.isAuthorized && (
                <IconButton style={styles.edit} icon="edit" onPress={this.props.onPressEdit} />
            )}
        </React.Fragment>
    );

    renderFeedback = () => {
        const title = 'Heb je aanvullende informatie?';
        const subtitle =
            'Het kan zijn dat een product veranderd is, of dat er verkooppunten zijn bijgekomen of afgevallen. Zou je ons willen tippen hoe we de informatie kunnen verbeteren?';
        const placeholder = 'Verbeterpunt';
        const buttonLabel = 'Verstuur';
        return (
            <FeedbackForm
                title={title}
                subtitle={subtitle}
                placeholder={placeholder}
                buttonLabel={buttonLabel}
                style={styles.feedback}
                inputStyle={styles.lightFeedbackInput}
                productId={this.props.product.id}
            />
        );
    };

    renderNotFound = () => {
        const title = 'Deze barcode is nog onbekend';
        const subtitle =
            'We zijn druk bezig om zo veel mogelijk producten toe te voegen. Zou je ons willen tippen welk product dit is?';
        const placeholder = 'Omschrijving van product';
        const buttonLabel = 'Verstuur';
        return (
            <RN.ScrollView
                style={styles.scroller}
                contentContainerStyle={styles.scrollerInner}
                keyboardShouldPersistTaps="handled"
            >
                <FeedbackForm
                    title={title}
                    subtitle={subtitle}
                    placeholder={placeholder}
                    buttonLabel={buttonLabel}
                    style={styles.feedback404}
                    barcode={this.props.requestedBarcode}
                />
            </RN.ScrollView>
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
    },
    scrollerInner: {
        minHeight: '100%',
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
    edit: {
        position: 'absolute',
        right: 0,
        top: getSafeTopHeight() + 16,
    },
    feedback: {
        marginBottom: 32,
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: styling.COLOR_BG_SUBTLE_SECONDARY,
    },
    lightFeedbackInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: styling.COLOR_BG_LIGHT_SECONDARY,
    },
    feedback404: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
});

export default Product;
