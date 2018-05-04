import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import {Text, Spacing, SearchInput} from 'common';
import {styling} from 'config';

class SearchAndScan extends React.PureComponent {
    static propTypes = {
        onPressSearch: PT.func.isRequired,
        onPressScan: PT.func.isRequired,
    };

    render() {
        return (
            <RN.View>
                <Text size="huge" font="brand" align="center">
                    PLENTY
                </Text>
                <Text color="lighter" align="center" style={styles.tagline}>
                    Plantaardige weelde
                </Text>
                <SearchInput
                    placeholder="Zoek"
                    overlayTouchable
                    onPress={this.props.onPressSearch}
                    primaryColor
                    style={styles.search}
                />
                {this.renderScanButton()}
            </RN.View>
        );
    }

    renderScanButton = () => {
        return (
            <RN.TouchableOpacity
                activeOpacity={0.5}
                style={styles.scanWrapper}
                onPress={this.props.onPressScan}
            >
                <Text>Scan</Text>
                <RN.Image style={styles.scanIcon} source={require('assets/ui/barcode-icon.png')} />
            </RN.TouchableOpacity>
        );
    };
}

const styles = RN.StyleSheet.create({
    tagline: {
        marginTop: 8,
        marginBottom: 32,
    },
    search: {
        marginBottom: 32,
    },
    scanWrapper: {
        height: 48,
        borderRadius: 6,
        backgroundColor: styling.COLOR_BG_LIGHT_SECONDARY,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    scanIcon: {
        position: 'absolute',
        top: 16,
        left: 13,
        width: 22,
        height: 16,
    },
});

export {SearchAndScan};
