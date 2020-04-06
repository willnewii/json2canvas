import base from './base'

let element = {
    attributes: {},
    default: {},
};

element.attributes = {
    text: {
        value: '我是一段文字',
        type: 'string'
    },
    font: {
        value: '22px Arial',
        type: 'string'
    },
    color: {
        value: '#CCCCCC',
        type: 'string'
    }
}

base.addBaseAttribute('text', element);
base.addDefault(element);

export default element