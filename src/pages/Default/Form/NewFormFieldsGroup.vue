<template>
  <div>
    <div
      v-for="(item, index) in fields"
      :key="
        item.fieldId +
        index +
        item.props.displayable +
        item.props.changeable +
        item.props.required +
        item.props.modifier
      "
    >
      <new-field-string
        v-if="item.fieldId === 'mainzifuchuan'"
        v-bind="item"
      ></new-field-string>
      <ml-field-box
        v-else
        v-bind="item"
        :spaceId="spaceId"
        @on-field-value-changed="onFieldValueChanged"
      ></ml-field-box>
    </div>
  </div>
</template>
<script>
import { FormFieldsGroup, FieldBox } from '@qycloud/lego-mobile';
import NewFieldString from './NewFieldString.vue';

export default {
  extends: FormFieldsGroup,
  components: {
    NewFieldString,
    MlFieldBox: FieldBox,
  },
  methods: {
    onFieldValueChanged({ tableId, fieldId, value }) {
      this.$emit('on-field-value-changed', { tableId, fieldId, value });
    },
  },
};
</script>
