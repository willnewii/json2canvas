import base from './base'

let element = {
    attributes: {},
    default: {},
};

element.attributes = {
    r: {
        value: 100,
        type: 'number'
    },
    lineWidth: {
        value: 5,
        type: 'number'
    },
    strokeStyle: {
        value: '#CCCCCC',
        type: 'string'
    }
}

base.addBaseAttribute('circle', element);
base.addDefault(element);

export default element