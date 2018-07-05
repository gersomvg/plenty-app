import produce from 'immer';

import { categories as categoriesApi } from 'api';

const categories = {
    state: {
        items: [],
        status: 'initial', // initial, loading, loaded, error
    },
    reducers: {
        loadInitiated: produce(state => {
            if (state.status !== 'loaded') {
                state.status = 'loading';
            }
        }),
        loaded: produce((state, payload) => {
            state.items = payload;
            state.status = 'loaded';
        }),
        loadedError: produce(state => {
            if (state.status === 'loading') {
                state.status = 'error';
            }
        }),
    },
    effects: {
        async load() {
            try {
                this.loadInitiated();
                const categoriesData = await categoriesApi.get().promise;
                this.loaded(categoriesData.items);
            } catch (e) {
                this.loadedError();
            }
        },
    },
};

export { categories };
