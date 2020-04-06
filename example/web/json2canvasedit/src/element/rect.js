import base from './base'

let element = {
    attributes: {},
    default: {},
};

element.attributes = {
    r: {
        value: 0,
        type: 'number'
    },
    lt: {
        value: true,
        type: 'boolean'
    },
    lb: {
        value: true,
        type: 'boolean'
    },
    rt: {
        value: true,
        type: 'boolean'
    },
    rb: {
        value: true,
        type: 'boolean'
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

base.addBaseAttribute('rect', element);
base.addDefault(element);

export default element