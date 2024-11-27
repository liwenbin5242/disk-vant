template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" :active-icon="activeIcon('home')" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="setting-o" :active-icon="activeIcon('setting')" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      icons: {
        home: { normal: 'home-o', active: 'home' },
        setting: { normal: 'setting-o', active: 'setting' },
      },
    };
  },
  methods: {
    activeIcon(icon) {
      return this.active === Object.keys(this.icons).indexOf(icon)
        ? this.icons[icon].active
        : this.icons[icon].normal;
    },
  },
};
</script>