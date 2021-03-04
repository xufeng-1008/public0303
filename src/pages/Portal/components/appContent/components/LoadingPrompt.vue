<template>
  <div
    class="loading-prompt-style"
    v-if="loading || errorShow || noData">
    <i
      v-show="loading"
      class="qycloudiconfont icon-jiazaizhong" />
    <div
      v-show="errorShow"
      class="error-prompt">
      <i class="qycloudiconfont icon-jinggao" />
      <p class="error_tip">{{ message }}</p>
    </div>
    <p
      class="no_datas"
      v-show="noData">
      {{ tipMsg }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['loading', 'errorShow', 'noData', 'message', 'tipMsg'],
};
</script>

<style lang="scss" scoped>
.loading-prompt-style {
    position: relative;
  margin-top: 20px;
    .icon-jiazaizhong {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: #4680ff;
        animation: 1.5s loading linear infinite;
      font-size: 20px;
    }
    .error-prompt {
        line-height: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .icon-jinggao {
            display: flex;
            justify-content: center;
            font-size: 24px;
            color: #ff8c31;
        }
        .error_tip {
            display: flex;
            justify-content: center;
            color: #ff8c31;
            font-size: 11px;
            padding-top: 5px;
        }
    }
    .no_datas {
        color: #bbc5d5;
        font-size: 16px;
        text-align: center;
        padding-bottom: 15px;
    }
    @keyframes loading {
        0% {
            transform: translateX(-50%) rotate(0deg);
        }

        100% {
            transform: translateX(-50%) rotate(360deg);
        }
    }
}
</style>
