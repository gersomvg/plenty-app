import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

const Emoji = props => {
    const emojis = {
        YES: require('assets/emoji/YES.png'),
        LIKELY: require('assets/emoji/LIKELY.png'),
        UNLIKELY: require('assets/emoji/UNLIKELY.png'),
        NO: require('assets/emoji/NO.png'),
        POO: require('assets/emoji/POO.png'),
    };
    return <RN.Image style={styles.emoji} source={emojis[props.type]} />;
};

Emoji.propTypes = {
    type: PT.oneOf(['YES', 'NO', 'LIKELY', 'UNLIKELY', 'POO']),
};

const styles = RN.StyleSheet.create({
    emoji: {
        width: 22,
        height: 22,
        marginHorizontal: 4,
        resizeMode: 'contain',
    },
});

export {Emoji};
