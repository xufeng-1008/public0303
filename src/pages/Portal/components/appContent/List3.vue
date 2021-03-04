<template>
  <div class="app-content-list3">
    <loading-prompt
      class="loading-prompt"
      :loading="loading"
      :error-show="errorShow"
      :no-data="noData"
      :message="message"
      :tip-msg="tipMsg"
    />
    <todo-list
      :data-list="dataList"
      :config="config"
      :total="total"
      @view-more="openTodoMoreList"
    >
    </todo-list>
    <van-popup
      class="todo-popup"
      v-model="popShow"
      position="right"
      :style="{ height: '100%',width:'100%' }"
    >
      <todo-pop
        :data-list="viewList"
        component-type="dialog"
        :count="total"
        :config="config"
        @close="hideMore"
      >
      </todo-pop>
    </van-popup>

  </div>
</template>

<script>
import TodoPop from './components/TodoPop.vue';
import todoList from './components/todoList.vue';
import LoadingPrompt from './components/LoadingPrompt.vue';
import AppContentMiXin from './AppContentMiXin';
import { getTodoList } from '../../store';

export default {
  components: {
    todoList,
    TodoPop,
    LoadingPrompt,
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
      dataListLength: 0,
      viewList: [],
      popShow: false,
      todoData: {},
      flag: false,
      pages: 1,
      tipMsg: '工作已处理完，行动力超赞！',
      total: 0,
    };
  },
  mounted() {
    this.getData();
    console.log(111111, this.config);
  },
  methods: {
    getData() {
      getTodoList(this)
        .then((res) => {
          this.loading = false;
          if (res.data.code === 200 && Array.isArray(res.data.result.data)) {
            this.total = res.data.result.total;
            this.dataListLength = res.data.result.data.length;
            if (res.data.result.data.length > 0) {
              this.dataList = res.data.result.data.slice(0, 3);
              this.viewList = res.data.result.data;
            } else {
              this.noData = true;
            }
          } else {
            this.errorShow = true;
            this.message = '数据暂无权限或已被删除';
          }
        })
        .catch((err) => {
          this.fetchError(err);
        });
    },
    openTodoMoreList() {
      this.popShow = true;
    },
    hideMore() {
      this.popShow = false;
    },
  },
};
</script>
<style lang="scss">
  .app-content-list3 {
    margin: 0 -14px;
    .view-more {
      display: flex;
      justify-content: center;
      padding: 10px 0;
      width: 100%;
      background: #fff;
      p {
        padding: 0 16px;
        text-align: center;
        font-size: 13px;
        border-radius: 16px;
        border: 1px solid #bbc5d5;
        line-height: 32px;
        color: #596b89;
      }
    }
    .todo-popup {
      background: #f1f2f4;
    }

  }
</style>
