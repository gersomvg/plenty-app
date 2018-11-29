import { qs, logger, fetcher } from 'utils';
import { API_ENDPOINT } from 'config';

const products = {};

products.get = ({ nextLink, ...other } = {}) => {
    let url = nextLink;
    if (!url) {
        const params = qs.stringify(other);
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
    data.tags.forEach(tag => formData.append('tagIds[]', tag.id));
    data.categories.forEach(category => formData.append('categoryIds[]', category.id));
    data.barcodes.forEach(barcode => formData.append('barcodes[]', barcode));
    if (data.customImageUrl) {
        formData.append('customImage', {
            uri: data.customImageUrl,
            name: 'image.jpg',
            type: 'image/jpeg',
        });
    }
    if (data.officialImageUrl) {
        formData.append('officialImage', {
            uri: data.officialImageUrl,
            name: 'image.jpg',
            type: 'image/jpeg',
        });
    }
    if (data.externalImageUrl) {
        formData.append('externalImage', data.externalImageUrl);
    }

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
    data.tags.forEach(tag => formData.append('tagIds[]', tag.id));
    data.categories.forEach(category => formData.append('categoryIds[]', category.id));
    data.barcodes.forEach(barcode => formData.append('barcodes[]', barcode));
    if (data.customImageUrl !== '' && !data.customImageUrl.startsWith('http')) {
        formData.append('customImage', {
            uri: data.customImageUrl,
            name: 'image.jpg',
            type: 'image/jpeg',
        });
    }
    if (data.officialImageUrl !== '' && !data.officialImageUrl.startsWith('http')) {
        formData.append('officialImage', {
            uri: data.officialImageUrl,
            name: 'image.jpg',
            type: 'image/jpeg',
        });
    }
    if (data.externalImageUrl) {
        formData.append('externalImage', data.externalImageUrl);
    }

    const url = `${API_ENDPOINT}/product/${data.id}`;
    return fetcher(url, {
        method: 'PUT',
        body: formData,
        isMultipartFormData: true,
    });
};

products.patch = ({ id, archived }) => {
    return fetcher(`${API_ENDPOINT}/product/${id}`, {
        method: 'PATCH',
        body: { archived },
    });
};

export { products };
