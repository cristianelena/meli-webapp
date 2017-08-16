export const formatListCategories = body => {
    const { filters } = body;

    if (filters) {
        const [ filtersValues ] = filters.map(filter => {
            if (filter.id === 'category') {
                return filter.values;
            }
        });

        const [ filtersPath ] = filtersValues.map(value => value.path_from_root);

        return filtersPath.map(path => path.name);
    }

    return [];
};

export const formatListItems = (body, max = 10) => {
    const { results } = body;

    if (results) {
        return results.map(item => {
            const { id, title, price, currency_id, thumbnail, condition, shipping } = item;
            return {
                id,
                title,
                "price": {
                    "currency": currency_id,
                    "amount": price,
                    "decimals": 0
                },
                "picture": thumbnail,
                condition,
                "shipping": shipping.free_shipping
            }
        }).slice(0, max);
    }

    return [];
};

export const formatItem = body => {
    const { id, title, price, currency_id, pictures, condition, shipping, sold_quantity } = body;
    const [ picture ] = pictures.map(picture => picture.url);

    return {
        id,
        title,
        "price": {
            "currency": currency_id,
            "amount": price,
            "decimals": 0
        },
        picture,
        condition,
        "shipping": shipping.free_shipping,
        sold_quantity,
        description: 'to merge description...'
    }
};
