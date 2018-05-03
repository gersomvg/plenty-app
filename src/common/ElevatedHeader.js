import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const ElevatedHeader = props => (
    <RN.View style={[props.style, styles.wrapper]}>
        <RN.View styles={styles.bar}>{props.children}</RN.View>
        <RN.Image style={styles.shadow} source={require('assets/ui/header-shadow.png')} />
    </RN.View>
);

ElevatedHeader.propTypes = {
    children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
    style: PT.any,
};

ElevatedHeader.SHADOW_HEIGHT = 15;

const styles = RN.StyleSheet.create({
    wrapper: {
        paddingBottom: ElevatedHeader.SHADOW_HEIGHT,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: ElevatedHeader.SHADOW_HEIGHT,
        resizeMode: 'stretch',
    },
});

export {ElevatedHeader};
