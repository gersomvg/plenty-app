import React from 'react';
import { Font, AppLoading } from 'expo';
import { init } from '@rematch/core';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import * as models from './src/models';
import AppNavigation from './src/AppNavigation';
import { ErrorMessageWithButton } from 'common';

const persistPlugin = createRematchPersist({ whitelist: ['shops', 'categories'] });
const store = init({ plugins: [persistPlugin], models });
const persistor = getPersistor();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppEnsureLoading />
            </Provider>
        );
    }
}

@connect(state => ({
    stillLoading:
        ['initial', 'loading'].includes(state.shops.fetchStatus) ||
        ['initial', 'loading'].includes(state.categories.fetchStatus),
    hasError: [state.shops.fetchStatus, state.categories.fetchStatus].includes('error'),
}))
class AppEnsureLoading extends React.Component {
    state = { fontLoaded: false };

    componentDidMount() {
        this.loadData();
        this.loadFont();
    }

    loadData = () => {
        this.props.dispatch.shops.load();
        this.props.dispatch.categories.load();
    };

    loadFont = async () => {
        await Font.loadAsync({
            'ClearSans-Bold': require('./src/assets/fonts/clear-sans/ClearSans-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
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
