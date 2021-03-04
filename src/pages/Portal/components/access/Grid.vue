<template>
  <ul class="access-grid-wrap">
    <li
      :class="'grid-item style-' + config.showNum"
      v-for="(item, index) in config.dataSource"
      :key="index">
      <div
        class="grid-icon"
        @click="jumpUrl(item)">
        <img
          v-if="item.img"
          :src="formatImgUrl(item)"
          alt="">
        <i
          v-else
          :class="'qycloud ' + item.icon"
          :style="{color: item.color}" />
      </div>
      <p class="grid-title">{{ sliceTitle(item.name) }}</p>
    </li>
  </ul>
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
    sliceTitle(txt) {
      const num = +this.config.showNum;
      let size;
      switch (num) {
        case 5:
          size = 4;
          break;
        case 4:
          size = 5;
          break;
        case 3:
          size = 6;
          break;
        case 2:
          size = 8;
          break;
        default:
          size = 4;
      }

      return txt.slice(0, size);
    },
    jumpUrl: debounce((tab) => {
      parseJump(tab);
    }, 300),
  },
  // created() {
  //     this.config.showNum = 2;
  // }
};
</script>

<style lang="scss">
.access-grid-wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    .grid-item {
        flex-shrink: 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .grid-icon {
            text-align: center;
            border-radius: 4px;
            img {
                border-radius: 4px;
                width: 100%;
                height: 100%;
                display: block;
            }
            .qycloud {
                color: #fff;
                display: block;
            }
        }
        .grid-title {
            width: 100%;
            box-sizing: border-box;
            padding: 0 5px;
            color: #323648;
        }
    }
    .style-2 {
        width: 50%;
        &.grid-item{
        margin-bottom: 20px;
      }
        .grid-title{
          font-size: 16px;
          margin-top: 14px;
        }
        .grid-icon {
            width: 150px;
            height: 150px;
            line-height: 150px;
            .qycloud {
                font-size: 57px;
            }
        }
    }
    .style-3 {
        width: 33.33%;
      &.grid-item{
        margin-bottom: 20px;
      }
      .grid-title{
        font-size: 14px;
        margin-top: 13px;
      }
        .grid-icon {
            width: 90px;
            height: 90px;
            line-height: 90px;
            .qycloud {
                font-size: 45px;
            }
        }
    }
    .style-4 {
        width: 25%;
      &.grid-item{
        margin-bottom: 20px;
      }
      .grid-title{
        font-size: 14px;
        margin-top: 13px;
      }
      .grid-icon {
        width: 40px;
        height: 40px;
        line-height: 40px;
        .qycloud {
          font-size: 26px;
        }
      }
    }
    .style-5 {
        width: 20%;
      &.grid-item{
        margin-bottom: 20px;
      }
      .grid-title{
        font-size: 14px;
        margin-top: 13px;
      }
        .grid-icon {
            width: 40px;
            height: 40px;
            line-height: 40px;
            .qycloud {
                font-size: 26px;
            }
        }
    }
}
</style>
