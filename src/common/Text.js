import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {styling} from 'config';

const Text = ({font, size, color, align, style, children, ...textProps}) => {
    const fontStyle = styles[`font-${font}`];
    const sizeStyle = styles[`size-${size}`];
    const colorStyle = styles[`color-${color}`];
    const alignStyle = styles[`align-${align}`];
    return (
        <RN.Text {...textProps} style={[fontStyle, sizeStyle, colorStyle, alignStyle, style]}>
            {children}
        </RN.Text>
    );
};

Text.propTypes = {
    children: PT.oneOfType([PT.string, PT.number]).isRequired,
    style: PT.any,
    font: PT.oneOf(['default', 'brand']),
    size: PT.oneOf(['smaller', 'default', 'bigger']),
    color: PT.oneOf(['default', 'brand', 'lighter']),
    align: PT.oneOf(['left', 'center', 'right']),
};

Text.defaultProps = {
    size: 'default',
    font: 'default',
    color: 'default',
    align: 'center',
};

export const styles = RN.StyleSheet.create({
    'font-default': {
        fontFamily: 'System',
    },
    'font-brand': {
        fontFamily: styling.FONT_FAMILY_BRAND,
        letterSpacing: 0.65,
    },

    'size-smaller': {
        fontSize: 16,
    },
    'size-default': {
        fontSize: 18,
    },
    'size-bigger': {
        fontSize: 20,
    },

    'color-default': {
        color: styling.COLOR_TEXT_DEFAULT,
    },
    'color-brand': {
        color: styling.COLOR_BRAND_PRIMARY,
    },
    'color-lighter': {
        color: styling.COLOR_TEXT_LIGHTER,
    },

    'align-left': {
        textAlign: 'left',
    },
    'align-center': {
        textAlign: 'center',
    },
    'align-right': {
        textAlign: 'right',
    },
});

export {Text};
