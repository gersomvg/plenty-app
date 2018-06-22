import { fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const categories = {};

categories.get = async () => {
    return await fetcher(`${API_ENDPOINT}/category`);
};

export { categories };
