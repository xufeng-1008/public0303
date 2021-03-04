<template>
  <div
    class="app_content_list1"
    :class="{ app_content_list1_empty: !dataList.length > 0 }">
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
        <div class="content-wrap"
             v-for="(item, index) in dataList"
             :key="index"
             @click="jumpUrl(item)">
          <div
            class="work_title text-overflow padding-line"
            v-if="item.keyColumn">
            {{ item.keyColumn.value }}
          </div>
          <div
            class="personal_information padding-line"
            v-if="item.firstField || item.secondField">
            <p
              class="text-overflow"
              v-if="item.firstField">
              {{ item.firstField.value }}
            </p>
            <p
              class="text-overflow"
              v-if="item.secondField">
              {{ item.secondField.value }}
            </p>
          </div>
          <div
            class="ascription text-overflow padding-line"
            v-if="item.thirdField">
            {{ item.thirdField.value }}
          </div>
          <!--todo card类型未联调-->
          <div class="card">
            <ul
              v-if="config.app_type === 'workflow' &&(item.beyondTimeInfo || item.urge.length > 0 || item.commissionedInfo)
         "
            >
              <li
                class="beyondTime"
                v-if="item.beyondTimeInfo">
                <p>超时</p>
              </li>
              <li
                class="urge"
                v-if="item.urge.length > 0">
                <p>催办</p>
              </li>
              <li
                class="commissioned"
                v-if="item.commissionedInfo">
                <p>委托</p>
              </li>
            </ul>
            <ul v-if="config.app_type === 'information' && (item.firstPropertyField || item.secondPropertyField || item.thirdPropertyField)">
              <li
                class="beyondTime"
                v-if="item.firstPropertyField && item.firstPropertyField.value">
                <p>{{ item.firstPropertyField.value.substring(0, 6) }}</p>
              </li>
              <li
                class="urge"
                v-if="item.secondPropertyField && item.secondPropertyField.value">
                <p>{{ item.secondPropertyField.value.substring(0, 6) }}</p>
              </li>
              <li
                class="commissioned"
                v-if="item.thirdPropertyField && item.thirdPropertyField.value">
                <p>{{ item.thirdPropertyField.value.substring(0, 6) }}</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import LoadingPrompt from './components/LoadingPrompt.vue';
import LabelPage from './components/LabelPage.vue';
import jumpUrl from '../common/jumpUrl';
import AppContentMiXin from './AppContentMiXin';
import { getListViewData } from '../../store';

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
  data() {
    return {
      tipMsg: '暂无数据',
    };
  },
  mixins: [AppContentMiXin],
  methods: {
    // eslint-disable-next-line func-names
    jumpUrl: debounce(function (item) {
      const { config } = this;
      jumpUrl('detail', config.app_type, config.app_id, item.id, config, item.keyColumn.value);
    }, 300),
    _getListData() {
      getListViewData(this).then((res) => {
        console.log('getListData', res);
        this.loading = false;
        if (res.length > 0) {
          this.dataList = res.slice(0, 3);
        } else {
          this.noData = true;
        }
        this.keepWrapHeight(true);
      })
        .catch((err) => {
          this.fetchError(err);
          this.keepWrapHeight(true);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.app_content_list1 {
  .content-list-wrap {
    width: 100%;
    margin-top: 15px;
    .content-wrap {
      width: 100%;
      padding-bottom: 20px;
      color: #999;
      .work_title{
        color: #333333;
        font-size: 16px;
        font-weight: 500;
      }
      .personal_information {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }

}
</style>
