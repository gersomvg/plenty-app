import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';
import { GestureHandler } from 'expo';

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
                <Text color="lighter" align="center" style={styles.tagline}>
                    Vegan Boodschappenhulp
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
            <Button
                tint="secondaryLight"
                onPress={this.props.onPressScan}
                label="Scan"
                iconSource={require('assets/ui/barcode-icon.png')}
            />
        );
    };
}

const styles = RN.StyleSheet.create({
    brand: {
        letterSpacing: 0.65,
    },
    tagline: {
        marginTop: 8,
        marginBottom: 32,
    },
    search: {
        marginBottom: 32,
    },
});

export { SearchAndScan };
