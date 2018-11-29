import { qs, fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const scrape = {};

scrape.get = ({ name }) => {
    const params = qs.stringify({ name });
    url = `${API_ENDPOINT}/scrape${params}`;
    return fetcher(url);
};

scrape.getDetails = ({ url }) => {
    const params = qs.stringify({ url });
    url = `${API_ENDPOINT}/scrape/details${params}`;
    return fetcher(url);
};

export { scrape };
