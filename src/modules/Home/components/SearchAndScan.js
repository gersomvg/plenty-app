import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { GestureHandler, LinearGradient } from 'expo';

import { Text, SearchInput, Button } from 'common';
import { styling } from 'config';

class SearchAndScan extends React.PureComponent {
    static propTypes = {
        onPressSearch: PT.func.isRequired,
        onPressScan: PT.func.isRequired,
        onLongPressTitle: PT.func.isRequired,
    };

    handleOnHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === GestureHandler.State.ACTIVE) {
            this.props.onLongPressTitle();
        }
    };

    render() {
        return (
            <RN.View style={this.props.style}>
                <GestureHandler.LongPressGestureHandler
                    onHandlerStateChange={this.handleOnHandlerStateChange}
                    minDurationMs={1000}
                >
                    <RN.View>
                        <Text size="huge" font="brand" align="center" style={styles.brand}>
                            PLENTY
                        </Text>
                    </RN.View>
                </GestureHandler.LongPressGestureHandler>
                <RN.View style={styles.buttons}>
                    {this.renderSearchButton()}
                    {this.renderScanButton()}
                </RN.View>
            </RN.View>
        );
    }

    renderSearchButton = () => {
        return (
            <RN.TouchableOpacity
                activeOpacity={0.5}
                onPress={this.props.onPressSearch}
                style={[styles.button, styles.buttonSearch]}
            >
                <LinearGradient
                    style={styles.buttonGradient}
                    colors={['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.05)']}
                />
                <RN.Image source={require('assets/ui/cta-search.png')} style={styles.buttonIcon} />
                <RN.Text style={styles.buttonText}>ZOEK</RN.Text>
            </RN.TouchableOpacity>
        );
    };

    renderScanButton = () => {
        return (
            <RN.TouchableOpacity
                activeOpacity={0.5}
                onPress={this.props.onPressScan}
                style={[styles.button, styles.buttonScan]}
            >
                <LinearGradient
                    style={styles.buttonGradient}
                    colors={['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.05)']}
                />
                <RN.Image source={require('assets/ui/cta-barcode.png')} style={styles.buttonIcon} />
                <RN.Text style={styles.buttonText}>SCAN</RN.Text>
            </RN.TouchableOpacity>
        );
    };
}

const styles = RN.StyleSheet.create({
    brand: {
        letterSpacing: 0.65,
        marginBottom: 32,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'row',
        borderRadius: 6,
        height: 54,
        alignItems: 'center',
        paddingHorizontal: 16,
        flex: 1,
    },
    buttonSearch: {
        backgroundColor: styling.COLOR_PRIMARY,
        marginRight: 8,
    },
    buttonScan: {
        backgroundColor: styling.COLOR_SECONDARY,
        marginLeft: 8,
    },
    buttonGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 6,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'System',
        color: 'white',
        fontWeight: 'bold',
        textShadowOffset: { height: 1 },
        textShadowRadius: 2,
        textShadowColor: 'rgba(0,0,0,0.2)',
    },
});

export { SearchAndScan };
