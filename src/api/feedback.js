import { fetcher, qs } from 'utils';
import { API_ENDPOINT } from 'config';

const feedback = {};

feedback.get = ({ limit, offset, nextLink, archived = false } = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({ limit, offset, archived });
        url = `${API_ENDPOINT}/feedback${params}`;
    }
    return fetcher(url);
};

feedback.create = ({ message, barcode, productId }) => {
    return fetcher(`${API_ENDPOINT}/feedback`, {
        method: 'POST',
        body: { message, barcode, productId },
    });
};

feedback.update = ({ id, archived }) => {
    return fetcher(`${API_ENDPOINT}/feedback/${id}`, {
        method: 'PATCH',
        body: { archived },
    });
};

export { feedback };
