<template>
  <div class="app-form">
    <ml-form-page
      :app="appId"
      :module="module"
      :form="formId"
      :node="node"
      :space-id="spaceId"
      :edit="edit"
      :superedit="superedit"
      :source="source"
      :real-handler="realHandler"
      :app-name="appName"
      :token="token"
      ref="formPage"
      @open-webview="openWebview"
      @on-init="onInit"
      @on-field-value-changed="onFieldValueChanged"
    />
  </div>
</template>

<script>
import Vue from 'vue';
// import { jsBridgeReady } from '@qycloud/js-bridge';
import { FormPage, version } from '@qycloud/lego-mobile';
import '@qycloud/lego-mobile/lib/index.scss';
import { ComponentxPlugin } from '@qycloud/vue-plugin-componentx';
// import NewFormFieldsGroup from './NewFormFieldsGroup.vue';
window.LEGO_VERSION = version;
const { https, server, userAgent } = require('../../../../config/server');

Vue.use(FormPage, { https, server, userAgent });
Vue.use(ComponentxPlugin);

export default {
  name: 'DefaultAppForm',
  xComponents: {
    // MlFormFieldsGroup: NewFormFieldsGroup,
  },
  props: {
    module: String,
    appId: String,
    formId: String,
    node: String,
    realHandler: String,
    spaceId: String,
    source: String,
    superedit: String,
    appName: String,
    token: String,
  },
  created() {
    if (this.appName) {
      document.title = this.appName;
    }
  },
  data() {
    return {
      options: {
        table: 'dfmaindefault',
        field: 'mainzifuchuan',
        value: 'sfsdfsdfsdfsdfsdfsdfs',
        isMagnifier: false,
      },
      edit: this.formId ? '0' : '1',
    };
  },
  methods: {
    onFieldValueChanged(ctx, { tableId, fieldId, value }) {
      console.log('onFieldValueChanged ===== > ', { tableId, fieldId, value });
    },
    onInit(ctx) {
      console.log('onInit ===== > ', ctx);
      // this.ctx = ctx;
      // const { tableId } = ctx.getFormData();
      // const property = ctx.getFieldProperty({ tableId, fieldId: 'zifuchuan1' });
      // ctx.setFieldProperty({
      //   tableId,
      //   fieldId: 'zifuchuan1',
      //   property: { ...property, reName: '新标题' },
      // });
    },
    onAction(ctx, { action, next }) {
      console.log('onAction ===== > ', action, next);
      next();
    },
    openWebview(params) {
      const basePath = `${window.location.origin}${window.location.pathname}`;
      let url = `${basePath}?spaceId=${this.spaceId}&module=${params.module}&appId=${params.appId}&edit=0&formId=${params.formId}`;
      if (params.module === 'workflow') {
        url = `${url}&node=${params.node}`;
      }
      console.log('webUrl =====> ', url);
      url = `${url}&source=1`;
      // jsBridgeReady((bridge) => {
      //   bridge.callHandler('openWebview', { url }, () => {});
      // });
    },
    /**
     * @param {Object} args
     * @param {String} args.app 应用 id；args.isActive 为 true 时存在该属性
     * @param {String} args.module 模块名（information 或 workflow）；args.isActive 为 true 时存在该属性
     * @param {String|Number} args.id 编号；args.isActive 为 false 时存在该属性
     * @param {String} args.name 显示名
     * @param {Boolean} args.isActive 是否为当前 form
     */
    onCrumbItemClick(args) {
      console.log('crumb item click:', args);
    },

    /**
     * @param {Object} args
     * @param {String} args.action CANCEL、WORKFLOW_CANCEL、DATAFLOW_CANCEL、WORKFLOW_SAVE、DATAFLOW_SAVE
     */
    afterBottomAction(args) {
      console.log('after bottom action', args);
    },

    /**
     * @param {Object} args
     * @param {String} args.table 表 id
     * @param {String} args.field 字段 id
     * @param {String} args.property 属性名称
     * @param {any} args.value 属性值
     */
    onFieldPropertyChanged(args) {
      console.log('field property changed:', args);
    },

    /**
     * @param {Object} args
     * @param {String} args.table 主表 id
     * @param {Map<String, Map<String, Boolean>>} args.value 从表属性，示例如下：
     * {
     *   'shuzifubiao': { display: true, required: false }
     * }
     */
    onSlaveTablePropertyChanged(args) {
      console.log('slave table property changed:', args);
    },

    /**
     * 自定义字段验证（只支持同步验证）
     * @param {Object} args
     * @param {String} args.table 表 id
     * @param {String} args.field 字段 id
     * @param {String} args.type 字段类型
     * @param {any} args.value 字段值
     * @param {Object} args.property 字段属性
     *
     * @returns {null|Map<String, Boolean|String>} 返回值为 null 时，采用默认验证，否则，返回以下结构：
     * { status：Boolen, error: String }
     */
    validator(args) {
      console.log('custom validator:', args);
      return null;
    },

    /**
     * 获取主表字段和字段值
     */
    getFieldsValue() {
      this.$refs.formPage.getFieldsValue();
    },

    setFieldValue(options) {
      console.log(this.options, 'options');
      this.$refs.formPage.setFieldValue(options);
    },
  },
};
</script>

<style lang="scss">
.app-form {
  height: 100%;
  // margin-top: 50px;
}
</style>
