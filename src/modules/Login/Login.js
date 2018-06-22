import React from 'react';
import RN from 'react-native';

import { getSafeTopHeight, getSafeBottomHeight, enumerate } from 'utils';
import { withFetch } from 'hocs';
import { TextInput, Text, Button } from 'common';

const STATUS = enumerate('INITIAL', 'INPUT_INVALID', 'SENDING', 'WRONG_CREDENTIALS');

@withFetch
class Login extends React.Component {
    state = {
        status: STATUS.INITIAL,
        email: '',
        password: '',
    };

    async componentDidMount() {
        this.props.fetch.auth.signIn({ email: 'gersomvg@gmail.com', password: 'cashewsftw' });
    }

    handleOnChangeEmail = email => this.setState({ email });

    handleOnChangePassword = password => this.setState({ password });

    render() {
        return (
            <RN.KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                <RN.ScrollView style={styles.scroller} keyboardShouldPersistTaps="never">
                    <Text font="brand" size="bigger" style={styles.marginBottomDouble}>
                        INLOGGEN
                    </Text>
                    <TextInput
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={this.handleOnChangeEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.marginBottom}
                    />
                    <TextInput
                        placeholder="Wachtwoord"
                        value={this.state.password}
                        onChangeText={this.handleOnChangePassword}
                        style={styles.marginBottomDouble}
                        secureTextEntry
                    />
                    <Button onPress={() => this.props.navigation.pop()} label="Log in" />
                </RN.ScrollView>
            </RN.KeyboardAvoidingView>
        );
    }
}

const styles = RN.StyleSheet.create({
    wrapper: {
        flex: 1,
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
});

export { Login };
