import React from 'react';
import RN from 'react-native';
import { Camera, Haptic } from 'expo';

import { IconButton, ElevatedHeader, Text } from 'common';
import { getSafeTopHeight } from 'utils';
import { styling } from 'config';

class Scan extends React.PureComponent {
    state = {
        didRead: false,
        lineAnimation: new RN.Animated.Value(1),
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.didRead && !nextProps.isFocused) {
            return { didRead: false };
        }
        return null;
    }

    componentDidMount() {
        this.startAnimation();
    }

    componentDidUpdate(prevProps) {
        const becomesFocused = !prevProps.isFocused && this.props.isFocused;
        const becomesBlurred = prevProps.isFocused && !this.props.isFocused;
        if (becomesFocused) {
            this.startAnimation();
        } else if (becomesBlurred) {
            this.stopAnimation();
        }
    }

    startAnimation = () => {
        this.animationLoop = RN.Animated.loop(
            RN.Animated.sequence([
                RN.Animated.timing(this.state.lineAnimation, {
                    toValue: 0.97,
                    duration: 500,
                    isInteraction: false,
                    useNativeDriver: true,
                }),
                RN.Animated.timing(this.state.lineAnimation, {
                    toValue: 1,
                    duration: 500,
                    isInteraction: false,
                    useNativeDriver: true,
                }),
            ]),
        );
        this.animationLoop.start();
    };

    stopAnimation = () => {
        if (this.animationLoop) this.animationLoop.stop();
    };

    handleBarCodeRead = ({ data }) => {
        if (this.state.didRead) return;
        this.setState({ didRead: true });
        const goToProduct = this.props.navigation.push('Product', { barcode: data });
        Haptic.notification(Haptic.NotificationTypes.Success);
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <RN.View style={styles.wrapper}>
                {this.props.isFocused && (
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={Camera.Constants.Type.back}
                        permissionDialogTitle={'Scannen van barcodes'}
                        permissionDialogMessage={
                            'Om barcodes te kunnen scannen is toegang tot de camera nodig'
                        }
                        onBarCodeRead={this.handleBarCodeRead}
                    />
                )}
                {this.renderHeader()}
                {this.renderAnimatedLine()}
            </RN.View>
        );
    }

    renderHeader = () => (
        <ElevatedHeader>
            <RN.View style={styles.bar}>
                <IconButton onPress={this.handleOnPressBack} icon="back" />
                <Text style={styles.title} size="bigger" weight="heavier">
                    Scan een barcode
                </Text>
            </RN.View>
        </ElevatedHeader>
    );

    renderAnimatedLine = () => {
        const scaleStyle = {
            transform: [{ scale: this.state.lineAnimation }],
        };
        return <RN.Animated.View style={[styles.line, scaleStyle]} />;
    };
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
    line: {
        position: 'absolute',
        marginTop: (80 + getSafeTopHeight()) / 2 - 100, // Compensate for header bar
        width: '88%',
        height: 200,
        left: '6%',
        top: '50%',
        borderWidth: 2,
        borderColor: styling.COLOR_BRAND_PRIMARY,
        borderRadius: 12,
    },
});

export { Scan };
