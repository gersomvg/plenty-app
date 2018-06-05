import shopsApi from 'api/shops';
import produce from 'immer';

const shops = {
    state: {
        items: [],
        fetchStatus: 'initial', // initial, loading, loaded, error
    },
    reducers: {
        loadInitiated: produce(state => {
            if (state.fetchStatus !== 'loaded') {
                state.fetchStatus = 'loading';
            }
        }),
        loaded: produce((state, payload) => {
            state.items = payload;
            state.fetchStatus = 'loaded';
        }),
        loadedError: produce(state => {
            if (state.fetchStatus === 'loading') {
                state.fetchStatus = 'error';
            }
        }),
    },
    effects: {
        async load() {
            try {
                this.loadInitiated();
                const shops = await shopsApi.get();
                this.loaded(shops.items);
            } catch (e) {
                this.loadedError();
            }
        },
    },
};

export { shops };
