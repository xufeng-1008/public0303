<template>
  <div class="access-list2">
      <div class="list-content-wrap"
        v-for="(item, index) in config.dataSource"
        :key="index"
        @click="jumpUrl(item)">
        <div class="list2-icon">
          <img
            v-if="item.img"
            :src="formatImgUrl(item)"
            alt="">
          <i
            v-else
            :class="'qycloud ' + item.icon"
            :style="{ color: item.color }" />
        </div>
        <div class="list2-content">
          <div
            class="list2-title"
            :class="[!item.subName && 'content-center']">
            <p class="text-overflow">{{ item.name }}</p>
            <i
              class="qycloudiconfont icon-xiangyouzhankai right-icon-arrow"
              v-show="config.showStyle === 'true'" />
          </div>
          <p class="list2-describe text-overflow">{{ item.subName }}</p>
        </div>
      </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { parseJump } from '../common/parseJump';
import AccessMixin from './AccessMixin';

export default {
  props: {
    config: {
      required: true,
      type: Object,
    },
  },
  mixins: [AccessMixin],
  methods: {
    jumpUrl: debounce((tab) => {
      parseJump(tab);
    }, 300),
  },
};
</script>
<style lang="scss">
.access-list2{
  width: 100%;
  padding: 0 14px;
  .list-content-wrap{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 20px;
    .list2-icon{
      display: flex;
      text-align: center;
      justify-items: center;
      align-items: center;
      margin-right: 10px;
      width: 32px;
      height: 32px;
      i{
        flex: auto;
        font-size: 24px;
      }
      img{
        width: 32px;
        height: 32px;
        flex: auto;
        border: none;
        object-fit: cover;
        border-radius: 2px;
      }
    }
    .list2-content{
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow: hidden;
      .list2-title{
        display: flex;
        flex: none;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        P {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        i {
          flex: none;
        }
      }
      .list2-describe {
        /*margin-top: 6px;*/
        color: #999;
        font-weight: 400;
        line-height: 16px;
      }
    }
  }
}
</style>
