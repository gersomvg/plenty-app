import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';
import { withFetch } from 'hocs';
import { Text } from './Text';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { Emoji } from './Emoji';

@withFetch
class FeedbackForm extends React.PureComponent {
    state = { message: '', fetchStatus: 'initial' };

    changeMessage = message => {
        this.setState({ message });
    };

    sendMessage = async () => {
        this.setState({ fetchStatus: 'sending' });
        try {
            await this.props.fetch('feedback.create')({
                message: this.state.message,
                productId: this.props.productId,
                barcode: this.props.barcode,
            }).promise;
            this.setState({ fetchStatus: 'sent' });
        } catch (e) {
            RN.Alert.alert('Er is iets misgegaan. Probeer opnieuw.');
            this.setState({ fetchStatus: 'initial' });
        }
    };

    render() {
        return (
            <RN.View style={this.props.style}>
                <Text style={styles.title} weight="heavier" size="smaller" font="brand">
                    {this.props.title.toUpperCase()}
                </Text>
                <Text style={styles.subtitle} color="lighter">
                    {this.props.subtitle}
                </Text>
                {this.state.fetchStatus !== 'sent' ? (
                    <React.Fragment>
                        <TextInput
                            multiline
                            value={this.state.message}
                            onChangeText={this.changeMessage}
                            style={styles.input}
                            inputStyle={this.props.inputStyle}
                            placeholder={this.props.placeholder}
                        />
                        <Button
                            label={this.props.buttonLabel}
                            onPress={this.sendMessage}
                            disabled={
                                this.state.fetchStatus === 'sending' || !this.state.message.trim()
                            }
                        />
                    </React.Fragment>
                ) : (
                    <Text weight="heavier" color="confirmation">
                        Dankjewel, je bent fantastisch!
                    </Text>
                )}
            </RN.View>
        );
    }
}

FeedbackForm.propTypes = {
    title: PT.string.isRequired,
    subtitle: PT.string.isRequired,
    placeholder: PT.string.isRequired,
    buttonLabel: PT.string.isRequired,
    productId: PT.number,
    barcode: PT.oneOfType([PT.string, PT.number]),
    productVariant: PT.bool,
};

const styles = RN.StyleSheet.create({
    title: {
        marginBottom: 16,
    },
    subtitle: {
        marginBottom: 32,
    },
    input: {
        marginBottom: 32,
    },
});

export { FeedbackForm };
