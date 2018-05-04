import React from 'react';
import RN from 'react-native';
import {RNCamera} from 'react-native-camera';

import {BackButton, ElevatedHeader, Text} from 'common';
import {getSafeTopHeight} from 'utils';

class Scan extends React.PureComponent {
    state = {didRead: false};

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.didRead && !nextProps.isFocused) {
            return {didRead: false};
        }
        return null;
    }

    handleBarCodeRead = ({data}) => {
        if (this.state.didRead) return;
        this.setState({didRead: true});
        const goToProduct = this.props.navigation.push('Product', {barcode: data});
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <RN.View style={styles.wrapper}>
                {this.props.isFocused && (
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
                )}
                <ElevatedHeader>
                    <RN.View style={styles.bar}>
                        <BackButton onPress={this.handleOnPressBack} />
                        <Text style={styles.title} size="bigger" weight="heavier">
                            Scan een barcode
                        </Text>
                    </RN.View>
                </ElevatedHeader>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
    },
    bar: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 48,
    },
    title: {
        flex: 1,
    },
});

export {Scan};
