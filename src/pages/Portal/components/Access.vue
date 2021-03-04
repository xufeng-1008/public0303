<template>
  <div class="access-wrap">
    <div
      class="module-title-wrap">
      <p
        class="module-title"
        v-if="config.isHidden === 0">
        {{ config.title }}
      </p>
    </div>
    <component
      :is="componentList[config.accessStyle - 1]"
      :config="config"
      v-if="config.dataSource.length"
    />
  </div>
</template>

<script>
import Grid from './access/Grid.vue';
import Banner from './access/Banner.vue';
import List1 from './access/List1.vue';
import List2 from './access/List2.vue';
import loadModules from './common/loadModules';
import { ACCESS_STYLE_PROXY } from './common/portal';

export default {
  name: 'portal-wap-access',
  data() {
    return {
      ACCESS_STYLE_PROXY,
    };
  },
  props: {
    config: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  computed: {
  },
  created() {
    this.componentList = [Grid, List1, Banner, List2];
  },
  mounted() {
    console.log(this.$options.name, 2, 'this.index', this.index);
    loadModules.endLoad();
    if (loadModules.isPartialLoaded(this.index)) {
      this.$emit('loaded');
    }
  },
};
</script>

<style lang="scss">
</style>
