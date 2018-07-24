import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import { getSafeTopHeight, getSafeBottomHeight, enumerate } from 'utils';
import { withFetch } from 'hocs';
import { TextInput, Text, Button, IconButton } from 'common';
import { styling } from 'config';

const STATUS = enumerate('INITIAL', 'INPUT_INVALID', 'SENDING', 'WRONG_CREDENTIALS');

@connect()
@withFetch
class Login extends React.PureComponent {
    state = {
        status: STATUS.INITIAL,
        email: '',
        password: '',
    };

    changeEmail = email => this.setState({ email });

    changePassword = password => this.setState({ password });

    signIn = async () => {
        this.setState({ status: STATUS.SENDING });
        try {
            const { email, password } = this.state;
            const user = await this.props.fetch('auth.signIn')({ email, password }).promise;
            this.props.dispatch.auth.authorize(user);
            this.goBack();
        } catch (e) {
            if (!e.isCanceled) this.setState({ status: STATUS.WRONG_CREDENTIALS });
        }
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <RN.KeyboardAvoidingView
                behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.wrapper}
            >
                <RN.ScrollView style={styles.scroller} keyboardShouldPersistTaps="never">
                    <Text font="brand" size="bigger" style={styles.marginBottomDouble}>
                        INLOGGEN
                    </Text>
                    <TextInput
                        placeholder="E-mailadres"
                        value={this.state.email}
                        onChangeText={this.changeEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.marginBottom}
                    />
                    <TextInput
                        placeholder="Wachtwoord"
                        value={this.state.password}
                        onChangeText={this.changePassword}
                        style={styles.marginBottomDouble}
                        secureTextEntry
                    />
                    {this.state.status === STATUS.WRONG_CREDENTIALS && (
                        <Text style={styles.error}>Verkeerd e-mailadres of wachtwoord</Text>
                    )}
                    <Button
                        onPress={this.signIn}
                        label="Log in"
                        disabled={this.state.status === STATUS.SENDING}
                    />
                </RN.ScrollView>
                <IconButton style={styles.back} icon="close" onPress={this.goBack} />
            </RN.KeyboardAvoidingView>
        );
    }
}

const styles = RN.StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    back: {
        position: 'absolute',
        left: 0,
        top: getSafeTopHeight() + 16,
    },
    scroller: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32 + getSafeTopHeight(),
        paddingBottom: 32 + getSafeBottomHeight(),
        paddingHorizontal: 16,
    },
    marginBottom: {
        marginBottom: 16,
    },
    marginBottomDouble: {
        marginBottom: 48,
    },
    error: {
        marginBottom: 16,
        color: styling.COLOR_TEXT_ERROR,
    },
});

export { Login };
