import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text, Button } from 'common';

class FilterHint extends React.PureComponent {
    static propTypes = {
        onPress: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View style={[styles.container, this.props.style]}>
                <RN.Image style={styles.arrow} source={require('assets/ui/tooltip-arrow.png')} />
                <RN.View style={styles.tooltip}>
                    <Text color="white" size="bigger" style={styles.text}>
                        Met deze knop kan je filteren op supermarkt, categorie en
                        veganclassificatie.
                    </Text>
                    <Button label="Got it!" onPress={this.props.onPress} tint="white" />
                </RN.View>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    container: {
        width: '80%',
    },
    arrow: {
        height: 14,
        width: 24,
        alignSelf: 'flex-end',
        marginRight: 7,
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 6,
        padding: 24,
    },
    text: {
        marginBottom: 24,
    },
});

export { FilterHint };
