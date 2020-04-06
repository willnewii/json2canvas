<template>
    <div>
        <Form :model="formItem" label-position="left" :label-width="80">
            <FormItem v-for="(attribute,index) in ele.attributes" :label="index" :key="index">
                <Input
                    v-if="attribute.type == 'string' "
                    v-model="data[index]"
                    :disabled="attribute.disabled"
                ></Input>
                <InputNumber v-else-if="attribute.type == 'number'" v-model="data[index]" value="0"></InputNumber>
                <i-switch v-else-if="attribute.type == 'boolean'" v-model="data[index]"></i-switch>
            </FormItem>
        </Form>
    </div>
</template>

<script>
  import element from '../element/index';

  export default {
      name: 'ElementProperty',
      data() {
          return {
              formItem: {},
          };
      },
      computed: {
          ele() {
              return element[this.data.type] || {};
          },
      },
      props: {
          data: {
              type: Object,
              required: true,
          },
      },
  };
</script>

<style scoped>
</style>
