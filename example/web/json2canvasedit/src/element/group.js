import base from './base'

let element = {
    attributes: {},
    default: {},
};

element.attributes = {}

base.addBaseAttribute('group', element);

delete element.attributes.rotation;

base.addDefault(element);

export default element