import React from 'react';
import RN from 'react-native';

import {RNCamera} from 'react-native-camera';

class Scan extends React.Component {
    handleBarCodeRead = ({data, type}) => {
        if (this.didRead) return;
        this.didRead = true;
        RN.Alert.alert('Barcode gevonden!', `Type: ${type}\nData: ${data}`, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    };

    render() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                permissionDialogTitle={'Scannen van barcodes'}
                permissionDialogMessage={
                    'Om barcodes te kunnen scannen is toegang tot de camera nodig'
                }
                onBarCodeRead={this.handleBarCodeRead}
            />
        );
    }
}

const styles = RN.StyleSheet.create({
    preview: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export {Scan};
