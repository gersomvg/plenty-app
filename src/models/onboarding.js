import produce from 'immer';

const onboarding = {
    state: {
        finished: false,
    },
    reducers: {
        finish: () => ({ finished: true }),
    },
};

export { onboarding };
