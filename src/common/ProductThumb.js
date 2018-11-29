import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { Text } from 'common';

const imageSize = 128;
class ProductThumb extends React.PureComponent {
    static propTypes = {
        source: PT.oneOfType([PT.object, PT.number]),
    };
    static imageSize = imageSize;

    render() {
        return (
            <RN.View style={styles.imageClipper}>
                <RN.Image style={styles.image} source={this.props.source} />
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    imageClipper: {
        borderRadius: 6,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    image: {
        width: imageSize,
        height: imageSize,
    },
});

export { ProductThumb };
