import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';
import { Text } from './Text';
import { Emoji } from './Emoji';

const ErrorMessageWithButton = props => {
    return (
        <RN.View style={styles.wrapper}>
            <Emoji type="POO" />
            <Text style={styles.message}>{props.message}</Text>
            <RN.TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={styles.button}>
                <Text>{props.buttonLabel}</Text>
            </RN.TouchableOpacity>
        </RN.View>
    );
};

ErrorMessageWithButton.propTypes = {
    onPress: PT.func.isRequired,
    message: PT.string.isRequired,
    buttonLabel: PT.string.isRequired,
};

const styles = RN.StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 8,
        paddingHorizontal: 16,
    },
    button: {
        marginTop: 16,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 6,
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: styling.COLOR_BG_LIGHT,
    },
});

export { ErrorMessageWithButton };
