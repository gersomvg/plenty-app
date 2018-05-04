import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {styling} from 'config';

const BackButton = props => (
    <RN.TouchableOpacity
        style={[styles.button, props.contrast && styles.buttonContrast, props.style]}
        activeOpacity={0.5}
        onPress={props.onPress}
    >
        <RN.Image
            style={[styles.icon, props.contrast && styles.iconContrast]}
            source={require('assets/ui/back-button.png')}
        />
    </RN.TouchableOpacity>
);

BackButton.propTypes = {
    onPress: PT.func,
    contrast: PT.bool,
};

const styles = RN.StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContrast: {
        backgroundColor: '#FFFFFFBB',
        borderRadius: 6,
        overflow: 'hidden',
    },
    icon: {
        width: 15,
        height: 24,
        resizeMode: 'contain',
        marginRight: 1,
    },
    iconContrast: {
        //tintColor: 'black',
    },
});

export {BackButton};
