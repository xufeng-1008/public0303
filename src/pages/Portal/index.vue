<template>
  <div class="portal-warp" >
    <portal-menu-list />
  </div>
</template>

<script>
import store from './store';
import PortalMenuList from './components/PortalMenuList.vue';

export default {
  name: 'portal-wrap',
  store,
  components: {
    PortalMenuList,
  },
  props: {

  },
  data() {
    return {
      spaceId: '',
    };
  },

  created() {
    this.getSpaceId();
  },
  mounted() {
  },

  methods: {
    getSpaceId() {
      this.spaceId = window.globalConfig.user.entId; // todo 用户信息从配置获取
      const spaceId = this.spaceId || this.$router.query.spaceId;
      console.log('spaceId', spaceId);
      if (spaceId) {
        this.$store.commit('updateSpaceId', spaceId);
      }
    },
  },

};
</script>

<style  lang="scss">
  @import "./portal";


</style>
