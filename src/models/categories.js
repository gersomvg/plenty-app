import produce from 'immer';

import { categories as categoriesApi } from 'api';

const categories = {
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
                const categoriesData = await categoriesApi.get();
                this.loaded(categoriesData.items);
            } catch (e) {
                this.loadedError();
            }
        },
    },
};

export { categories };
