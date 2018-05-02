import React from 'react';
import RN from 'react-native';

import {Text, BackButton} from 'common';
import {styling} from 'config';
import {Header, DynamicHeaderBar, Classification, Shops} from './components';
import {getSafeTopHeight, getSafeBottomHeight} from 'utils';

class Product extends React.PureComponent {
    scrollY = new RN.Animated.Value(0);
    onScrollEvent = RN.Animated.event([{nativeEvent: {contentOffset: {y: this.scrollY}}}], {
        useNativeDriver: true,
    });

    render() {
        return (
            <RN.View style={styles.screen}>
                <RN.Animated.ScrollView
                    style={styles.scroller}
                    onScroll={this.onScrollEvent}
                    scrollEventThrottle={1}
                >
                    <Header product={this.props.product} />
                    <Classification product={this.props.product} style={styles.classification} />
                    <Shops product={this.props.product} />
                </RN.Animated.ScrollView>
                <DynamicHeaderBar
                    product={this.props.product}
                    onPressBack={this.props.onPressBack}
                    scrollY={this.scrollY}
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
    scroller: {
        paddingTop: getSafeTopHeight(),
        paddingBottom: getSafeBottomHeight(),
    },
    classification: {
        marginVertical: 16,
    },
});

export default Product;
