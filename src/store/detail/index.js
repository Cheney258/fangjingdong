import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
// 封装的是临时的游客身份的模块uuid----生成一个唯一的随机的字符串
import { getUUID } from '@/utils/uuid_token.js'


const state = {
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID(),
}

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
} 

const actions = {
    // 获取茶品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO',result.data)
        }
    },
    // 将产品信息添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 将数据参数带个服务器，服务器写入数据成功，并且没有返回其他数据
        // 返回code==200，代表此次操作成功
        // 服务器没有返回数据，因此不需要三连存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 该函数成功执行，返回一个Promise对象
        if(result.code == 200){
            // 代表加入购物车成功
            return 'ok'
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile!'))
        }
    }
} 

const getters = {
    // 路径导航简化的数据
    categoryView(state){
        // state.goodInfo初始状态是空对象，空对象的categoryView属性值是undefined
        // 当前计算的属性值categoryView至少是一个空对象
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    },
}


export default {
    state,
    mutations,
    actions,
    getters
}