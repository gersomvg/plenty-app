import { qs, logger, fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const get = async ({ limit, offset, nextLink, name, categoryId, shopCode } = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({ limit, offset, name, categoryId, shopCode });
        url = `${API_ENDPOINT}/product${params}`;
    }
    return await fetcher(url);
};

const getOne = async ({ id }) => {
    const url = `${API_ENDPOINT}/product/${id}`;
    return await fetcher(url);
};

const getOneByBarcode = async ({ barcode }) => {
    const url = `${API_ENDPOINT}/product/barcode/${barcode}`;
    return await fetcher(url);
};

export default {
    get,
    getOne,
    getOneByBarcode,
};
