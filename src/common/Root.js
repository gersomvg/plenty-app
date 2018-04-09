import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Root = props => <RN.View style={styles.root}>{props.children}</RN.View>;

Root.propTypes = {
    children: PT.any,
};

const styles = RN.StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Root;
