<template>
  <div
    class="label-page"
    ref="pageWrap">
    <ul ref="ulTab" class="ulTab">
      <li
        v-for="item in tagList"
        :class="{ active: currId === item.id }"
        :key="item.id"
        class="label-tag"
        ref="tabItem"
        @click="switchTag(item.id)"
      >
        <span>
          {{ item.name | textSubstr }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { textSubstr } from '../../common/textFilters';

export default {
  filters: {
    textSubstr,
  },
  props: {
    config: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currId: 0,
      tagList: [],
      imgShow: false,
    };
  },
  mounted() {
    const { appTab } = this.config;
    const appTabNames = this.config.app_tabNames;
    if (appTab.length === appTabNames.length) {
      // 标签封装
      for (let i = 0, { length } = appTab; i < length; i += 1) {
        this.tagList.push({ id: appTab[i], name: appTabNames[i] });
      }
    }
    // if (this.config.app_type === 'workflow') { // workflow时进行过滤
    //     this.tagList = this.tagList.filter(
    //         (item, index, arr) => item.name === '待办工作' || item.name === '经办工作' || item.name === '过往工作'
    //     );
    // }
    console.log('this.tagList', this.tagList);
    this.currId = this.tagList[0].id;
    this.$emit('getLabelId', this.currId);
    this.liScroll(); // 滚动初始化
    this.$nextTick(() => {
      if (this.$refs.ulTab.offsetWidth > 345) {
        // 判断内容宽度显示右侧阴影
        this.imgShow = true;
      } else {
        this.imgShow = false;
      }
    });
  },
  methods: {
    switchTag(id) {
      this.currId = id;
      this.$emit('getLabelId', id, true);
    },
    liScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.pageWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false, // 忽略竖直方向的滚动
            eventPassthrough: 'vertical',
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .label-page{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;
        overflow: hidden;
    .ulTab{
      display: inline-flex;
      flex-wrap: nowrap;
      flex-shrink: 0;
      touch-action: none;
      .label-tag {
        color: #999;
        font-size: 14px;
        padding: 0 10px 5px 10px;
        line-height: 16px;
        &.active {
          font-size: 16px;
          color: #333;
          font-weight: 500;
          span {
            border-bottom: 2px solid #4680ff;
          }
        }
        &:first-child{
          padding-left: 0;
        }
      }


    }
  }
/*.label-page {*/

/*    ul {*/
/*        display: inline-flex;*/
/*        flex-wrap: nowrap;*/
/*        flex-shrink: 0;*/
/*        height: 0.13rem;*/
/*        li {*/
/*            font-size: 0.13rem;*/
/*            color: #999999;*/
/*            border-left: 0.03rem solid #999999;*/
/*            padding-left: 0.05rem;*/
/*            margin-right: 0.28rem;*/
/*        }*/
/*        .active {*/
/*            color: #4680ff;*/
/*            border-left: 0.03rem solid #4680ff;*/
/*        }*/
/*        li:last-child {*/
/*            margin-right: 0;*/
/*        }*/
/*    }*/
/*    img {*/
/*        position: absolute;*/
/*        right: 0;*/
/*        width: 0.12rem;*/
/*        height: 0.24rem;*/
/*    }*/
/*}*/
</style>
