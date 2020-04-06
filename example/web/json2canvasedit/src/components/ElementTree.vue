<template>
    <div>
        <Tree
            :data="[data]"
            :render="renderContent"
            class="demo-tree-render"
            @on-select-change="onTreeClick"
        ></Tree>
        <Modal v-model="modal.show" title="请选择元素类型" @on-ok="ok" @on-cancel="cancel">
            <RadioGroup v-model="modal.type">
                <Radio label="group">
                    <span>group</span>
                </Radio>
                <Radio label="image">
                    <span>image</span>
                </Radio>
                <Radio label="text">
                    <span>text</span>
                </Radio>
            </RadioGroup>
        </Modal>
    </div>
</template>

<script>
  import element from '../element/index';

  let tempData = null;

  export default {
      name: 'ElementTree',
      data() {
          return {
              modal: {
                  show: false,
                  type: 'text',
              },
          };
      },
      props: {
          data: {
              type: Object,
              required: true,
          },
      },
      computed: {
          /* treeData() {
                return JSON.parse(JSON.stringify(this.data));
            }, */
      },
      methods: {
          append(data) {
              this.modal.show = true;
              tempData = data;
          },
          remove(root, node, data) {
              const parentKey = root.find(el => el === node).parent;
              const parent = root.find(el => el.nodeKey === parentKey).node;
              const index = parent.children.indexOf(data);
              parent.children.splice(index, 1);
          },
          onTreeClick(array, data) {
              this.$emit('showProperty', data);
          },
          ok() {
              let data = tempData;
              const children = data.children || [];

              let newObj = Object.assign(
                  {
                      type: this.modal.type,
                  },
                  element[this.modal.type].default
              );

              children.push(newObj);
              this.$set(data, 'children', children);
              this.modal.show = false;
          },
          cancel() {
              this.modal.show = false;
          },
          renderContent(h, { root, node, data }) {
              let buttons = [
                  h('Button', {
                      props: Object.assign(
                          {},
                          { type: 'default', size: 'small' },
                          {
                              icon: 'ios-add',
                          }
                      ),
                      style: {
                          marginRight: '8px',
                      },
                      on: {
                          click: () => {
                              this.append(data);
                          },
                      },
                  }),
                  h('Button', {
                      props: Object.assign(
                          {},
                          { type: 'default', size: 'small' },
                          {
                              icon: 'ios-remove',
                          }
                      ),
                      on: {
                          click: () => {
                              this.remove(root, node, data);
                          },
                      },
                  }),
              ];

              if (node.nodeKey === 0) {
                  buttons.pop();
              }

              return h(
                  'span',
                  {
                      style: {
                          display: 'inline-block',
                          width: '100%',
                      },
                  },
                  [
                      h('span', [
                          h('Icon', {
                              props: {
                                  type: 'ios-paper-outline',
                              },
                              style: {
                                  marginRight: '8px',
                              },
                          }),
                          h('span', node.nodeKey === 0 ? 'root' : data.type),
                      ]),
                      h(
                          'span',
                          {
                              style: {
                                  display: 'inline-block',
                                  float: 'right',
                                  marginRight: '32px',
                              },
                          },
                          buttons
                      ),
                  ]
              );
          },
      },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .ivu-tree-title {
      width: 100%;
      text-align: left;
  }
</style>
