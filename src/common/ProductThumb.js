import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text } from 'common';

const shadowSize = 10;
const imageSize = 128;
class ProductThumb extends React.PureComponent {
    static propTypes = {
        source: PT.oneOfType([PT.object, PT.number]),
    };

    static shadowSize = shadowSize;
    static imageSize = imageSize;
    static totalSize = imageSize + 2 * shadowSize;

    render() {
        return (
            <RN.View style={styles.imageContainer}>
                {/* <RN.Image
                    style={styles.imageShadow}
                    source={require('assets/ui/product-image-shadow.png')}
                /> */}
                <RN.View style={styles.imageClipper}>
                    <RN.Image style={styles.image} source={this.props.source} />
                </RN.View>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    imageContainer: {
        width: ProductThumb.totalSize,
        height: ProductThumb.totalSize,
        padding: ProductThumb.shadowSize,
        alignSelf: 'center',
    },
    imageShadow: {
        position: 'absolute',
        width: ProductThumb.totalSize,
        height: ProductThumb.totalSize,
    },
    imageClipper: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        width: ProductThumb.imageSize,
        height: ProductThumb.imageSize,
    },
});

export { ProductThumb };
