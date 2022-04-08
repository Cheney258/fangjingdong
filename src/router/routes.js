//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
// 路由配置
export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true },
        name: 'home',
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',
        // 路由组件能不能传递props数据?
        // 布尔值写法:params
        // props:true
        // 对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2}
        // 函数写法:可以传递params参数 query参数,通过props传递给路由组件
        // props:($route)=>{
        //     return {keyword:$route.params.keyword,k:$route.query.k}
        // }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: Detail,
        meta: { show: false }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: false }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: false }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: false },
        // 路由独享守卫
        beforeEnter:(to,from,next) =>{
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { show: false },
        // 路由独享守卫
        beforeEnter:(to,from,next) =>{
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: false }
    },
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { show: false },
        // 二级路由（子路由）
        children:[
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder,
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    //重定向,项目打开时展示的页面
    {
        path: '*',
        redirect: '/home'
    }
]