import { mapActions } from 'vuex';
import store from '../../store';

export default {
  data() {
    return {
      loading: true,
      message: '',
      errorShow: false,
      noData: false,
      appTabId: 0,
      appConfig: {},
      dataList: [],
    };
  },
  store,
  methods: {
    ...mapActions(['getConfig']),
    getLabelId(id, isClick) {
      this.appTabId = id;
      this.loading = true;
      this.noData = false;
      this.errorShow = false;
      this.dataList = [];
      if (isClick) {
        this.keepWrapHeight();
      }
      if (Object.keys(this.appConfig).length > 0) {
        this._getListData();
        return;
      }
      this.getConfig(this).then((res) => {
        if (res.status !== 200 || !res.data.result) {
          this.fetchError();
          return;
        }
        this.appConfig = res.data.result;
        this._getListData();
      });
    },
    fetchError(err) {
      this.loading = false;
      this.errorShow = true;
      this.message = err || '接口异常';
    },
    keepWrapHeight(isEnd) {
      let $container;
      if (isEnd) {
        // eslint-disable-next-line no-unused-expressions
        $container && this.$nextTick(() => {
          $container.style.height = 'auto';
        });
        return;
      }
      // eslint-disable-next-line prefer-destructuring
      $container = document.getElementsByClassName('portal-warp')[0];
      $container.style.height = `${$container.scrollHeight}px`;
    },
  },
};
