import produce from 'immer';

const onboarding = {
    state: {
        finished: false,
        showFilterHint: true,
    },
    reducers: {
        finish: state => ({ ...state, finished: true }),
        hideFilterHint: state => ({ ...state, showFilterHint: false }),
    },
};

export { onboarding };
