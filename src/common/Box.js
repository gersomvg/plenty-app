import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import getStatusBarHeight from 'utils/getStatusBarHeight';

const Box = props => (
    <RN.View style={[styles.box, props.safeTop && styles.safeTop]}>{props.children}</RN.View>
);

Box.propTypes = {
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
    safeTop: PT.bool.isRequired,
};

Box.defaultProps = {
    afterStatusBar: false,
};

const styles = RN.StyleSheet.create({
    box: {
        paddingVertical: 36,
        paddingHorizontal: 24,
    },
    safeTop: {
        paddingTop: 36 + getStatusBarHeight(),
    },
});

export default Box;
