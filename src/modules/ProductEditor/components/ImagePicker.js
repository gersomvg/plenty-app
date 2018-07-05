import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import Expo from 'expo';

import { ProductThumb, Text } from 'common';
import { styling } from 'config';

class ImagePicker extends React.PureComponent {
    static propTypes = {
        value: PT.string.isRequired,
        onChange: PT.func.isRequired,
    };

    state = { showChoice: false };

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }

    showChoice = () => {
        this.setState({ showChoice: true });
        this.timeout = setTimeout(this.hideChoice, 4000);
    };

    hideChoice = () => {
        this.setState({ showChoice: false });
        if (this.timeout) clearTimeout(this.timeout);
    };

    pickImage = async () => {
        this.hideChoice();
        const perm = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
        if (perm.status === 'granted') {
            const response = await Expo.ImagePicker.launchImageLibraryAsync({
                mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
                base64: false,
                exif: false,
            });
            if (!response.cancelled) {
                this.props.onChange(response.uri);
            }
        } else {
            RN.Alert.alert(
                'Geen toegang',
                "Om een foto te kunnen selecteren is toegang tot de foto's nodig. Deze toegang kan je via de instellingen van je telefoon verlenen aan Plenty.",
            );
        }
    };

    shootImage = async () => {
        this.hideChoice();
        const [per1, per2] = await Promise.all([
            Expo.Permissions.askAsync(Expo.Permissions.CAMERA),
            Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL),
        ]);
        if (per1.status === 'granted' && per2.status === 'granted') {
            const response = await Expo.ImagePicker.launchCameraAsync({
                base64: false,
                exif: false,
            });
            if (!response.cancelled) {
                this.props.onChange(response.uri);
            }
        } else {
            RN.Alert.alert(
                'Geen toegang',
                "Om een foto te kunnen maken is toegang tot de camera en foto's nodig. Deze toegang kan je via de instellingen van je telefoon verlenen aan Plenty.",
            );
        }
    };

    render() {
        if (this.state.showChoice) {
            return (
                <RN.View style={styles.choices}>
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.choice}
                        onPress={this.shootImage}
                    >
                        <Text size="smaller">Camera</Text>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity
                        activeOpacity={0.5}
                        style={[styles.choice, styles.topLine]}
                        onPress={this.pickImage}
                    >
                        <Text size="smaller">Gallerij</Text>
                    </RN.TouchableOpacity>
                </RN.View>
            );
        }
        return (
            <RN.TouchableOpacity activeOpacity={0.5} onPress={this.showChoice}>
                <ProductThumb source={this.props.value ? { uri: this.props.value } : undefined} />
            </RN.TouchableOpacity>
        );
    }
}

const styles = RN.StyleSheet.create({
    choices: {
        margin: ProductThumb.shadowSize,
        width: ProductThumb.imageSize,
        height: ProductThumb.imageSize,
        borderRadius: 6,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    choice: {
        flex: 1,
        backgroundColor: styling.COLOR_BG_LIGHT,
        justifyContent: 'center',
    },
    topLine: {
        borderTopWidth: 1,
        borderColor: styling.COLOR_BORDER_MEDIUM,
    },
});

export { ImagePicker };
