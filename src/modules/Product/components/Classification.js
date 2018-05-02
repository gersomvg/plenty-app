import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text, Emoji} from 'common';
import {styling} from 'config';

class Classification extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
    };

    state = {expanded: false};

    handleBarPress = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        return (
            <RN.View style={[styles.container, this.props.style]}>
                {this.renderTappableBar()}
                {this.renderExplanation()}
            </RN.View>
        );
    }

    renderTappableBar = () => {
        const adverb = {
            YES: '100%',
            MAYBE: 'Misschien',
            NO: 'Niet',
        }[this.props.product.classification];
        const arrowStyle = this.state.expanded && {transform: [{rotate: '180deg'}]};

        return (
            <RN.TouchableOpacity
                style={styles.bar}
                activeOpacity={0.5}
                onPress={this.handleBarPress}
            >
                <Text weight="heavier" color="brand">
                    {adverb}
                </Text>
                <Text style={styles.veganLabel}>veganistisch</Text>
                <Emoji type={this.props.product.classification} />
                <RN.View style={styles.flex} />
                <RN.Image
                    style={[styles.arrow, arrowStyle]}
                    source={require('assets/ui/expand-arrow.png')}
                />
            </RN.TouchableOpacity>
        );
    };

    renderExplanation = () => {
        if (!this.state.expanded) return null;

        return (
            <Text color="lighter" align="left" size="smaller" style={styles.explanation}>
                {this.props.product.explanation || 'Geen uitleg gegegeven'}
            </Text>
        );
    };
}

const styles = RN.StyleSheet.create({
    container: {
        backgroundColor: styling.COLOR_BG_SUBTLE_SECONDARY,
    },
    bar: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    veganLabel: {
        marginLeft: 6,
        marginRight: 4,
    },
    explanation: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 32,
    },
    flex: {
        flex: 1,
    },
    arrow: {
        width: 18,
        height: 6,
        resizeMode: 'contain',
    },
});

export {Classification};
