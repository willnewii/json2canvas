function addBaseAttribute(type, obj) {
    Object.assign(obj.attributes, {
        type: {
            value: type,
            type: 'string',
            disabled: true,
        },
        x: {
            value: 0,
            type: 'number'
        },
        y: {
            value: 0,
            type: 'number'
        },
        rotation: {
            value: 0,
            type: 'number'
        }
    });
}

function addDefault(obj) {
    if (!obj.default)
        obj.default = {};
    for (const attribute in obj.attributes) {
        if (obj.attributes.hasOwnProperty(attribute)) {
            obj.default[attribute] = obj.attributes[attribute].value;
        }
    }
}

export default { addBaseAttribute, addDefault }