//当前模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动接口：http://39.98.123.211/api/product/getBaseCategoryList
// 请求方式：get   参数 ： 无 
// 发请求:axios发请求返回的结果是Promise对象,获取三级菜单数据
// 切记：当前函数执行需要把服务器返回的结果返回
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner（Home首页的轮播图接口）
export const reqGetBannerList = () =>mockRequests.get('/banners')

// 获取floor组件 轮播图的数据（api）
export const reqFloorList = () =>mockRequests.get('/floors')

// 获取Search模块数据接口（API）地址：/api/list 请求方式：post 参数：需要带参数
/*
参数：
    {
        "category3Id": "61",
        "categoryName": "手机",
        "keyword": "小米",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
        "trademark": "4:小米"
}

*/
// 当前这个接口，给服务器传递参数params，params参数至少是个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params});

// 获取产品信息详情  接口 URL：/api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'});

// 将产品添加到购物车中，（获取更新某个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }  post 
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表数据接口
// 接口: http://39.98.123.211/api/cart/cartList  请求方式：get
export const reqCartList = ()=> requests({url:'/cart/cartList',method:'get'})

// 删除购物车商品的接口
// API:/api/cart/deleteCart/{skuId}   mothed:DELETE
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品选中的状态
// URL：/api/cart/checkCart/{skuId}/{isChecked} method：get
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get',})

// 获取验证码
// url:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户
// url:/api/user/passport/register method:post   参数：phone code password
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})

// 用户登录
// url:/api/user/passport/login  参数：phone，password  method：post
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

// 获取用户信息【需要带着用户的token向服务器请求用户信息
// url：/api/user/passport/auth/getUserInfo  method：get
export const reqUserInfo = () =>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
// url:/api/user/passport/logout  method:get
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
// url:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取结算页商品清单
// url:/api/order/auth/trade method:get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单
// url：/api/order/auth/submitOrder?tradeNo={tradeNo}  method：post
export const reqSubmitOrder =(tradeNo,data) =>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}  method:get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询支付订单状态
// url:/api/payment/weixin/queryPayStatus/{orderId}   method:get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 11. 个人中心我的订单列表
// url:/api/order/auth/{page}/{limit}   method:get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'}) 