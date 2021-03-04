<template>
  <div class="access-list1">
      <div class="list-content-wrap"
        v-for="(item, index) in config.dataSource"
        :key="index"
        @click="jumpUrl(item)">
        <div class="list1-icon">
          <img
            v-if="item.img"
            :src="formatImgUrl(item)"
            alt="">
          <i
            v-else
            :class="'qycloud ' + item.icon"
            :style="{ color: item.color }" />
        </div>
        <div class="list1-content">
          <p class="list1-title text-overflow">{{ item.name }}</p>
          <i
            class="qycloudiconfont icon-xiangyouzhankai right-icon-arrow"
            v-show="config.showStyle === 'true'" />
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
.access-list1 {
  width: 100%;
  padding: 0 14px;
  .list-content-wrap{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    padding-bottom: 18px;
    overflow: hidden;
      .list1-icon{
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
        .list1-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          overflow: hidden;
            .list1-title{
              color: #333333;
              font-size: 16px;
              font-weight: 500;
            }
          i {
            text-align: right;
          }
        }
    }
}
</style>
