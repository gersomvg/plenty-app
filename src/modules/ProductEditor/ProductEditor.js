import React from 'react';
import RN from 'react-native';
import Expo from 'expo';

import { getSafeTopHeight, getSafeBottomHeight } from 'utils';
import { TextInput, Text, Button, IconButton } from 'common';
import { ImagePicker, BrandInput } from './components';
import { styling } from 'config';
import { withFetch } from 'hocs';

@withFetch
class ProductEditor extends React.PureComponent {
    state = {
        id: null,
        name: 'Jasmine Thee IJs',
        imageUrl: '',
        brand: null,

        isSaving: false,
    };

    changeImageUrl = imageUrl => this.setState({ imageUrl });
    changeName = name => this.setState({ name });
    changeBrand = brand => this.setState({ brand });

    save = async () => {
        try {
            this.setState({ isSaving: true });
            const data = await this.props.fetch.products.create({
                name: this.state.name,
                brand: this.state.brand,
                imageUrl: this.state.imageUrl,
            }).promise;
            console.log(data);
        } catch (e) {
            console.log(e);
            this.setState({ isSaving: false });
        }
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <RN.KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                <RN.ScrollView style={styles.scroller} keyboardShouldPersistTaps="never">
                    <ImagePicker value={this.state.imageUrl} onChange={this.changeImageUrl} />
                    <TextInput
                        placeholder="Naam"
                        value={this.state.name}
                        onChangeText={this.changeName}
                        style={styles.marginBottom}
                    />
                    <BrandInput
                        value={this.state.brand}
                        onChange={this.changeBrand}
                        style={styles.marginBottom}
                    />
                </RN.ScrollView>
                <IconButton style={styles.back} icon="back" onPress={this.goBack} />
                <Expo.LinearGradient
                    colors={['rgba(255,255,255,0)', 'white']}
                    style={styles.gradient}
                />
                <RN.View style={styles.applyWrapper}>
                    <Button
                        onPress={this.save}
                        label={this.state.id ? 'Sla op' : 'Voeg toe'}
                        disabled={this.state.fetchStatus === 'fetching'}
                    />
                </RN.View>
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
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 128,
        width: '100%',
    },
    applyWrapper: {
        position: 'absolute',
        bottom: getSafeBottomHeight() + 16,
        left: 0,
        width: '100%',
        alignItems: 'center',
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

export { ProductEditor };
