import base from './base'

let element = {
    attributes: {},
    default: {},
};

element.attributes = {
    url: {
        value: '',
        type: 'string'
    },
    width: {
        value: 100,
        type: 'number'
    },
    isCircular: {
        value: false,
        type: 'boolean'
    }
}

base.addBaseAttribute('image', element);
base.addDefault(element);

export default element