export * from './styling';

export const API_ENDPOINT = {
    development: 'http://localhost:3001/api/v1',
    staging: 'https://plenty-staging.herokuapp.com/api/v1',
    production: 'https://plenty-production.herokuapp.com/api/v1',
}[process.env.NODE_ENV];
