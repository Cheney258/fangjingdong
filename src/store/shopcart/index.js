import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";

const state = {
    cartList:[],
}

const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList();
        // // 测试能否请求到数据
        // console.log(result)
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某个商品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({getters,dispatch}){
        // context: 小仓库,commit【提交mutations修改state】,getters【计算属性】 dispatch【派发action】 state【当前仓库的数据】
        // console.log(context)
        // 获取购物车中全部的商品（是一个数组）
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId) : ''
            promiseAll.push(promise)
        });
        // Promise.all():只要全部的[p1,p2,...]都成功，返回的结果才成功
        // 否则，有一个失败，返回的结果就是失败的
        return Promise.all(promiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters

}