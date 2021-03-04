<template>
  <div class="access-banner-wrap">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item  v-for="(item, index) in config.dataSource"
                       :key="index"
                       @click="jumpUrl(item)">
        <img :src="formatImgUrl(item)" alt="">
      </van-swipe-item>

    </van-swipe>
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
  data() {
    return {
      actives: 0,
    };
  },
  mounted() {
    this.timer = null;
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
  .access-banner-wrap{
    .my-swipe .van-swipe-item {
      color: #fff;
      height: 143px;
      img {
        width: 100%;
      }
    }

  }
</style>
