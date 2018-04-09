import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Box = props => <RN.View style={styles[props.size]} />;

Box.propTypes = {
    size: PT.oneOf(['s', 'm', 'l']).isRequired,
};

Box.defaultProps = {
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

export default Box;
