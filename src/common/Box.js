import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import getStatusBarHeight from 'utils/getStatusBarHeight';

const Box = props => {
    let spacingStyles;
    if (props.spacing) {
        spacingStyles = [
            styles[`top-${props.spacing}`],
            styles[`bottom-${props.spacing}`],
            styles[`left-${props.spacing}`],
            styles[`right-${props.spacing}`],
        ];
    } else {
        spacingStyles = [
            props.top !== 'none' && styles[`top-${props.top}`],
            props.bottom !== 'none' && styles[`bottom-${props.bottom}`],
            props.left !== 'none' && styles[`left-${props.left}`],
            props.right !== 'none' && styles[`right-${props.right}`],
        ];
    }
    const boxStyles = [styles.box, props.safeTop && styles.safeTop, ...spacingStyles];

    return <RN.View style={boxStyles}>{props.children}</RN.View>;
};

Box.propTypes = {
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
    safeTop: PT.bool.isRequired,
    left: PT.oneOf(['none', 'default', 'smaller', 'bigger']).isRequired,
    right: PT.oneOf(['none', 'default', 'smaller', 'bigger']).isRequired,
    top: PT.oneOf(['none', 'default', 'smaller', 'bigger']).isRequired,
    bottom: PT.oneOf(['none', 'default', 'smaller', 'bigger']).isRequired,
    spacing: PT.oneOf(['default', 'smaller', 'bigger']),
};

Box.defaultProps = {
    safeTop: false,
    left: 'default',
    right: 'default',
    top: 'default',
    bottom: 'default',
};

const styles = RN.StyleSheet.create({
    'top-smaller': {
        paddingTop: 8,
    },
    'top-default': {
        paddingTop: 16,
    },
    'top-bigger': {
        paddingTop: 32,
    },
    'bottom-smaller': {
        paddingBottom: 8,
    },
    'bottom-default': {
        paddingBottom: 16,
    },
    'bottom-bigger': {
        paddingBottom: 32,
    },
    'left-smaller': {
        paddingLeft: 8,
    },
    'left-default': {
        paddingLeft: 16,
    },
    'left-bigger': {
        paddingLeft: 32,
    },
    'right-smaller': {
        paddingRight: 8,
    },
    'right-default': {
        paddingRight: 16,
    },
    'right-bigger': {
        paddingRight: 32,
    },
    safeTop: {
        borderTopWidth: getStatusBarHeight(),
        borderColor: 'transparent',
    },
});

export default Box;
