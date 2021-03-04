<template>
  <div
    class="todo-list-content">
    <div
      class="pop-content">
      <div
        class="pop-content-item"
        v-for="(item, index) in dataList"
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
    </div>
    <div
      v-if="total > 3"
      class="view-more">
      <p @click="viewMore">查看全部</p>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
// eslint-disable-next-line no-unused-vars
import MiniRefreshTools from 'minirefresh';
import jumpUrl from '../../common/jumpUrl';
import 'minirefresh/dist/debug/minirefresh.css';

export default {
  name: 'todo-list',
  props: ['dataList', 'config', 'total'],
  data() {
    return {
    };
  },
  methods: {
    // eslint-disable-next-line func-names,camelcase
    jumpUrl: debounce(function (workflow_id, instance_id, item) {
      const { config } = this;
      jumpUrl('detail', 'workflow', workflow_id, instance_id, config, item.menu_name, item.step_id);
    }, 300),
    // eslint-disable-next-line func-names
    jumpViewUrl: debounce(function (item) {
      jumpUrl('view', 'workflow', item.appId, item.id, this.config);
    }, 300),
    viewMore() {
      this.$emit('view-more');
    },
  },

};
</script>
<style lang="scss">
  .portal-menu-list-wrap  {
    .comment-wrap {
      .todo-list-content {
        .module-title-wrap {
          padding-left: 0;
        }
        .module-title-icon-wrap {
          padding-right: 0;
        }
      }
    }
  }
  .todo-list-content {
    display: flex;
    flex-direction: column;
    &.pop-mask {
      width: 100%;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #ffffff;
      transition: left 0.3s ease;
      overflow: hidden;
      z-index: 100;
      .pop-mask-top {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        z-index: 999;
        i {
          font-size: 24px;
          color: #bbc5d5;
          margin-top: 10px;
          margin-right: 14px;
        }
      }
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
    .pop-content-item {
      padding: 1px 14px;
      background: #fff;
      margin-top: 10px;
      &:first-child {
        margin-top:0;
      }
    }
  }
  .popup-window {
    padding: 10px;
    font-size: 12px;
    position: absolute;
    box-shadow: 0 1px 2px #cccccc;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    z-index: 5;
    background-color: #fff;
    right: 0;
    margin: 3px 20px 0 20px;
    transition: opacity 0.3s ease;
    opacity: 0;
    color: #666666;
  }
  .pop-show {
    opacity: 1;
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
