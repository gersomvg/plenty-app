import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';

const IconButton = props => {
    const source = {
        back: require('assets/ui/back.png'),
        filter: require('assets/ui/filter.png'),
        close: require('assets/ui/close.png'),
        edit: require('assets/ui/edit.png'),
        archive: require('assets/ui/archive.png'),
        unarchive: require('assets/ui/unarchive.png'),
    }[props.icon];
    return (
        <RN.TouchableOpacity
            style={[styles.button, props.style]}
            activeOpacity={0.5}
            onPress={() => props.onPress()}
        >
            <RN.Image
                style={[styles.icon, props.color === 'brand' && styles.colorBrand]}
                source={source}
            />
        </RN.TouchableOpacity>
    );
};

IconButton.propTypes = {
    onPress: PT.func.isRequired,
    icon: PT.oneOf(['back', 'filter', 'close', 'edit', 'archive', 'unarchive']).isRequired,
    color: PT.oneOf(['default', 'brand']).isRequired,
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
        tintColor: styling.COLOR_BRAND_PRIMARY,
    },
});

export { IconButton };
