import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//三级联动组件----全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图全局组件
import Carousel from '@/components/carousel'
// 分页器
import Pagination from '@/components/Pagination'
// 引入MockServe.js---mock数据
import '@/mock/mockServe'
// 引入swiper轮播图样式
import 'swiper/css/swiper.css'
// 统一引入api文件里面的全部请求函数
import * as API from '@/api'
// 引入element组件（按需映入）
import { Button,MessageBox } from 'element-ui';
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
import atm from '@/assets/1.gif'
// 引入表单校验插件vee-validate
import '@/plugins/validate'

// 注册使用插件lazyload
Vue.use(VueLazyLoad,{
  // 懒加载默认图片
  loading: atm
})

//第一个参数:全局组件的名字,第二个参数:那个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 注册全局组件
Vue.component(Button.name, Button);
// 注册组件挂载在原型上，
// 弹框
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert




new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  //注册路由信息：当这里书写router得时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库store:组件实例的身上会多了一个属性$store
  store
}).$mount('#app')
