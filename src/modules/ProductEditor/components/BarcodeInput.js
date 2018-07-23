import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { withNavigation } from 'react-navigation';

import { TextInput, Text, IconButton, Button } from 'common';
import { withFetch } from 'hocs';

@withNavigation
@withFetch
class BarcodeInput extends React.PureComponent {
    static propTypes = {
        value: PT.arrayOf(PT.string).isRequired,
        onChange: PT.func.isRequired,
        currentProductId: PT.number,
    };

    state = { newCode: '', isChecking: false };

    removeBarcode = barcode => {
        this.props.onChange(this.props.value.filter($barcode => $barcode !== barcode));
    };

    scanNewBarcode = () => {
        this.props.navigation.push('Scan', {
            callback: async barcode => {
                await this.setState({ newCode: barcode });
                this.checkAndAddNewBarcode();
            },
        });
    };

    checkAndAddNewBarcode = async () => {
        const newCode = this.state.newCode.trim();
        if (!newCode) return;

        this.setState({ isChecking: true });

        let product;
        try {
            product = await this.props.fetch('products.getOneByBarcode')({
                barcode: newCode,
            }).promise;
        } catch (e) {
            if (!e.isCanceled && e.status !== 404) {
                RN.Alert.alert(
                    'Er is iets misgegaan bij het controleren of deze barcode al bestaat.',
                );
            }
        }

        if (!product || product.id === this.props.currentProductId) {
            this.props.onChange([...this.props.value.filter($bc => $bc !== newCode), newCode]);
            this.setState({ newCode: '', isChecking: false });
        } else {
            RN.Alert.alert(
                `Deze barcode is al gekoppeld aan het product '${product.name}' van '${
                    product.brand.name
                }'`,
            );
            this.setState({ newCode: '', isChecking: false });
        }
    };

    changeNewCode = newCode => this.setState({ newCode });

    render() {
        return (
            <RN.View style={this.props.style}>
                {this.props.value.map(barcode => (
                    <RN.View style={styles.row} key={barcode}>
                        <Text size="smaller" style={styles.left} align="left">
                            {barcode}
                        </Text>
                        <IconButton icon="close" onPress={() => this.removeBarcode(barcode)} />
                    </RN.View>
                ))}
                <RN.View style={styles.row}>
                    <TextInput
                        placeholder="Barcode"
                        style={styles.left}
                        value={this.state.newCode}
                        onChangeText={this.changeNewCode}
                        keyboardType="number-pad"
                    />
                    {this.state.newCode.trim() ? (
                        <Button
                            label="Add"
                            onPress={this.checkAndAddNewBarcode}
                            disabled={this.state.isChecking}
                        />
                    ) : (
                        <Button
                            label="Scan"
                            onPress={this.scanNewBarcode}
                            disabled={this.state.isChecking}
                        />
                    )}
                </RN.View>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginBottom: 8,
    },
    left: {
        flex: 1,
        marginRight: 8,
    },
});

export { BarcodeInput };
