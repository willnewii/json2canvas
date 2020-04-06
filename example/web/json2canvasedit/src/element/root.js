import base from './base'

let element = {
    attributes: {},
    default: {},
};

element.attributes = {
    width: {
        value: 750,
        type: 'number'
    },
    height: {
        value: 1334,
        type: 'number'
    },
    scale: {
        value: 0.6,
        type: 'number'
    },
    fillStyle: {
        value: '#40395A',
        type: 'string'
    },
}

base.addBaseAttribute('root', element);

delete element.attributes.x;
delete element.attributes.y;
delete element.attributes.rotation;

base.addDefault(element);

export default element