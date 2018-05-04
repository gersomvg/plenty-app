import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text, ElevatedHeader, BackButton} from 'common';
import {getSafeTopHeight} from 'utils';

class DynamicHeaderBar extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
        onPressBack: PT.func.isRequired,
        scrollY: PT.object.isRequired,
        appearAfter: PT.number.isRequired,
    };

    constructor(props) {
        super(props);
        const opacity = props.scrollY.interpolate({
            inputRange: [props.appearAfter, props.appearAfter + 10],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        this.opacityStyle = {opacity};
    }

    render() {
        return [
            <RN.Animated.View
                style={[styles.wrapper, this.opacityStyle]}
                key="bar"
                pointerEvents="none"
            >
                <ElevatedHeader>
                    <Text style={styles.name} numberOfLines={1} size="bigger" weight="heavier">
                        {this.props.product.name}
                    </Text>
                </ElevatedHeader>
            </RN.Animated.View>,
            <BackButton style={styles.back} key="back" onPress={this.props.onPressBack} />,
        ];
    }
}

const styles = RN.StyleSheet.create({
    wrapper: {
        ...RN.StyleSheet.absoluteFillObject,
    },
    name: {
        paddingVertical: 16,
        height: 48 + 2 * 16,
        lineHeight: 48,
        paddingHorizontal: 48,
        marginLeft: 8,
    },
    back: {
        position: 'absolute',
        left: 0,
        top: getSafeTopHeight() + 16,
    },
});

export {DynamicHeaderBar};
