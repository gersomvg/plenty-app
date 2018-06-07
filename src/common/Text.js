import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';

const Text = ({ font, size, color, align, weight, style, children, ...textProps }) => {
    const fontStyle = styles[`font-${font}`];
    const sizeStyle = styles[`size-${size}`];
    const colorStyle = styles[`color-${color}`];
    const alignStyle = styles[`align-${align}`];
    const weightStyle = styles[`weight-${weight}`];
    return (
        <RN.Text
            {...textProps}
            style={[fontStyle, sizeStyle, colorStyle, alignStyle, weightStyle, style]}
        >
            {children}
        </RN.Text>
    );
};

Text.propTypes = {
    font: PT.oneOf(['default', 'brand']),
    size: PT.oneOf(['smaller', 'default', 'bigger', 'huge']),
    color: PT.oneOf(['default', 'brand', 'lighter']),
    align: PT.oneOf(['left', 'center', 'right']),
    weight: PT.oneOf(['default', 'heavier']),
};

Text.defaultProps = {
    size: 'default',
    font: 'default',
    color: 'default',
    align: 'center',
    weight: 'default',
};

export const styles = RN.StyleSheet.create({
    'font-default': {
        fontFamily: 'System',
    },
    'font-brand': {
        fontFamily: styling.FONT_FAMILY_BRAND,
    },

    'size-smaller': {
        fontSize: 16,
        lineHeight: 16 * 1.3,
    },
    'size-default': {
        fontSize: 18,
        lineHeight: 18 * 1.3,
    },
    'size-bigger': {
        fontSize: 20,
        lineHeight: 20 * 1.3,
    },
    'size-huge': {
        fontSize: 24,
        lineHeight: 24 * 1.3,
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

    'weight-default': {},
    'weight-heavier': {
        fontWeight: '600',
    },
});

export { Text };
