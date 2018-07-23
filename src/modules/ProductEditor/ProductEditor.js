import React from 'react';
import RN from 'react-native';
import Expo from 'expo';

import { getSafeTopHeight, getSafeBottomHeight, logger } from 'utils';
import { TextInput, Text, Button, IconButton, RadioBox } from 'common';
import {
    ImagePicker,
    BrandInput,
    ShopInput,
    CategoryInput,
    BarcodeInput,
    ExplanationInput,
} from './components';
import { styling } from 'config';
import { withFetch } from 'hocs';

@withFetch
class ProductEditor extends React.PureComponent {
    state = {
        id: null,
        name: '',
        barcodes: [],
        imageUrl: '',
        brand: null,
        classification: null,
        explanation: '',
        shops: [],
        categories: [],

        isSaving: false,
    };

    static getDerivedStateFromProps(props, state) {
        const product = props.navigation.getParam('product');
        if (!state.id && product) return product;
        return null;
    }

    save = async () => {
        if (!this.isDataComplete()) {
            RN.Alert.alert('De product afbeelding, naam, merk en classificatie zijn verplicht.');
            return;
        }

        this.setState({ isSaving: true });

        try {
            if (!this.state.brand.id) {
                const brand = await this.props.fetch('brands.create')(this.state.brand.name)
                    .promise;
                await this.setState({ brand });
            }
            const isExisting = !!this.state.id;
            const action = isExisting ? 'update' : 'create';
            const product = await this.props.fetch(`products.${action}`)(this.state).promise;

            const prevProductRouteKey = this.props.navigation.getParam('prevProductRouteKey');
            if (prevProductRouteKey) {
                this.props.navigation.navigate({
                    routeName: 'Product',
                    key: prevProductRouteKey,
                    params: { product },
                });
            } else {
                this.props.navigation.replace('Product', { product });
            }
        } catch (e) {
            logger.log(e);
            RN.Alert.alert('Er is iets misgegaan bij het opslaan.');
            this.setState({ isSaving: false });
        }
    };

    isDataComplete = () => {
        return !!(
            this.state.name.trim() &&
            this.state.imageUrl &&
            this.state.brand &&
            this.state.classification
        );
    };

    changeImageUrl = imageUrl => this.setState({ imageUrl });
    changeName = name => this.setState({ name });
    changeBrand = brand => this.setState({ brand });
    changeBarcodes = barcodes => this.setState({ barcodes });
    changeExplanation = explanation => this.setState({ explanation });
    changeShops = shops => this.setState({ shops });
    changeCategories = categories => this.setState({ categories });
    render() {
        return (
            <RN.KeyboardAvoidingView
                behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.wrapper}
            >
                <RN.ScrollView
                    style={styles.scroller}
                    contentContainerStyle={styles.scrollerInner}
                    keyboardShouldPersistTaps="never"
                >
                    <ImagePicker
                        value={this.state.imageUrl}
                        onChange={this.changeImageUrl}
                        style={styles.marginBottom}
                    />
                    <TextInput
                        placeholder="Naam"
                        value={this.state.name}
                        onChangeText={this.changeName}
                        style={styles.marginBottom}
                        maxLength={255}
                    />
                    <BrandInput
                        value={this.state.brand}
                        onChange={this.changeBrand}
                        style={styles.marginBottom}
                    />
                    <BarcodeInput
                        currentProductId={this.state.id}
                        value={this.state.barcodes}
                        onChange={this.changeBarcodes}
                        style={styles.marginBottom}
                    />
                    {this.renderClassification()}
                    <ExplanationInput
                        value={this.state.explanation}
                        onChange={this.changeExplanation}
                        classification={this.state.classification}
                        style={styles.marginBottomDouble}
                    />
                    <ShopInput
                        value={this.state.shops}
                        onChange={this.changeShops}
                        style={styles.marginBottom}
                    />
                    <CategoryInput value={this.state.categories} onChange={this.changeCategories} />
                </RN.ScrollView>
                <IconButton style={styles.back} icon="back" onPress={this.props.navigation.pop} />
                <Expo.LinearGradient
                    colors={['rgba(255,255,255,0)', 'white']}
                    style={styles.gradient}
                    pointerEvents="none"
                />
                <RN.View style={styles.applyWrapper} pointerEvents="box-none">
                    <Button
                        onPress={this.save}
                        label={this.state.id ? 'Sla op' : 'Voeg toe'}
                        disabled={this.state.isSaving}
                    />
                </RN.View>
            </RN.KeyboardAvoidingView>
        );
    }

    changeClassification = classification => this.setState({ classification });
    renderClassification = () => (
        <RN.View style={[styles.classification, styles.marginBottom]}>
            <Text style={styles.classLabel} weight="heavier">
                Vegan?
            </Text>
            <RN.TouchableOpacity
                activeOpacity={0.5}
                style={styles.classItem}
                onPress={() => this.setState({ classification: 'YES' })}
            >
                <RadioBox checked={this.state.classification === 'YES'} />
                <Text style={styles.classText} size="smaller">
                    Ja
                </Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity
                activeOpacity={0.5}
                style={styles.classItem}
                onPress={() => this.setState({ classification: 'MAYBE' })}
            >
                <RadioBox checked={this.state.classification === 'MAYBE'} />
                <Text style={styles.classText} size="smaller">
                    Misschien
                </Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity
                activeOpacity={0.5}
                style={styles.classItem}
                onPress={() => this.setState({ classification: 'NO' })}
            >
                <RadioBox checked={this.state.classification === 'NO'} />
                <Text style={styles.classText} size="smaller">
                    Nee
                </Text>
            </RN.TouchableOpacity>
        </RN.View>
    );
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
    },
    scrollerInner: {
        paddingTop: 32 + getSafeTopHeight(),
        paddingBottom: 96 + getSafeBottomHeight(),
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
    classification: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    classLabel: {
        marginRight: 10,
    },
    classItem: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    classText: {
        marginLeft: 5,
        marginRight: 10,
    },
});

export { ProductEditor };
