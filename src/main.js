import Vue from 'vue';
import App from './App';
import { router } from './router';
import ElementUI from 'element-ui' 
import { 
  Tabbar, 
  Toast ,
  TabbarItem,
  Image as VanImage, 
  NavBar, 
  Form , 
  Field, 
  Button,
  Row,
  Col,
  NumberKeyboard ,
  Search,
  Grid,
  GridItem,
  Swipe,
  SwipeItem,
  NoticeBar,
  List,
  Cell,
  CellGroup,
  Icon,
  Popover,
  Notify,
  ShareSheet,
  Popup,
  Loading,
  Empty,
  Skeleton,
  Dialog,
  Sticky
  } from 'vant';
import "./assets/font/iconfont.css"
Vue.use(Row).use(Col).use(Button).use(Tabbar).use(TabbarItem).use(Form).use(Field).use(NavBar).use(VanImage).use(Toast).use(NumberKeyboard).use(Search).use(Grid).use(GridItem).use(Swipe).use(SwipeItem).use(NoticeBar).use(List).use(Cell).use(CellGroup).use(Icon).use(Popover).use(Notify).use(ShareSheet).use(Popup).use(Loading).use(Empty).use(Skeleton).use(Dialog).use(Sticky);



Vue.use(ElementUI);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
