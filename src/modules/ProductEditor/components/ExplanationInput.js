import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { TextInput, Text } from 'common';
import { styling } from 'config';

class ExplanationInput extends React.PureComponent {
    static propTypes = {
        value: PT.string,
        onChange: PT.func.isRequired,
        classification: PT.oneOf(['YES', 'MAYBE', 'NO']),
    };

    get shortcuts() {
        if (!this.props.classification) return [];
        return {
            YES: [
                {
                    label: 'Label',
                    text:
                        'Op de verpakking staat expliciet vermeld dat dit product veganistisch is.',
                },
                {
                    label: 'Fabrikant',
                    text: 'De fabrikant heeft bevestigd dat dit product veganistisch is.',
                },
                {
                    label: 'Ingrediënten',
                    text: 'Op de verpakking staan uitsluitend plantaardige ingrediënten vermeld.',
                },
            ],
            MAYBE: [
                {
                    label: 'Ingrediënten',
                    text:
                        'Van de volgende ingrediënten kan niet worden vastgesteld of ze plantaardig zijn: ',
                },
                {
                    label: 'Risicoproduct',
                    text:
                        'Van dit type product is bekend dat de volgende ingrediënten vaak worden toegevoegd: ',
                },
            ],
            NO: [
                { label: 'Sowieso niet', text: 'De volgende ingrediënten zijn niet plantaardig: ' },
                {
                    label: 'Onwaarschijnlijk',
                    text:
                        'Van de volgende ingrediënten is het niet waarschijnlijk dat ze plantaardig zijn: ',
                },
            ],
        }[this.props.classification];
    }

    applyShortcut = text => {
        this.props.onChange(`${this.props.value}${this.props.value ? ' ' : ''}${text}`);
    };

    render() {
        return (
            <RN.View style={this.props.style}>
                <TextInput
                    placeholder="Uitleg"
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    multiline
                    style={styles.input}
                    maxLength={1000}
                    hasBottomBar
                />
                <RN.ScrollView
                    style={styles.scroller}
                    contentContainerStyle={styles.scrollerContent}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {this.shortcuts.map(shortcut => (
                        <RN.TouchableOpacity
                            style={styles.shortcutButton}
                            key={shortcut.text}
                            activeOpacity={0.5}
                            onPress={() => this.applyShortcut(shortcut.text)}
                        >
                            <Text size="smaller">{shortcut.label}</Text>
                        </RN.TouchableOpacity>
                    ))}
                </RN.ScrollView>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    input: {
        zIndex: 1,
    },
    scroller: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: styling.COLOR_BG_LIGHT_PRIMARY,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        height: 36,
    },
    scrollerContent: {
        paddingHorizontal: 8,
        flexDirection: 'row',
    },
    shortcutButton: {
        height: 36,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
});

export { ExplanationInput };
