//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
// 引进路由配置
import routes from './routes'
// 引入store
import store from '@/store'


//先备份VueRouter原型对象的push方法,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数:告诉原来的push方法,你往哪里跳转(传递那些参数)
//call和apply区别
//相同点:都可以调用函数一次.都可以篡改上下文一次(this)
//不同点:call和apply传递参数:call传递参数用逗号隔开.apply方法执行,传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {    //如果参数有成功或者失败的回调,执行原方法
        originPush.call(this, location, resolve, reject)
    } else {                    //如果参数没有成功或者失败的回调,执行回调为空的方法
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {     //如果参数有成功或者失败的回调,执行原回调方法
        originReplace.call(this, location, resolve, reject)
    } else {                     //如果参数没有成功或者失败的回调,执行回调为空的方法
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    // 路由滚动行为，跳转新路由时，滚动条置顶展示
    scrollBehavior(to, from, savedPosition) {
        // y:0 ,代表滚动条在最上方
        return { y: 0 }
    }
})

// 全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到跳转到那个路由的信息
    // from：可以获取哪里来的路由信息
    // next:放行函数 
    // next()全部放行 || next('/login')放行到指定的路由 || next(false) 中断当前导航，重置到from来时的路由
    next()
    // 用户登陆状态，才有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户已经登陆了
    if (token) {
        // 登录状态下，无法跳转到login页面
        if (to.path == '/login') {
            next('/')
        }else{          // 登陆状态，要跳转的不是login
            // 如果用户名已有
            if (name) {
                next()
            }else{  // 没有用户信息，派发actions让仓库存储用户信息跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效获取不到用户信息，清除token，重新登录
                    await store.dispatch('userLogout')
                    next('/login')

                }
            }
        }
    }else{
        // 未登录状态:不能跳转到交易、支付，个人中心相关页面
        // 点击路由时统一跳转到登陆页面
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登陆时的想去而没去城的地址存储于地址栏中【路由】
            next('/login?redirect='+toPath)
        }else{
            // 跳转到其他路由，方法
            next()
        }
    }
    
})


export default router