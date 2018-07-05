import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const shops = {};

shops.get = () => {
    return fetcher(`${API_ENDPOINT}/shop`);
};

export { shops };
