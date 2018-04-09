import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import C from 'config';

const Text = props => {
    const fontStyle = styles[`font-${props.font}`];
    const sizeStyle = styles[`size-${props.size}`];
    const colorStyle = styles[`color-${props.color}`];
    const alignStyle = styles[`align-${props.align}`];
    return (
        <RN.Text style={[fontStyle, sizeStyle, colorStyle, alignStyle, props.style]}>
            {props.children}
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

const styles = RN.StyleSheet.create({
    'font-default': {
        fontFamily: 'System',
    },
    'font-brand': {
        fontFamily: C.styling.FONT_FAMILY_BRAND,
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
        color: C.styling.COLOR_TEXT_DEFAULT,
    },
    'color-brand': {
        color: C.styling.COLOR_BRAND_PRIMARY,
    },
    'color-lighter': {
        color: C.styling.COLOR_TEXT_LIGHTER,
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

export default Text;
