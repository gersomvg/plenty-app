import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import * as GestureHandler from 'react-native-gesture-handler';

import { Text, SearchInput, Button } from 'common';
import { styling } from 'config';

class AdminTools extends React.PureComponent {
    static propTypes = {
        isSuperAdmin: PT.bool.isRequired,
        onPressCreate: PT.func.isRequired,
        onPressInbox: PT.func.isRequired,
        onPressSuper: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View style={[styles.wrapper, this.props.style]}>
                <Button
                    tint="light"
                    onPress={this.props.onPressCreate}
                    label="Nieuw"
                    style={styles.button}
                />
                <Button
                    tint="light"
                    onPress={this.props.onPressInbox}
                    label="Inbox"
                    style={[styles.button, styles.marginLeft]}
                />
                {this.props.isSuperAdmin && (
                    <Button
                        tint="light"
                        onPress={this.props.onPressSuper}
                        label="💂‍"
                        style={[styles.buttonSmall, styles.marginLeft]}
                    />
                )}
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    buttonSmall: {
        flex: 0.38,
    },
    marginLeft: {
        marginLeft: 10,
    },
});

export { AdminTools };
