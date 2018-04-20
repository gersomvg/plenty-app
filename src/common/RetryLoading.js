import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {styling} from 'config';
import {Text} from './Text';
import {getStatusBarHeight} from 'utils';

const RetryLoading = props => {
    return (
        <RN.View>
            <Text>Laden is niet gelukt 💩</Text>
            <RN.TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={styles.button}>
                <Text>Probeer opnieuw</Text>
            </RN.TouchableOpacity>
        </RN.View>
    );
};

RetryLoading.propTypes = {
    onPress: PT.func.isRequired,
};

const styles = RN.StyleSheet.create({
    button: {
        marginTop: 16,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 6,
        overflow: 'hidden',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: styling.COLOR_BG_LIGHT,
    },
});

export {RetryLoading};
