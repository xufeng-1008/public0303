<template>
  <ml-app-list
    :space-id="spaceId"
    @open-app="openApp"
    @onclick-left="onClickLeft"
  />
</template>
<script>
import Vue from 'vue';
import { AppList } from '@qycloud/lego-mobile';

const { https, server, userAgent } = require('../../../config/server');

Vue.use(AppList, { https, server, userAgent });

export default {
  name: 'appList',
  data() {
    return {
      spaceId: window.AY.getSpaceId(),
    };
  },
  methods: {
    onClickLeft() {
    },
    openApp(app) {
      this.$router.push(`/${this.spaceId}/app/!/${app.app_type}/${app.app_id}`);
    },
  },
};
</script>
