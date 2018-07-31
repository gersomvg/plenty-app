import React from 'react';
import RN from 'react-native';
import { Font, AppLoading } from 'expo';
import { init } from '@rematch/core';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import * as models from './src/models';
import AppNavigation from './src/AppNavigation';
import { ErrorMessageWithButton } from 'common';
import { eventBus } from 'utils';

const persistPlugin = createRematchPersist({
    whitelist: ['shops', 'categories', 'auth', 'onboarding'],
    storage: RN.AsyncStorage,
    version: 1,
});
export const store = init({ plugins: [persistPlugin], models });
const persistor = getPersistor();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <AppEnsureLoading />
                    <RN.StatusBar backgroundColor="white" barStyle="dark-content" />
                </React.Fragment>
            </Provider>
        );
    }
}

@connect(state => ({
    stillLoading:
        ['initial', 'loading'].includes(state.shops.status) ||
        ['initial', 'loading'].includes(state.categories.status),
    hasError: [state.shops.status, state.categories.status].includes('error'),
}))
class AppEnsureLoading extends React.Component {
    state = { fontLoaded: false };

    componentDidMount() {
        this.loadData();
        this.loadFont();
        eventBus.subscribe(eventBus.EVENT.HTTP_401, this.handleUnauthorized);
    }

    componentWillUnmount() {
        eventBus.unsubscribe(eventBus.EVENT.HTTP_401, this.handleUnauthorized);
    }

    loadData = async () => {
        this.props.dispatch.shops.load();
        this.props.dispatch.categories.load();
    };

    loadFont = async () => {
        await Font.loadAsync({
            'ClearSans-Bold': require('./src/assets/fonts/clear-sans/ClearSans-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    };

    handleUnauthorized = () => {
        this.props.dispatch.auth.unauthorize();
        RN.Alert.alert('Het lijkt erop dat je opnieuw moet inloggen.');
    };

    render() {
        return (
            <PersistGate persistor={persistor}>
                {done => {
                    const allLoaded = done && !this.props.stillLoading && this.state.fontLoaded;
                    return allLoaded ? this.renderApp() : <AppLoading />;
                }}
            </PersistGate>
        );
    }

    renderApp = () => {
        if (this.props.hasError) {
            const message =
                'Het lukt de app niet om een aantal zaken in te laden. Heb je verbinding met het internet?';
            const buttonLabel = 'Probeer opnieuw';
            return (
                <ErrorMessageWithButton
                    onPress={this.loadData}
                    message={message}
                    buttonLabel={buttonLabel}
                    hideEmoji
                />
            );
        }
        return <AppNavigation />;
    };
}
