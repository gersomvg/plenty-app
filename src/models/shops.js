import produce from 'immer';

import { shops as shopsApi } from 'api';

const shops = {
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
                const shopsData = await shopsApi.get().promise;
                this.loaded(shopsData.items);
            } catch (e) {
                this.loadedError();
            }
        },
    },
};

export { shops };
