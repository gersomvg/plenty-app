import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';
import { styles as textStyles } from 'common/Text';

class SearchInput extends React.PureComponent {
    static propTypes = {
        value: PT.string,
        onChange: PT.func.isRequired,
    };

    static HEIGHT = 48;

    handleClear = () => {
        if (this.props.onChange) this.props.onChange('');
    };

    render = () => {
        const { onChange, ...inputProps } = this.props;

        return (
            <RN.View style={this.props.style}>
                <RN.TextInput
                    {...inputProps}
                    onChangeText={onChange}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                />
                <RN.Image style={styles.icon} source={require('assets/ui/input-search.png')} />
                {this.renderClearButton()}
            </RN.View>
        );
    };

    renderClearButton = () => {
        if (this.props.value) {
            return (
                <RN.TouchableOpacity
                    onPress={this.handleClear}
                    activeOpacity={0.5}
                    style={styles.clearButton}
                >
                    <RN.Image style={styles.clearIcon} source={require('assets/ui/clear.png')} />
                </RN.TouchableOpacity>
            );
        }
    };
}

const styles = RN.StyleSheet.create({
    input: {
        height: SearchInput.HEIGHT,
        borderRadius: 6,
        backgroundColor: 'white',
        paddingHorizontal: 48,
        zIndex: 1,
        fontFamily: 'System',
        fontSize: 18,
        color: styling.COLOR_PRIMARY_DARK,
    },
    icon: {
        position: 'absolute',
        width: 16,
        height: 16,
        left: 16,
        top: 16,
        resizeMode: 'contain',
        zIndex: 2,
    },
    clearButton: {
        position: 'absolute',
        width: 48,
        height: 48,
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    clearIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: styling.COLOR_PRIMARY_DARK,
    },
    placeholderContainer: {
        position: 'absolute',
        height: 48,
        top: 0,
        paddingHorizontal: 48,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    placeholder: {
        lineHeight: 48,
        textAlign: 'center',
    },
});

export { SearchInput };
