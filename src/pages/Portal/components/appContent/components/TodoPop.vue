<template>
  <div
    class="todo-pop-wrap"
    ref="todoList">
    <div
      class="pop-mask-top">
      <i class="qycloudiconfont icon-guanbiquanping"
         @click="hideMore" />
    </div>
   <div class="todo-pop-content-wrap">
     <div class="todo-pop-content">
       <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
         <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="onLoad"
           class="module-item-list"
         >
           <div
             class="module-item-wrap"
             v-for="(item, index) in currtList"
             :key="index">
             <div class="module-title-wrap">
               <div
                 class="module-title"
                 @click="jumpViewUrl(item)">
                 <span class="app-name">{{ item.appName }}</span>
                 <span class="todo-num-wrap">
                  <span class="todo-num" :style="{ 'background-color': item.appTodoCountColor }">{{ item.workCount > 99 ? '99+' : item.workCount}}</span>
                </span>
               </div>
               <span class="module-title-icon-wrap">
                <i
                  class="qycloudiconfont icon-youcejiantou"
                  @click="jumpViewUrl(item)" />
              </span>
             </div>
             <div
               class="todo-content"
               v-for="(itemList, indexList) in item.data"
               :key="indexList"
               @click="jumpUrl(itemList.workflow_id, itemList.instance_id,itemList)">
               <div class="content">
                 <div class="task-name">{{ itemList.title }}</div>
                 <div class="task-status">
                   <i
                     class="qycloudiconfont icon-weituo1"
                     v-if="
                      itemList.comissioned_to.status &&
                        itemList.comissioned_to.is_comissioned_me === false
                    "
                   />
                   <i
                     class="qycloudiconfont icon-beiweituo"
                     v-if="itemList.comissioned_to.status && itemList.comissioned_to.is_comissioned_me"
                   />
                   <i
                     class="qycloudiconfont icon-chaoshi"
                     v-if="itemList.deadline.is_chaoshi"
                     @click.stop="handleStatus(itemList.node_id, itemList.deadline.chaoshi_text, 'chaoshi')"
                   />
                   <i
                     class="qycloudiconfont icon-cuiban"
                     v-if="itemList.message.length > 0"
                     @click.stop="handleStatus(itemList.node_id, itemList.message[0], 'cuiban')"
                   />
                 </div>
               </div>
               <div class="information">
                 <p>{{ itemList.step_title }}</p>
                 <p>{{ itemList.update_at }}</p>
                 <p>{{ itemList.start_handler }}</p>
               </div>
             </div>
           </div>
         </van-list>
       </van-pull-refresh>
     </div>
   </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
// eslint-disable-next-line no-unused-vars
import MiniRefreshTools from 'minirefresh';
import jumpUrl from '../../common/jumpUrl';
import { getTodoList } from '../../../store';
import 'minirefresh/dist/debug/minirefresh.css';

export default {
  props: ['config', 'flag', 'componentType', 'count'],
  data() {
    return {
      popShow: false,
      currtList: [],
      message: '',
      type: '',
      total: 0,
      pages: 1,
      limit: 5,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
      getTodoList(this)
        .then((res) => {
          if (this.refreshing) {
            this.currtList = [];
            this.refreshing = false;
          }
          if (res.data.code === 200 && Array.isArray(res.data.result.data)) {
            const { result } = res.data;
            this.total = result.total;
            this.currtList.push(...result.data);
            this.loading = false;
            const { length } = this.currtList;
            if (this.total > length) {
              this.pages += 1;
            } else {
              this.finished = true;
            }
          }
        }).catch(() => {
          this.loading = false;
          this.finished = true;
        });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // eslint-disable-next-line func-names,camelcase
    jumpUrl: debounce(function (workflow_id, instance_id, item) {
      const { config } = this;
      jumpUrl('detail', 'workflow', workflow_id, instance_id, config, item.menu_name, item.step_id);
    }, 300),
    // eslint-disable-next-line func-names
    jumpViewUrl: debounce(function (item) {
      jumpUrl('view', 'workflow', item.appId, item.id, this.config);
    }, 300),
    getData() {
      if (this.componentType === 'dialog') {
        // todo 这个下拉组件有点问题
        this.currtList = [];
        // eslint-disable-next-line no-undef
        this.miniRefresh = new MiniRefresh({
          container: this.$refs.popContent,
          isScrollBar: false,
          down: {
            isLock: true,
          },
          up: {
            contentnomore: '已全部加载完毕...',
            isAuto: false,
            callback: () => {
              console.log('pullup pop');
              getTodoList(this)
                .then((res) => {
                  if (res.data.code === 200 && Array.isArray(res.data.result.data)) {
                    const { result } = res.data;
                    this.total = result.total;
                    this.currtList.push(...result.data);
                    const { length } = this.currtList;
                    if (this.total > length) {
                      this.pages += 1;
                    } else if (this.total <= length || result.data.length === 0) {
                      this.miniRefresh.endUpLoading(true);
                    }
                  } else {
                    this.miniRefresh.endUpLoading(true);
                  }
                }).catch(() => {
                  this.miniRefresh.endUpLoading(true);
                });
            },
          },
        });
      }
    },
    hideMore() {
      this.$emit('close');
    },
  },
  mounted() {
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleListener);
  },
};
</script>
<style lang="scss">
  .appcontent-wrap .todo-pop-content-wrap .module-title-icon-wrap{
    padding-right: 0!important;
  }
  .todo-pop-wrap {
  position: relative;
  height: 100vh;
  overflow: hidden;
  .pop-mask-top {
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    z-index: 999;
    right: 0;
    i {
      font-size: 24px;
      color: #bbc5d5;
      margin-top: 10px;
      margin-right: 14px;
    }
  }
  .todo-pop-content-wrap {
    position: relative;
    height: 100%;
    overflow: auto;
    padding-top: 15px;
  }
  .todo-pop-content {
    .module-item-list{
    }
    .module-item-wrap{
      padding: 0 14px 2px;
      background: #fff;
      margin-bottom: 10px;
    }
    .module-title {
      display: flex;
      .app-name {}
      font-weight: 500;
      color: #333;
      .todo-num-wrap {
        margin-top: -2px;
        padding-left: 5px;
      }
      .todo-num {
        text-align: center;
        font-size: 12px;
        padding: 0 8px;
        border-radius: 12px;
        color: #fff;
      }
    }
    .todo-content {
      margin-bottom: 25px;
      .content {
        display: flex;
        justify-content: space-between;
        .task-name {
          color: #333333;
          font-size: 16px;
          font-weight: 500;
        }
        .icon-weituo {
          color: #4680ff;
        }
        .icon-beiweituo {
          color: #4680ff;
        }
        .icon-chaoshi {
          color: #ff8c31;
        }
        .icon-cuiban {
          color: #4680ff;
        }
      }
      .information {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        p {
          font-size: 12px;
          color: #9a9a9a;
        }
      }
    }
    .module-title-wrap {
      padding-left: 0 !important;
    }
  }
}

.loading, .no-more {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: #bbc5d5;
    background-color: #f6f7f9;
    padding: 10px 0;
}
@keyframes loadings {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
