import { $http, encryptPassword } from '@commonbox/utils';

export async function login(userName, password) {
  if (
    userName === null
    || userName.length === 0
    || password === null
    || password.length === 0
  ) {
    throw new Error('账号和密码不能为空');
  }
  const {
    data: {
      status: loginInfoStatus,
      result: { authTokenKey, authAesIv, loginToken },
    },
  } = await $http.get('/api2/user/login/logindata');
  if (loginInfoStatus !== 200) {
    throw new Error('认证信息加载失败，请刷新页面');
  }
  const resData = await $http.post('/api2/user/login', {
    username: userName,
    password: encryptPassword(password, {
      loginToken,
      authAesIv,
      authTokenKey,
    }),
    token: loginToken,
    url: '/',
    ismobile: 'false',
    rememberMe: false,
  });

  const {
    data: {
      securityToken, refreshToken, status: loginStatus, msg,
    },
  } = resData;
  if (securityToken) localStorage.setItem('securityToken', securityToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

  if (loginStatus !== 200) {
    throw new Error(msg);
  }
}
