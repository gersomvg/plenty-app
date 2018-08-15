import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text } from './Text';
import { styling } from 'config';

const Button = props => {
    const activeOpacity = props.disabled ? 1 : 0.5;
    const onPress = props.disabled ? undefined : props.onPress;
    const buttonStyles = [
        styles.button,
        styles[props.tint],
        props.disabled && styles.buttonDisabled,
        props.style,
    ];
    const textColor = props.tint === 'primary' ? 'white' : 'default';
    return (
        <RN.TouchableOpacity activeOpacity={activeOpacity} style={buttonStyles} onPress={onPress}>
            <Text color={textColor} numberOfLines={1} overflowMode="ellipsize">
                {props.label}
            </Text>
            {props.iconSource !== undefined && (
                <RN.View style={styles.iconWrapper}>
                    <RN.Image source={props.iconSource} />
                </RN.View>
            )}
        </RN.TouchableOpacity>
    );
};

Button.propTypes = {
    tint: PT.oneOf(['primary', 'secondaryLight', 'light', 'white']),
    onPress: PT.func.isRequired,
    label: PT.string.isRequired,
    disabled: PT.bool,
    iconSource: PT.number,
};

Button.defaultProps = {
    tint: 'primary',
};

const styles = RN.StyleSheet.create({
    button: {
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#999999',
    },
    primary: {
        backgroundColor: styling.COLOR_PRIMARY,
    },
    secondaryLight: {
        backgroundColor: styling.COLOR_BG_LIGHT_SECONDARY,
    },
    light: {
        backgroundColor: styling.COLOR_BG_LIGHT,
    },
    white: {
        backgroundColor: 'white',
    },
});

export { Button };
