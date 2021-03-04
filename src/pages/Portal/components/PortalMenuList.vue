<template>
  <div class="portal-menu-list-wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div
        class="portal-menu-list"
        v-if="entryClassificationList.length > 0">
        <component
          :class="{'is-todo':module.appStyle ==3}"
          class="comment-wrap"
          v-for="(module, index) in entryClassificationList"
          :key="module.componentId"
          :is="module.type"
          :config="module"
          :index="index"
        />
      </div>
      <div
        class="no-portal-menu-list"
        v-else>
        暂无数据
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ComponentMinxin from '../componentMinxin';
import store from '../store';

export default {
  name: 'portal-menu-list',
  mixins: [ComponentMinxin],
  data() {
    return {
      refreshing: false,
    };
  },
  store,
  computed: {
    ...mapState(['portalId', 'entryClassificationList', 'componentTypeList', 'spaceId']),
    list() {
      console.log('this.entryClassificationList', this.entryClassificationList);
      const temp = this.entryClassificationList.slice(0, this.index);
      console.log('list', temp);
      return temp;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions(['getPortalId', 'getData']),
    initData() {
      this.getPortalId(this).then((res) => {
        console.log('getPortalId', res);
        this.getData(this).then(() => {
          this.refreshing = false;
        });
      });
    },
    onRefresh() {
      this.getData(this).then(() => {
        this.refreshing = false;
      });
    },
  },
};
</script>

<style lang="scss">
  /*@import "../portal";*/
</style>
