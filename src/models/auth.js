import produce from 'immer';

const auth = {
    state: {
        user: null,
        status: 'UNAUTHORIZED', // UNAUTHORIZED, AUTHORIZED
    },
    reducers: {
        authorize: produce((state, payload) => {
            state.user = payload;
            state.status = 'AUTHORIZED';
        }),
        unauthorize: produce(state => {
            state.user = null;
            state.status = 'UNAUTHORIZED';
        }),
    },
};

export { auth };
