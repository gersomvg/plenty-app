import { qs, logger, fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const products = {};

products.get = async ({ limit, offset, nextLink, name, categoryId, shopCode } = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({ limit, offset, name, categoryId, shopCode });
        url = `${API_ENDPOINT}/product${params}`;
    }
    return await fetcher(url);
};

products.getOne = async ({ id }) => {
    const url = `${API_ENDPOINT}/product/${id}`;
    return await fetcher(url);
};

products.getOneByBarcode = async ({ barcode }) => {
    const url = `${API_ENDPOINT}/product/barcode/${barcode}`;
    return await fetcher(url);
};

export { products };
