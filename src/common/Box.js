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
    console.log(props.spacing);
    const boxStyles = [styles.box, props.safeTop && styles.safeTop, ...spacingStyles];

    return <RN.View style={boxStyles}>{props.children}</RN.View>;
};

Box.propTypes = {
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
    safeTop: PT.bool.isRequired,
    left: PT.oneOf(['none', 'default', 'bigger']).isRequired,
    right: PT.oneOf(['none', 'default', 'bigger']).isRequired,
    top: PT.oneOf(['none', 'default', 'bigger']).isRequired,
    bottom: PT.oneOf(['none', 'default', 'bigger']).isRequired,
    spacing: PT.oneOf(['default', 'bigger']),
};

Box.defaultProps = {
    safeTop: false,
    left: 'default',
    right: 'default',
    top: 'default',
    bottom: 'default',
};

const styles = RN.StyleSheet.create({
    'top-default': {
        paddingTop: 24,
    },
    'top-bigger': {
        paddingTop: 36,
    },
    'bottom-default': {
        paddingBottom: 24,
    },
    'bottom-bigger': {
        paddingBottom: 36,
    },
    'left-default': {
        paddingLeft: 16,
    },
    'left-bigger': {
        paddingLeft: 24,
    },
    'right-default': {
        paddingRight: 16,
    },
    'right-bigger': {
        paddingRight: 24,
    },
    safeTop: {
        borderTopWidth: getStatusBarHeight(),
        borderColor: 'transparent',
    },
});

export default Box;
