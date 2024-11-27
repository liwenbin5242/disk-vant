<template>
    <div class="goods">
      <keep-alive></keep-alive>
      <van-skeleton title avatar :row="8" :loading="loadAgent">
        <van-swipe class="goods-swipe" :autoplay="3000" v-if="showBanner">
          <van-swipe-item v-for="banner in banners" :key="banner._id">
            <van-image :src="banner.img_url" />
          </van-swipe-item>
        </van-swipe>
        <van-grid :border="false" :column-num="5" v-if="showPics">
          <van-grid-item v-for="pic in pics" :key="pic._id">
            <van-image :src="pic.img_url" />
          </van-grid-item>
        </van-grid>
        <van-notice-bar
        v-if="notice"
          left-icon="volume-o"
          :text="notice"
        />
      </van-skeleton>
      <van-search
        v-model="searchvalue.name"
        show-action
        label=""
        placeholder="请输入你要搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <div class="list-con">
        <div class="top-con" v-if="!isSearch">
            <span v-for="(item ,index) in pathArr" :key="index" @click="getPath(item,index)">
                {{ item.name }} 
                <span v-if="index + 1 < pathArr.length"> > </span> 
            </span>
        </div>
        <div class="top-con" v-else>
            <span @click="goHome">全部文件></span>
            <span style="margin-left: 10px;">{{ searchWord }}</span>
        </div>
      </div>
      <div>
        <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
        <div v-else-if="loading== false && panList.length">
          <div class="item-con" v-for="(item,index) in panList" :key="index" >
            <div class="left"  @click="getIn(item)">
              <img v-if="!item.disk_id || item.is_folder" src="@/assets/imgs/dir.png" alt="" style="width:30px;height:30px;"/>
              <img v-if="item.category==1 && item.is_folder== false" src="@/assets/imgs/fileType.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <img v-if="item.category==2 && item.is_folder== false" src="@/assets/imgs/audio.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <img v-if="item.category==3 && item.is_folder== false" src="@/assets/imgs/img.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <img v-if="item.category==4 && item.is_folder== false" src="@/assets/imgs/文件类型-标准图-PDF文档.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <img v-if="item.category==5 && item.is_folder== false" src="@/assets/imgs/unknow.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <img v-if="item.category==6 && item.is_folder== false" src="@/assets/imgs/unknow.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <img v-if="item.category==7 && item.is_folder== false" src="@/assets/imgs/unknow.png" style="border-radius: none; width:22px;height:22px;padding: 4px;"/>
              <div class="file-name">
                  {{ item.title || item.name }}
              </div>
            </div>
            <div class="right" v-if="item.disk_id && isLogin" @click="getUrl(item)" >
              获取链接
            </div>
          </div>
        </div>
        <div v-else-if="loading== false && panList.length == 0">
          <van-empty description="暂无数据" />
        </div>
      </div>
      <van-popup round v-model="showPop" closeable close-icon="close">
        <div class="popover-con">
          <div class="line">
            <span style="color:#909399">分享链接：</span>
            <span class="url-style">
                <el-link :underline="false" type="primary" @click="openShareUrl(`${shareUrl}?pwd=${shareCode}`)"> {{ shareUrl }}?pwd={{shareCode}}</el-link>
            </span>
        </div>
      </div>
      </van-popup>
      <van-tabbar route fixed>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </template>
  
  <script>
 

  import { getAgentInfoApi } from '@/api/cors_v2'
  import { getPanList, getSearch, getTreeList, getShareUrl, getPermission, getFilesList} from '@/api/resource'
  import { getToken, getUsername} from '@/utils/token'
  import { CODE } from '@/config/public-config'
  import { Toast } from 'vant';
  export default {
    components: {},
    data() {
      return {
        loadAgent: false,
        active: '1',
        searchWord:'',
        code: CODE ||  window.location.hostname.slice(0,6),
        isLogin: false,
        isSearch: false,
        showBanner: false,
        showPics: false,
        banners: [],
        notice:'',
        pathArr:[{key:'', name:'全部文件',children:null, path:''},],
        pics:[],
        text:'双11最新活动，会员充值1年送1年仅需99',
        searchvalue: {
          name:''
        },
        showVideo: true,
        panList:[],
        shareUrl:'',
        shareCode:'',
        loading: false,
        finished: false,
        showPop: false,//是否展示
      };
    },
    created() {
       this.init()
    },
    activated() {
      this.getLoginStatus()
      this.getAgentInfo()
    },
    methods: {
      async init() {
        this.getLoginStatus()
        this.getAgentInfo()
        this.getMenu()
      },
      goHome() {
        this.getMenu()
        this.isSearch = false
        this.searchvalue.name = ''
      },
      getIcon(item) {
        if(!item.disk_id || item.is_folder) return '@/assets/imgs/dir.png'
        return require('@/assets/imgs/dir.png')
      },
      // 搜索
      async onSearch() {
        if(this.searchvalue.name) {
            this.isSearch = true
            const params = {
                code: this.code,
                key: this.searchvalue.name
            }
            getSearch(params).then(res => {
                this.searchWord = this.searchvalue.name
                this.panList = res.data.list
            })
        } else {
            this.searchWord = ''
            this.goHome()
        }
      },
      // 获取登陆状态
      getLoginStatus() {
        const token = getToken()
        if(token) {
          this.isLogin = true
        } else  {
          this.isLogin = false
        }
      }, 
      async getAgentInfo() {
        this.loadAgent = true
        const code = {code : this.code}
        const {data} = await getAgentInfoApi(code)
        this.loadAgent = false
        this.banners = data.banners.filter(banner => {return banner.position == 1})
        this.notice = data.notice
        if(this.banners.length) this.showBanner = true
        this.pics = data.banners.filter(banner => {return banner.position == 2})
        if(this.pics.length) this.showPics = true
      },
      async getMenu() {
        const params = {
            code: this.code
        }
        this.loading = true
        const {data} =  await getTreeList(params)
        this.loading = false
        this.panList = data.paths
      },
      getUrl(item) { //获取分享链接地址
        if(item.disk_id) {
            const params = {
                disk_id: item.disk_id,
                parent_path: item.parent_path,
                filename: item.server_filename,
                username: getUsername()
            }
            getShareUrl(params).then(res => {
                if(res.code == 0 ){
                    this.shareUrl = res.data.url
                    this.shareCode = res.data.code
                    this.showPop = true
                } else {
                    this.showPop = false
                }
            })
        }
      },
      getPath(item,index) { //点击title总目录进入该目录下
            this.pathArr = this.pathArr.slice(0,index+1)
            if(index==0) {
                this.getMenu()
            } else {
                if(item.key) {
                    this.getPan(item.key,`${item.path}/`)
                } else if(!item.key && item.children) {
                    this.panList = item.children
                } else if(!item.key && !item.children) {
                    this.getMenu()
                }
            }
        },
      getPan(disk_id, parent_path) { //从title路径下 进入某一文件夹下
            const params = {
                disk_id,
                parent_path
            }
            this.loading = true
            getPanList(params).then(res => {
                this.loading = false
                this.panList = res.data.list
            })
      },
      async getIn(item) { //进入目录下
            if(item.is_folder || !item.disk_id) { // 只有网盘目录或者自定义目录点击才可以获取进入下级目录
                this.pathArr.push({
                    key:item.disk_id,
                    name: item.title || item.name,
                    children: item.children || [],
                    path:item.path
                })
                if(item.disk_id){
                    this.panList = this.getPan(item.disk_id, `${item.path}/`)
                } else {
                    this.panList = item.children
                }
            } else {
                // 判断用户是否有播放权限
                let right = false
                if(this.isLogin) {
                  const res = await getPermission(item)
                  if(res && res.data && res.data.permission) right= true
                  if(item.category == 1) { // 视频
                        this.$router.push({name: 'video', params:  { disk_id: item.disk_id, path: item.path, free: right? false: true , username: res.data.username }} )
                    }
                    if(item.category == 2) { // 音频 
                        await getFilesList({dir:item.parent_path+'/', disk_id: item.disk_id,})
                        this.playAudio = true
                        this.audios=  this.panList.filter(e => {return e.category ==2})
                    }
                } else {
                  Toast.fail('请先登录')
                }
            }
        },
      openShareUrl(url) {
          window.open(url, '_blank');
      },
    }
  };
  </script>
  
  <style lang="less">
  .goods {
    flex: 1;
    padding-bottom: 50px;
    &-swipe {
      img {
        width: 100%;
        display: block;
      }
    }
  
    &-title {
      font-size: 16px;
    }
  
    &-price {
      color: #f44;
    }
  
    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }
  
    &-cell-group {
      margin: 15px 0;
  
      .van-cell__value {
        color: #999;
      }
    }
  
    &-tag {
      margin-left: 5px;
    }
    .van-grid-item__content {
      padding: 2px 2px;
    }
    .item-con {
        box-sizing: border-box;
        padding: 0 16px;
        color: #7888fc;
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        width: 100%;
        background-color: #fff;
        .left {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            align-items: center;
        }
        .file-name {
            font-size:14px;
            width:220px;
            overflow: hidden;       /* 超出的文本隐藏 */
            text-overflow: ellipsis;  /* 溢出部分显示省略号 */
            white-space: nowrap;     /* 文本在一行中，禁止换行 */
        }
        .right {
            font-size: 12px;
        }
    }
    .list-con {
        font-weight: 500;
        height: auto;
        font-size: 14px;
        .top-con {
            background-color: #f5f5f5;
            border-radius: 4px;
            font-weight: 500;
            padding: 8px 18px;
            margin-bottom: 10px;
            color:#7888fc;
        }
    }
    .popover-con {
        width: 300px;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .line {
            padding: 30px ;
        }
    }
    .url-style {
        color:#7888fc; 
        word-break: break-all;
    }
  }
  </style>
  