<template>
  <div>
    <img class="user-poster" src="@/assets/imgs/a.jpeg">
    <van-cell-group class="user-group">
      <van-cell icon="contact" title="用户名" :value="user.username"  />
      <van-cell icon="contact" title="会员等级" :value="user.level"  />
      <van-cell icon="points" title="剩余学币" :value="user.coins"  is-link />
      <van-cell icon="vip-card" title="会员到期时间"  :value="user.expires" is-link />
      <van-cell icon="records" title="观看记录" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="coupon" title="卡密兑换" is-link  @click="redeemCDkey" />
      <van-cell icon="gold-coin" title="充值" is-link />
      <van-cell icon="share" title="分享" is-link @click="showShare = true" />
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </van-cell-group>
    <van-popup v-model="showRedeem" round position="bottom" :style="{ height: '20%' }" >
      <van-field
        v-model="cdkey"
        center
        clearable
        label="卡密"
        placeholder="请输入卡密"
      >
        <template #button>
          <van-button size="small" type="primary" @click="exchangeKey">确定</van-button>
        </template>
      </van-field>
    </van-popup>
    <van-button type="danger" block @click="handleLogout">退出登录</van-button>
    <van-tabbar route fixed>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { isLogin, getUsername, removeToken,   } from '@/utils/token'
import {  getUserInfo, dokey, doLogout } from '@/api/cors_v2'
import moment from 'moment';
import { CODE } from '@/config/public-config'
export default {
  components: { },
  created() {
       this.init()
  },
  data() {
    return {
      code: CODE|| window.location.hostname.slice(0,6),
      showShare: false,
      showRedeem: false,
      username: getUsername(),
      cdkey:'',
      user:{
        username: "",
        level: "",
        coins:'',
        expires:''
      },
      options: [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    };
  },
  methods: {
    async init() {
      if(!isLogin()) {
        this.$router.push('/login')
      } else {
        const {data} = await getUserInfo({username: this.username})
        this.user = {
          username: data.username,
          coins: data.coins,
          level: data.level == 1 ? '普通会员':'期限会员',
          expires: moment(data.expires).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    async exchangeKey() {
      const params = {
        key: this.cdkey,
        username:this.username
      }
      const { code } = await dokey(params)
      if(code ==0) {
        Toast.success('卡密验证完成')
        this.init()
        this.showRedeem = false
      } else {
        Toast.fail('卡密验证失败,请核对后再试')
      }
    },
    redeemCDkey() {
      this.showRedeem = true
    },
    handleLogout() {
      Dialog.confirm({
        title: '',
        message: '确认退出账号吗',
      })
        .then(() => {
          doLogout({code: this.code}).then((res) => {
            res
            removeToken()
            this.$router.push('/login')
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    onSelect() {

    }
  },
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
  .van-button--block {
      width: 90%;
    }
  .van-button {
    margin: auto;
    margin-top: 5px;
  }
  .van-button--danger {
    color: red;
    background-color: white;
    border: #fff;
    border-radius: 30px;
  }
</style>
