import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Spacing = props => <RN.View style={styles[props.size]} />;

Spacing.propTypes = {
    size: PT.oneOf(['s', 'm', 'l']).isRequired,
};

Spacing.defaultProps = {
    size: 'm',
};

const styles = RN.StyleSheet.create({
    s: {
        height: 8,
        width: 8,
    },
    m: {
        height: 16,
        width: 16,
    },
    l: {
        height: 32,
        height: 32,
    },
});

export {Spacing};
