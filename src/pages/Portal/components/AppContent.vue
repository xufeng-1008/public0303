<template>
  <div class="appcontent-wrap">
    <div
      class="module-title-wrap"
      v-if=" config.appStyle !== '3'"
      :class="{'no-title':config.isHidden }">
      <p
        class="module-title"
        @click="jumpUrl(config)"
        v-if="config.isHidden === 0">
        {{ config.title }}
      </p>
     <span class="module-title-icon-wrap" >更多
        <i
          v-if="config.appStyle !== '3'"
          class="qycloudiconfont icon-youcejiantou"
          :class="{ 'iconfont-style': config.isHidden === 1 }"
          @click="jumpUrl(config)"
        />
     </span>
    </div>
    <component
      class="appcontent-content"
      :is="componentList[config.appStyle - 1]"
      :config="config" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import jumpUrl from './common/jumpUrl';
import List1 from './appContent/List1.vue';
import List2 from './appContent/List2.vue';
import List3 from './appContent/List3.vue';

export default {
  name: 'portal-wap-appcontent',
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
  methods: {
    jumpUrl: debounce((module) => {
      console.log('module', module);
      if (module.app_type && module.app_id && module.appTab) {
        jumpUrl('view', module.app_type, module.app_id, module.appTab[0], module);
      }
    }, 300),
  },
  created() {
    this.componentList = [List1, List2, List3];
  },
  mounted() {
    console.log(this.$options.name, 3, 'this.index', this.index);
  },
};
</script>
<style lang="scss">
.appcontent-wrap {
  .module-title-icon-wrap {
    font-size: 12px;
    color: #999;
    flex: none;
    padding: 0 10px;
    i{
      margin-left: 5px;
    }
  }
  .appcontent-content {
    min-height: 100px;
    padding: 0 14px;
  }
}
</style>
