import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';
import { styles as textStyles } from 'common/Text';

class SearchInput extends React.PureComponent {
    static propTypes = {
        primaryColor: PT.bool.isRequired,
        overlayTouchable: PT.bool.isRequired,
        onPress: PT.func,
        value: PT.string,
        placeholder: PT.string,
    };

    static defaultProps = {
        primaryColor: false,
        overlayTouchable: false,
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
        return this.props.overlayTouchable ? this.renderOverlayedInput() : this.renderInput();
    }

    renderOverlayedInput = () => {
        return (
            <RN.TouchableOpacity onPress={this.props.onPress} activeOpacity={0.5}>
                {this.renderInput()}
            </RN.TouchableOpacity>
        );
    };

    renderInput = () => {
        const { overlayTouchable, onPress, placeholder, primaryColor, ...inputProps } = this.props;
        const inputStyles = [
            styles.input,
            primaryColor && styles.inputPrimaryColor,
            textStyles['font-default'],
            textStyles['size-default'],
            textStyles['color-default'],
        ];
        const inputPointerEvents = overlayTouchable ? 'none' : 'auto';

        return (
            <RN.View style={this.props.style}>
                <RN.TextInput
                    {...inputProps}
                    style={inputStyles}
                    pointerEvents={inputPointerEvents}
                    ref={this.handleInputRef}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                    underlineColorAndroid="transparent"
                />
                <RN.Image style={styles.icon} source={require('assets/ui/search-icon.png')} />
                {this.renderClearButton()}
                {this.renderPlaceholder()}
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

    renderPlaceholder = () => {
        if (!this.state.isFocused && !this.props.value) {
            const placeholderStyles = [
                textStyles['font-default'],
                textStyles['size-default'],
                textStyles['color-default'],
                styles.placeholder,
            ];
            return (
                <RN.View
                    style={styles.placeholderContainer}
                    pointerEvents={this.props.overlayTouchable ? 'auto' : 'none'}
                >
                    <RN.Text style={placeholderStyles} numberOfLines={1}>
                        {this.props.placeholder}
                    </RN.Text>
                </RN.View>
            );
        }
    };
}

const styles = RN.StyleSheet.create({
    input: {
        height: SearchInput.HEIGHT,
        borderRadius: 6,
        backgroundColor: styling.COLOR_BG_LIGHT,
        paddingHorizontal: 48,
        zIndex: 1,
    },
    inputPrimaryColor: {
        backgroundColor: styling.COLOR_BG_LIGHT_PRIMARY,
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
