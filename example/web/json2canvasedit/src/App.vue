<template>
    <div id="app">
        <Split v-model="split">
            <div slot="left" class="left-view border">
                <Split v-model="split2" mode="vertical">
                    <div slot="top" class="left-view-sub">
                        <element-tree :data="data" @showProperty="showProperty"></element-tree>
                    </div>
                    <div slot="bottom" class="left-view-sub">
                        <element-property :data="propertyObj"></element-property>
                    </div>
                </Split>
            </div>
            <div slot="right" class="right-view border">
                <div>
                    <Button class="btn" type="primary" @click="downloadData">导出JSON</Button>
                    <Button class="btn" type="primary" @click="downloadImage">下载图片</Button>
                </div>
                <div>
                    <canvas id="myCanvas"></canvas>
                </div>
            </div>
        </Split>
    </div>
</template>

<script>
  import ElementTree from './components/ElementTree.vue';
  import ElementProperty from './components/ElementProperty.vue';

  import element from './element/index';

  export default {
      name: 'App',
      components: {
          ElementTree,
          ElementProperty,
      },
      data() {
          return {
              split: 0.2,
              split2: 0.5,
              data: option['元素测试'],
              propertyObj: {},
          };
      },
      watch: {
          data: {
              handler: function(val, oldVal) {
                  //更新canvas
                  this.$nextTick(() => {
                      json2canvas.draw(
                          this.toJSON(JSON.parse(JSON.stringify(val))),
                          '#myCanvas'
                      );
                  });
              },
              deep: true,
              immediate: true,
          },
      },
      methods: {
          showProperty(obj) {
              if (obj.nodeKey === 0) {
                  obj.type = 'root';
              }

              let defaultObj = element[obj.type].default;
              for (const attribute in defaultObj) {
                  if (!obj.hasOwnProperty(attribute)) {
                      this.$set(obj, attribute, defaultObj[attribute]);
                  }
              }
              this.propertyObj = obj;
          },
          toJSON(data) {
              delete data.selected;
              delete data.expand;
              delete data.nodeKey;

              if (data.children) {
                  data.children = data.children.map(item => {
                      return this.toJSON(item);
                  });
              }
              return data;
          },
          downloadData() {
              let data = this.toJSON(JSON.parse(JSON.stringify(this.data)));
              var str = JSON.stringify(data, null, 4);
              var blob = new Blob([str], {
                  type: 'text/html,charset=UTF-8',
              });
              window.URL = window.URL || window.webkitURL;
              var a = document.createElement('a');
              a.setAttribute('download', 'data.json');
              a.href = URL.createObjectURL(blob);
              a.click();
          },
          downloadImage() {
              try {
                  document.getElementById('myCanvas').toBlob(function(blob) {
                      var url = URL.createObjectURL(blob);
                      var a = document.createElement('a');
                      a.setAttribute('download', 'image.png');
                      a.setAttribute('href', url);
                      a.click();
                  });
              } catch (error) {
                  alert(error.message);
              }

              /*  a.setAttribute('href', dataURL);
                          let data = this.toJSON(JSON.parse(JSON.stringify(this.data)));
                          var str = JSON.stringify(data, null, 4);
                          var blob = new Blob([str], {
                              type: 'text/html,charset=UTF-8',
                          });
                          window.URL = window.URL || window.webkitURL;
                          */
          },
      },
  };
</script>

<style lang="scss" >
  html,
  body,
  #app {
      box-sizing: border-box;
      margin: 0;
      padding: 5px;
      height: 100%;
  }

  #app {
      display: flex;
      flex-direction: row;
  }

  .left-view {
      height: 100%;
      .left-view-sub {
          padding: 10px 5px;
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
      }
  }

  .right-view {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      padding-left: 20px !important;
      .btn {
          margin-right: 10px;
      }
  }

  .border {
      padding: 5px;
      border: 1px #ccc solid;
      border-radius: 5px;
  }

  canvas {
      max-height: 100%;
      margin-top: 10px;
  }
</style>
<style>
  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
  }
</style>
