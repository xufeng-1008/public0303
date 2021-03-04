<template>
  <div>
    <div><input type="text" placeholder="账号" v-model="userName" /></div>
    <div><input type="password" placeholder="密码" v-model="password" /></div>
    <div><button v-on:click="onLoginBtnClick">登录</button></div>
  </div>
</template>

<script>
import { login } from './model';

export default {
  name: 'Login',
  data() {
    return {
      userName: null,
      password: null,
    };
  },
  methods: {
    async onLoginBtnClick() {
      try {
        await login(this.userName, this.password);
        this.$router.push('/');
      } catch (err) {
        // 401时token错误
        localStorage.removeItem('securityToken');
        alert(err.message);
      }
    },
  },
};
</script>
