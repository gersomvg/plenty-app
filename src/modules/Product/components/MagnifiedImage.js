import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

class MagnifiedImage extends React.PureComponent {
    static propTypes = {
        product: PT.object.isRequired,
        onDismiss: PT.func.isRequired,
    };

    render() {
        return (
            <RN.TouchableWithoutFeedback onPress={this.props.onDismiss}>
                <RN.View style={styles.container}>
                    <RN.Image source={{ uri: this.props.product.imageUrl }} style={styles.image} />
                </RN.View>
            </RN.TouchableWithoutFeedback>
        );
    }
}

const shadowSize = 10;
const styles = RN.StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '90%',
        maxWidth: 300,
        paddingBottom: '90%',
        resizeMode: 'contain',
    },
});

export { MagnifiedImage };
