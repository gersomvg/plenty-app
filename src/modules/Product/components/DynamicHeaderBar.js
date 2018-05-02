import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text, BackButton} from 'common';
import {getSafeTopHeight} from 'utils';

class DynamicHeaderBar extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
        onPressBack: PT.func.isRequired,
        scrollY: PT.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.gradientY = props.scrollY.interpolate({
            inputRange: [-1, 0],
            outputRange: [-1, 0],
            extrapolateRight: 'clamp',
        });
        this.gradientStyle = {transform: [{translateY: this.gradientY}]};
    }

    render() {
        return <BackButton style={styles.backButton} onPress={this.props.onPressBack} />;
    }
}

const styles = RN.StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 16 + getSafeTopHeight(),
    },
});

export {DynamicHeaderBar};
