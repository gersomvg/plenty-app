import React from 'react';
import RN from 'react-native';
import { Camera, Haptic, Permissions, BarCodeScanner } from 'expo';

import { IconButton, ElevatedHeader, Text } from 'common';
import { getSafeTopHeight } from 'utils';
import { styling } from 'config';

class Scan extends React.PureComponent {
    state = {
        didRead: false,
        lineAnimation: new RN.Animated.Value(1),
        torchMode: 'off',
        permissionStatus: 'initial',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.didRead && !nextProps.isFocused) {
            return { didRead: false };
        }
        return null;
    }

    componentDidMount() {
        this.startAnimation();
        this.askPermission();
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

    askPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted')
            RN.Alert.alert('Er is toegang tot de camera nodig om barcodes te kunnen scannen.');
        else this.setState({ permissionStatus: 'granted' });
    };

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
        if (RN.Platform.OS === 'ios') Haptic.notification(Haptic.NotificationTypes.Success);

        // If callback is supplied: send barcode to callback and navigate back
        const callback = this.props.navigation.getParam('callback');
        if (callback) {
            callback(data);
            this.props.navigation.pop();
        }
        // Otherwise go to product detail screen
        else {
            this.props.navigation.push('Product', { barcode: data });
        }
    };

    handleOnPressBack = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <RN.View style={styles.wrapper}>
                {this.props.isFocused && (
                    <BarCodeScanner
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        onBarCodeRead={this.handleBarCodeRead}
                        torchMode={this.state.torchMode}
                        key={this.state.permissionStatus}
                    />
                )}
                {this.renderHeader()}
                {this.renderAnimatedLine()}
            </RN.View>
        );
    }

    toggleTorch = () =>
        this.setState(state => ({ torchMode: state.torchMode === 'off' ? 'on' : 'off' }));
    renderHeader = () => (
        <ElevatedHeader>
            <RN.View style={styles.bar}>
                <IconButton onPress={this.handleOnPressBack} icon="back" />
                <Text style={styles.title} size="bigger" weight="heavier">
                    Scan een barcode
                </Text>
                <IconButton
                    onPress={this.toggleTorch}
                    icon={this.state.torchMode === 'off' ? 'flashOn' : 'flashOff'}
                />
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
        borderColor: styling.COLOR_PRIMARY,
        borderRadius: 12,
    },
});

export { Scan };
