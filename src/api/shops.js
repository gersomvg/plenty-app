import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const shops = {};

shops.get = async () => {
    return await fetcher(`${API_ENDPOINT}/shop`);
};

export { shops };
