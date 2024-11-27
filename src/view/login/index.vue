
<template>
    <div  class="container">
      <nav class="nav-img" id="nav-img">
        <van-image src="https://img01.yzcdn.cn/vant/logo.png" style="height: 10rem" />
      </nav>
      <div class="login-form">
        <van-form :model="form" class="form">
          <van-row type="flex" justify="center">
            <van-col span="24">
              <van-field
              v-model="form.username"
              name="手机号"
              label="手机号"
              type="tel"
              placeholder="请输入手机号"
            />
            </van-col>
          </van-row>
          <van-row type="flex" justify="center">
            <van-col span="24">
              <van-field
              v-model="form.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
            />
            </van-col>
          </van-row>
        </van-form>
      </div>

      <div class="van-buttons">
        <van-button round block type="info" @click="handleLogin" style="width: 45%;">登录</van-button>
        <van-button round block type="info" @click="handleRegister" style="width: 45%;">注册</van-button>
      </div>
      <van-tabbar route fixed>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
</template>
  
<script>
import { userRegister, userLogin } from '@/api/cors_v2'
import { setToken,setUsername  } from '@/utils/token'
import { CODE } from '@/config/public-config'
import { Toast, Notify } from 'vant';
  export default {
    name: 'AppLayout',
    components: {
    },
    created() {
     
    },
    data() {
      return {
        active:'',
        form: {
          code: CODE|| window.location.hostname.slice(0,6),
          username: '',
          password: ''
        },
      }
    },
    methods: {
      // 注册
      async handleRegister() {
        // 验证账号密码
        if(this.validUsernamePassword()) {
          await userRegister(this.form)
          Notify({ type: 'success', message: '注册成功' });
        }
      },
      // 登录
      async handleLogin() {
        if(this.validUsernamePassword()) {
          const {data} = await userLogin(this.form)
          setToken(data.token)
          setUsername(data.username)
          this.$router.push('/home')
      }
      },
      validUsernamePassword() {
        const phoneRegex = /^(13|14|15|17|18|19)\d{9}$/;
        if (!phoneRegex.test(this.form.username)) {
          Toast.fail('请输入有效的手机号');
          return false
        }
        if ((this.form.password.length<6)) {
          Toast.fail('密码长度不能小于6位');
          return false
        }
        return true
      },
    }
  }
  </script>
  <style lang="less" scoped>
    .van-buttons {
      display: flex;
      justify-content: space-between;
      padding:1em 2em;
    }
    .login-form {
      margin-top: 5em;
    }
    .form {
      margin: 0;
    }
  .nav-img {
    width: 100%;
  }
  </style>
  