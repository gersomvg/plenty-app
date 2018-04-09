import React from 'react';
import RN from 'react-native';
import C from 'config';

const Separator = props => (
    <RN.View style={styles.separator}>
        <RN.Image source={require('assets/ui/separator.png')} style={styles.shadow} />
    </RN.View>
);

const styles = RN.StyleSheet.create({
    separator: {
        height: 15,
        backgroundColor: C.styling.COLOR_BG_LIGHT,
    },
    shadow: {
        height: 15,
        width: '100%',
        resizeMode: 'stretch',
    },
});

export default Separator;
