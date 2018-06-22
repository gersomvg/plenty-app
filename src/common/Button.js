import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text } from './Text';
import { styling } from 'config';

const Button = props => (
    <RN.TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={props.onPress}>
        <Text color="white">{props.label}</Text>
    </RN.TouchableOpacity>
);

Button.propTypes = {
    onPress: PT.func.isRequired,
    label: PT.string.isRequired,
};

const styles = RN.StyleSheet.create({
    button: {
        height: 44,
        paddingHorizontal: 20,
        borderRadius: 6,
        backgroundColor: styling.COLOR_BRAND_PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { Button };
