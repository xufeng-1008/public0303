<template>
  <div class="app_content_list2">
    <label-page
      @getLabelId="getLabelId"
      :config="config" />
    <loading-prompt
      :loading="loading"
      :error-show="errorShow"
      :no-data="noData"
      :message="message"
      :tip-msg="tipMsg"
    />
    <div class="content-list-wrap">
      <div
        class="content-wrap"
        v-for="(item, index) in dataList"
        :key="index"
        @click="jumpUrl(item)"
      >
        <p class="title text-overflow">{{ item.data[0] }}</p>
        <p class="describe">{{ item.data[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { getListData } from '../../store';
import LoadingPrompt from './components/LoadingPrompt.vue';
import LabelPage from './components/LabelPage.vue';
import jumpUrl from '../common/jumpUrl';
import AppContentMiXin from './AppContentMiXin';

export default {
  components: {
    LoadingPrompt,
    LabelPage,
  },
  props: {
    config: {
      required: true,
      type: Object,
    },
  },
  mixins: [AppContentMiXin],
  data() {
    return {
      tipMsg: '暂无数据',
    };
  },
  methods: {
    // eslint-disable-next-line func-names
    jumpUrl: debounce(function (item) {
      const { config } = this;
      jumpUrl('detail', config.app_type, config.app_id, item.id, config);
    }, 300),
    _getListData() {
      getListData(this)
        .then((res) => {
          console.log('getList2Data', res);
          this.loading = false;
          if (res.length > 0) {
            this.dataList = res.slice(0, 3);
          } else {
            this.noData = true;
          }
          this.keepWrapHeight(true);
        })
        .catch((err) => {
          this.keepWrapHeight(true);
          this.fetchError(err);
        });
    },
  },
};
</script>
<style lang="scss">
.app_content_list2 {
  .content-list-wrap {
    width: 100%;
    margin-top: 15px;
    .content-wrap {
      width: 100%;
      padding-bottom: 20px;
      color: #999;
      .title{
        color: #333333;
        font-size: 16px;
        font-weight: 500;
      }
      .describe {
        margin-top: 15px;
        font-size: 14px;
        color: #666;
        word-break:break-all;
      }
    }
  }
}
</style>
