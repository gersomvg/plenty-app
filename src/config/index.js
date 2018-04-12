export default {
    API_ENDPOINT:
        process.env.NODE_ENV === 'development'
            ? 'https://plenty-staging.herokuapp.com/api/v1'
            : 'https://plenty-production.herokuapp.com/api/v1',
};
