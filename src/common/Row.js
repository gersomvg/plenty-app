import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Row = props => <RN.View style={styles.row}>{props.children}</RN.View>;
const RowFill = props => <RN.View style={styles.rowFill}>{props.children}</RN.View>;

Row.Fill = RowFill;

Row.propTypes = {
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
};

const styles = RN.StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowFill: {
        flex: 1,
        justifyContent: 'center',
    },
});

export {Row};
