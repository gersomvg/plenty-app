import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const BackButton = props => (
    <RN.TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={props.onPress}>
        <RN.Image style={styles.icon} source={require('assets/ui/back-button.png')} />
    </RN.TouchableOpacity>
);

BackButton.propTypes = {
    onPress: PT.func,
};

const styles = RN.StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 15,
        height: 24,
        resizeMode: 'contain',
    },
});

export default BackButton;
