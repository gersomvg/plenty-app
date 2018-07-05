import { qs, logger, fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const products = {};

products.get = ({ limit, offset, nextLink, name, categoryId, shopCode } = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify({ limit, offset, name, categoryId, shopCode });
        url = `${API_ENDPOINT}/product${params}`;
    }
    return fetcher(url);
};

products.getOne = ({ id }) => {
    const url = `${API_ENDPOINT}/product/${id}`;
    return fetcher(url);
};

products.getOneByBarcode = ({ barcode }) => {
    const url = `${API_ENDPOINT}/product/barcode/${barcode}`;
    return fetcher(url);
};

products.create = ({ imageUrl, name, brand }) => {
    const url = `${API_ENDPOINT}/product`;
    let formData = new FormData();
    formData.append('name', name);
    formData.append('brandId', brand.id);
    formData.append('classification', 'YES');
    formData.append('image', {
        uri: imageUrl,
        name: 'image.jpg',
        type: 'multipart/form-data',
    });
    return fetcher(url, {
        method: 'POST',
        body: formData,
        isMultipartFormData: true,
    });
};

export { products };
