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

products.create = data => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('brandId', data.brand.id);
    formData.append('classification', data.classification);
    formData.append('explanation', data.explanation);
    data.shops.forEach(shop => formData.append('shopCodes[]', shop.code));
    data.categories.forEach(category => formData.append('categoryIds[]', category.id));
    formData.append('image', {
        uri: data.imageUrl,
        name: 'image.jpg',
        type: 'multipart/form-data',
    });

    const url = `${API_ENDPOINT}/product`;
    return fetcher(url, {
        method: 'POST',
        body: formData,
        isMultipartFormData: true,
    });
};

products.update = data => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('brandId', data.brand.id);
    formData.append('classification', data.classification);
    formData.append('explanation', data.explanation);
    data.shops.forEach(shop => formData.append('shopCodes[]', shop.code));
    data.categories.forEach(category => formData.append('categoryIds[]', category.id));
    if (!data.imageUrl.startsWith('http')) {
        formData.append('image', {
            uri: data.imageUrl,
            name: 'image.jpg',
            type: 'multipart/form-data',
        });
    }

    const url = `${API_ENDPOINT}/product/${data.id}`;
    return fetcher(url, {
        method: 'PUT',
        body: formData,
        isMultipartFormData: true,
    });
};

export { products };
