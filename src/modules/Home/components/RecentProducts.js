import React from 'react';
import RN from 'react-native';
import PT from 'prop-types';

import { styling } from 'config';
import { withFetch } from 'hocs';
import { logger } from 'utils';

@withFetch
class RecentProducts extends React.PureComponent {
    static propTypes = {
        onPressTitle: PT.func.isRequired,
        onPressProduct: PT.func.isRequired,
    };

    state = {
        products: [],
        isLoading: false,
        appState: RN.AppState.currentState,
    };

    componentDidMount() {
        RN.AppState.addEventListener('change', this.handleAppStateChange);
        this.loadProducts();
    }

    componentWillUnmount() {
        RN.AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.loadProducts();
        }
        this.setState({ appState: nextAppState });
    };

    loadProducts = async () => {
        this.setState({ isLoading: true });
        try {
            this.fetch = this.props.fetch('products.get')({ limit: 3, classifications: 'YES' });
            const data = await this.fetch.promise;
            this.setState({ isLoading: false, products: data.items });
        } catch (e) {
            if (!e.isCanceled) {
                logger.error(e);
            }
        }
    };

    render() {
        return (
            <RN.View style={this.props.style}>
                <RN.TouchableOpacity style={styles.titleWrapper} onPress={this.props.onPressTitle}>
                    <RN.Text style={styles.titleText}>NIEUW IN DE APP</RN.Text>
                    <RN.Image
                        source={require('assets/ui/row-navigate.png')}
                        style={styles.titleIcon}
                    />
                </RN.TouchableOpacity>
                <RN.View style={styles.products}>
                    {this.state.isLoading
                        ? [null, null, null].map(this.renderProduct)
                        : this.state.products.map(this.renderProduct)}
                </RN.View>
            </RN.View>
        );
    }

    renderProduct = (product, index) => {
        return (
            <RN.TouchableOpacity
                activeOpacity={0.5}
                disabled={product === null}
                onPress={() => this.props.onPressProduct(product)}
                style={styles.productWrapper1}
                key={index}
            >
                <RN.View style={styles.productWrapper2}>
                    <RN.View style={styles.productWrapper3}>
                        {product === null ? (
                            <RN.ActivityIndicator />
                        ) : (
                            <RN.Image
                                source={{ uri: product.imageUrl }}
                                style={styles.productImage}
                            />
                        )}
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        );
    };
}

const styles = RN.StyleSheet.create({
    titleWrapper: {
        paddingVertical: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'System',
        fontSize: 17,
        lineHeight: 17 * 1.3,
        paddingRight: 16,
        color: styling.COLOR_TEXT_DEFAULT,
        fontWeight: 'bold',
    },
    titleIcon: {
        width: 6,
        height: 16,
        resizeMode: 'contain',
    },
    products: {
        flexDirection: 'row',
        marginHorizontal: -8,
        marginTop: 16,
    },
    productWrapper1: {
        flex: 1,
        marginHorizontal: 8,
    },
    productWrapper2: {
        paddingBottom: '100%',
        borderWidth: 1,
        borderColor: styling.COLOR_BORDER_SUBTLE,
        borderRadius: 6,
        overflow: 'hidden',
    },
    productWrapper3: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 6,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
});

export { RecentProducts };
