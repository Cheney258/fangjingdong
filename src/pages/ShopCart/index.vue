<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" 
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart,$event)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input 
              autocomplete="off" 
              type="text" minnum="1" 
              class="itxt" 
              :value="cart.skuNum" 
              @change="handler('change',$event.target.value*1,cart)"
            >
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.cartPrice * cart.skuNum}}.00元</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}.00元</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    methods:{
      // 获取个人购物车数据
      getData(){
        this.$store.dispatch('getCartList')
      },
      // 修改某个商品的数量[节流]
      handler:throttle(async function(type,disNum,cart){
        // type参数: 为了区分三个元素
        // disNum形参三种可能的值：-1 ， +1 ， input输入展示的量（不是变化量）
        // cart参数：为了获取商品的ID
        // 向服务器发请求，修改数量，派发dispatch
        switch (type){
          case 'add':
            disNum = 1
            break
          case 'minus':
            disNum = cart.skuNum > 1 ? -1 : 0
            break
          case 'change':
            // 用户输入非法值【汉字 || 负数】
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0
            }else{
              // 正常情况【但是 是非整数】
              disNum = parseInt(disNum) - cart.skuNum
            }
            // disNum = (isNaN(disNum) || disNum < 1) ? 0 :parseInt(disNum) - cart.skuNum
            break
        }
        // 派发actions
        try {
          // 代表的时修改成功
          await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum,})
          // 再次获取服务器最新数据进行展示
          this.getData()
        } catch (error) {
          
      }
      },600),
      async deleteCartById(cart){
        try {
          // 如果成功再发请求获取最新数据进行展示
          await this.$store.dispatch('deleteCartListBySkuId',cart.skuId)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改某一商品的勾选状态
      updateChecked(cart,event){
        try {
        // 带给服务器的isChecked参数不能时布尔值，应该是“0”||“1”
        let isChecked = event.target.checked ? "1" : "0"
        this.$store.dispatch('updateCheckedById',{skuId:cart.skuId,isChecked})
        // 如果数据修改成功，再次请求最新数据进行展示
        this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除全部选中的商品
      async deleteAllCheckedCart(){   // 该回调函数无法找到有用的数据
        try {
          await this.$store.dispatch('deleteAllCheckedCart')
          // 再发请求获取最新数据进行展示
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改全部产品的选中状态
      async updateAllCartChecked(event){
        try {
          let isChecked = event.target.checked ? "1" : "0"
          // 派发action
          await this.$store.dispatch('updateAllCartIsChecked',isChecked)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    computed:{
      ...mapGetters(['cartList']),
      // 购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList || []
      },
      // 购物车商品的总价
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice
        });
        return sum
      },
      // 判断底部复选框是否勾选【全部商品都选中才勾选】
      isAllCheck(){
        // 遍历cartList里的每一个isChecked 是否为1，全部是 1 返回true
        return this.cartInfoList.every((item)=>item.isChecked == 1) && this.cartInfoList.length>0
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>