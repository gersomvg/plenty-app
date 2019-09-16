import React from 'react';
import RN from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

import { getSafeTopHeight, getSafeBottomHeight } from 'utils';
import { Button, Text, Emoji } from 'common';

const screens = [
    {
        title: 'Welkom',
        renderContent: () => (
            <Text size="bigger">
                Plenty helpt jou en de mensen om je heen om nog makkelijker veganistische
                boodschappen te doen.
            </Text>
        ),
        buttonLabel: 'Ik doe mee!',
    },
    {
        title: 'Indeling',
        renderContent: () => (
            <React.Fragment>
                <Text size="bigger" color="lighter">
                    Zo worden producten ingedeeld. Als je een foutje ziet, kan je dit doorgeven in
                    het feedbackveld.
                </Text>
                <RN.View style={styles.rows}>
                    <RN.View style={styles.row}>
                        <Emoji type="YES" style={styles.emoji} />
                        <Text size="bigger">100% Veganistisch</Text>
                    </RN.View>
                    <RN.View style={styles.row}>
                        <Emoji type="MAYBE" style={styles.emoji} />
                        <Text size="bigger">Misschien veganistisch</Text>
                    </RN.View>
                    <RN.View style={styles.row}>
                        <Emoji type="NO" style={styles.emoji} />
                        <Text size="bigger">Niet veganistisch</Text>
                    </RN.View>
                </RN.View>
            </React.Fragment>
        ),
        buttonLabel: 'Okido!',
    },
    {
        title: 'VERKOOPPUNTEN',
        renderContent: ({ shops }) => (
            <React.Fragment>
                <Text size="bigger">Op dit moment lopen we rond in de volgende supermarkten.</Text>
                <RN.View style={styles.shops}>
                    {shops.map((shop, index) => (
                        <RN.View style={styles.shopContainer} key={index}>
                            <RN.Image style={styles.shopImage} source={{ uri: shop.imageUrl }} />
                        </RN.View>
                    ))}
                </RN.View>
                <Text size="bigger" color="lighter">
                    Hiervan zijn de Albert Heijn en Jumbo het meest volledig. De rest volgt snel.
                </Text>
            </React.Fragment>
        ),
        buttonLabel: 'Top, geen haast!',
    },
    {
        title: 'VRIJWILLIGERS',
        renderContent: ({ shops }) => (
            <Text size="bigger">
                Achter deze app zit een team van enthousiaste vrijwilligers die zelf ook veganist
                zijn.{'\n\n'}Als je hier graag in wilt deelnemen, kun je ons benaderen op Facebook
                (@PlentyApp).
            </Text>
        ),
        buttonLabel: 'Ik weet jullie te vinden!',
    },
];

@connect(state => ({
    shops: state.shops.items,
}))
class Onboarding extends React.Component {
    state = { currentIndex: 0 };

    next = () => {
        if (this.state.currentIndex + 1 === screens.length) {
            this.props.dispatch.onboarding.finish();
            this.props.navigation.goBack();
        } else {
            this.setState(state => ({ currentIndex: state.currentIndex + 1 }));
        }
    };

    render() {
        return (
            <RN.View style={styles.container}>
                <RN.ScrollView
                    alwaysBounceVertical={false}
                    style={styles.scroller}
                    contentContainerStyle={styles.scrollerContent}
                >
                    <Text font="brand" size="huge" weight="heavier">
                        {screens[this.state.currentIndex].title.toUpperCase()}
                    </Text>
                    <RN.View style={styles.contentBox}>
                        {screens[this.state.currentIndex].renderContent({
                            shops: this.props.shops,
                        })}
                    </RN.View>
                </RN.ScrollView>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'white']}
                    style={styles.gradient}
                    pointerEvents="none"
                />
                <RN.View style={styles.buttonWrapper} pointerEvents="box-none">
                    <Button
                        onPress={this.next}
                        label={screens[this.state.currentIndex].buttonLabel}
                    />
                </RN.View>
            </RN.View>
        );
    }
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scroller: {
        flex: 1,
    },
    scrollerContent: {
        minHeight: '100%',
        paddingTop: 32 + getSafeTopHeight(),
        paddingBottom: 112 + getSafeBottomHeight(),
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 128,
        width: '100%',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: getSafeBottomHeight() + 32,
        left: 0,
        width: '100%',
        alignItems: 'center',
    },
    contentBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    rows: {
        alignItems: 'flex-start',
        marginTop: 32,
    },
    row: {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        marginRight: 16,
    },
    shops: {
        paddingHorizontal: 8,
        marginTop: 32,
        marginBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    shopContainer: {
        marginHorizontal: 8,
        marginBottom: 16,
        height: 60,
        width: 80,
        borderRadius: 6,
        overflow: 'hidden',
    },
    shopImage: {
        height: 60,
        width: 80,
        resizeMode: 'contain',
    },
});

export { Onboarding };
