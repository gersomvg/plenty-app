import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';
import { styles as textStyles } from 'common/Text';

class TextInput extends React.PureComponent {
    static propTypes = {
        onPress: PT.func,
        value: PT.string,
        placeholder: PT.string,
    };

    static HEIGHT = 48;

    state = { isFocused: false };

    handleInputRef = c => (this.inputRef = c);

    handleOnFocus = (...args) => {
        this.setState({ isFocused: true });
        if (this.props.onFocus) this.props.onFocus(...args);
    };

    handleOnBlur = (...args) => {
        this.setState({ isFocused: false });
        if (this.props.onBlur) this.props.onBlur(...args);
    };

    handleClear = () => {
        if (this.inputRef) this.inputRef.clear();
        if (this.props.onChangeText) this.props.onChangeText('');
    };

    render() {
        const { onPress, placeholder, primaryColor, ...inputProps } = this.props;
        const inputStyles = [
            styles.input,
            textStyles['font-default'],
            textStyles['size-default'],
            textStyles['color-default'],
        ];

        return (
            <RN.View style={this.props.style}>
                <RN.TextInput
                    {...inputProps}
                    style={inputStyles}
                    ref={this.handleInputRef}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                />
                {this.renderClearButton()}
                {this.renderPlaceholder()}
            </RN.View>
        );
    }

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

    renderPlaceholder = () => {
        if (!this.state.isFocused && !this.props.value) {
            const placeholderStyles = [
                textStyles['font-default'],
                textStyles['size-default'],
                textStyles['color-lighter'],
                styles.placeholder,
            ];
            return (
                <RN.Text style={placeholderStyles} numberOfLines={1} pointerEvents="none">
                    {this.props.placeholder}
                </RN.Text>
            );
        }
    };
}

const styles = RN.StyleSheet.create({
    input: {
        height: TextInput.HEIGHT,
        borderRadius: 6,
        backgroundColor: styling.COLOR_BG_LIGHT,
        paddingLeft: 16,
        paddingRight: 48,
        zIndex: 1,
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
    },
    placeholder: {
        position: 'absolute',
        height: 48,
        lineHeight: 48,
        top: 0,
        left: 16,
        right: 48,
        textAlign: 'left',
        zIndex: 2,
    },
});

export { TextInput };
