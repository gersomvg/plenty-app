import produce from 'immer';

const onboarding = {
    state: {
        finished: false,
    },
    reducers: {
        finish: state => ({ ...state, finished: true }),
    },
};

export { onboarding };
