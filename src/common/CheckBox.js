import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';

const CheckBox = props => {
    return (
        <RN.View style={[styles.outer, props.style]}>
            {props.checked && <RN.View style={styles.inner} />}
        </RN.View>
    );
};

CheckBox.propTypes = {
    checked: PT.bool,
};

const styles = RN.StyleSheet.create({
    outer: {
        width: 16,
        height: 16,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: styling.COLOR_BORDER_MEDIUM,
    },
    inner: {
        width: 10,
        height: 10,
        margin: 2,
        borderRadius: 2,
        backgroundColor: styling.COLOR_BRAND_PRIMARY,
    },
});

export { CheckBox };
