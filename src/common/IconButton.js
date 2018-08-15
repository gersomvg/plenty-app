import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';

const IconButton = props => {
    const source = {
        back: require('assets/ui/back.png'),
        close: require('assets/ui/close.png'),
        edit: require('assets/ui/edit.png'),
        archive: require('assets/ui/archive.png'),
        unarchive: require('assets/ui/unarchive.png'),
        flashOn: require('assets/ui/flash-on.png'),
        flashOff: require('assets/ui/flash-off.png'),
    }[props.icon];
    return (
        <RN.TouchableOpacity
            style={[styles.button, props.style]}
            activeOpacity={0.5}
            onPress={() => props.onPress()}
        >
            <RN.Image
                style={[
                    styles.icon,
                    props.color === 'brand' && styles.colorBrand,
                    props.color === 'white' && styles.colorWhite,
                ]}
                source={source}
            />
        </RN.TouchableOpacity>
    );
};

IconButton.propTypes = {
    onPress: PT.func.isRequired,
    icon: PT.oneOf(['back', 'close', 'edit', 'archive', 'unarchive', 'flashOn', 'flashOff'])
        .isRequired,
    color: PT.oneOf(['default', 'brand', 'white']).isRequired,
};

IconButton.defaultProps = {
    color: 'default',
};

const styles = RN.StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        resizeMode: 'contain',
    },
    colorBrand: {
        tintColor: styling.COLOR_PRIMARY,
    },
    colorWhite: {
        tintColor: 'white',
    },
});

export { IconButton };
