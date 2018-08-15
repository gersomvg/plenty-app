import produce from 'immer';

import { tags as tagsApi } from 'api';

const tags = {
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
                const tagsData = await tagsApi.get().promise;
                this.loaded(tagsData.items);
            } catch (e) {
                console.log(e);
                this.loadedError();
            }
        },
    },
};

export { tags };
