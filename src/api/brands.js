import { fetcher, qs } from 'utils';
import { API_ENDPOINT } from 'config';

const brands = {};

brands.get = ({ limit, offset, nextLink, name } = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({ limit, offset, name });
        url = `${API_ENDPOINT}/brand${params}`;
    }
    return fetcher(url);
};

brands.create = name => {
    return fetcher(`${API_ENDPOINT}/brand`, { method: 'POST', body: { name } });
};

export { brands };
