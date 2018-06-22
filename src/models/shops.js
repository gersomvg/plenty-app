import produce from 'immer';

import { shops as shopsApi } from 'api';

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
                const shopsData = await shopsApi.get();
                this.loaded(shopsData.items);
            } catch (e) {
                this.loadedError();
            }
        },
    },
};

export { shops };
