<template>
  <ml-view-list
    :module="module"
    :app-id="appId"
    :space-id="spaceId"
    :real-handler="realHandler"
    @open-form="openForm"
    @add-form="addForm"
    @go-back="goBack"
  />
</template>
<script>
import Vue from 'vue';
// import { jsBridgeReady } from '@qycloud/js-bridge';
import { ViewList } from '@qycloud/lego-mobile';

const { https, server, userAgent } = require('../../../../config/server');

Vue.use(ViewList, { https, server, userAgent });

export default {
  props: {
    module: String,
    appId: String,
    spaceId: String,
    realHandler: String,
  },
  methods: {
    onAction(ctx, { action, next }) {
      console.log('viewlsit-onAction ===== > ', action, next);
      next();
    },
    openForm(res) {
      const { item, app, superedit } = res;
      const data = item;
      let url = `/${this.spaceId}/lego-app-form?spaceId=${this.spaceId}&module=${this.module}&appId=${this.appId}&appName=${app.title}`;
      if (item.real_handler) {
        url = `${url}&realHandler=${item.real_handler}`;
      }
      if (superedit) {
        url = `${url}&superedit=1`;
      }
      if (this.module === 'workflow') {
        const nodeId = data.nodes[0] && data.nodes[0].node_key ? data.nodes[0].node_key : '';
        const scId = data.sc_id || ''; // 抄送人id
        url = `${url}&formId=${data.instance_id}&node=${nodeId}&scId=${scId}`;
      } else {
        url = `${url}&formId=${data.id}`;
      }
      this.$router.push(url);
    },
    addForm(res) {
      const { app } = res;
      this.$router.push(
        `/${this.spaceId}/lego-app-form?module=${this.module}&appId=${this.appId}&appName=${app.title}`,
      );
    },
    goBack() {
      if (history.length === 1) {
        // jsBridgeReady((bridge) => {
        //   bridge.callHandler('isShowTitleBar', { isBack: true }, () => {});
        // });
      } else {
        this.$router.back();
      }
    },
  },
};
</script>
