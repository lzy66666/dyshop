/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
<template>
  <el-main>
    <el-tabs v-model="activeTab" :value="activeTab" @tab-click="tabView" :before-leave="tableave">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
      </el-tab-pane>
      <router-view></router-view>
      <!-- <el-tab-pane label="SKU设置" name="SKU">
        <sku-setting></sku-setting>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="details">
        <shop-details></shop-details>
      </el-tab-pane>
      <el-tab-pane label="价格换算" name="money">
        <conversion></conversion>
      </el-tab-pane>
      <el-tab-pane label="采购相关" name="purchase">
        <purchase></purchase>
      </el-tab-pane> -->
    </el-tabs>
  </el-main>
</template>

<script>
// import draggable from 'vuedraggable'
// // 基本设置
// import basicSetting from '../../components/goods/basicSetting/basicSetting'
// // SKU设置
// import skuSetting from '../../components/goods/skuSetting/skuSetting'
// // 商品详情
// import shopDetails from '../../components/goods/details/details'
// // 价格换算
// import conversion from '../../components/goods/conversion/conversion'
// // 价格换算
// import purchase from '../../components/goods/purchase/purchase'

export default {
  data () {
    return {
      activeTab: 'basic',
      sku_data: '',
      tabList: [
        {name: 'basic', label: '基本设置'},
        {name: 'SKU', label: 'SKU设置'},
        {name: 'details', label: '商品详情'},
        {name: 'money', label: '价格换算'},
        {name: 'purchase', label: '采购相关'}
      ],
      goods_id: ''
    }
  },
  created () {
    this.getData()
  },
  // 阻止路由跳转
  // beforeRouteLeave (to, from, next) {
  //   console.log(111111111)
  //   console.log(to.fullPath)
  //   console.log(111111111)
  //   console.log(from)
  //   console.log(111111111)
  //   console.log(next)
  //   console.log(111111111)

  // },
  beforeRouteEnter (to, from, next) {
    let goods_id = to.params.goods_id
    console.log(to)
    let flag = false
    if (typeof (goods_id) === 'undefined') {
      flag = false
    } else {
      flag = true
    }
    if (flag || to.path == '/addGoods/basic') {
      next()
    } else {
      next({
        path: '/addGoods/basic'
      })
    }
    // next()
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    let goods_id = from.params.goods_id
    let flag = false
    if (typeof (goods_id) === 'undefined') {
      flag = false
    } else {
      flag = true
    }
    if (flag) {
      next()
    } else {
      next({
        path: '/addGoods/basic'
      })
    }
  },
  methods: {
    getData () {
      let goods_id = this.$route.params.goods_id
      // console.log(goods_id)
      // eslint-disable-next-line eqeqeq
      if (typeof (goods_id) != 'undefined' && goods_id != '') {
        this.goods_id = goods_id
      }
      // eslint-disable-next-line eqeqeq
      // console.log(typeof (goods_id) != 'undefined')
    },
    // tab切换
    tableave (tab) {
      // eslint-disable-next-line eqeqeq
      if (tab.name != 'basic' && this.goods_id == '') {
        this.$message({
          type: 'warning',
          message: '警告！请先添加商品基本设置'
        })
        this.activeTab = 'basic'
        return false
      }
    },
    tabView (tab, event) {
      switch (tab.name) {
        case 'basic':
          this.$router.push({
            path: 'basic',
            name: 'basicSetting',
            params: {
              goods_id: this.goods_id
            }
          })
          break
        case 'SKU':
          this.$router.push({
            path: 'skuSetting',
            name: 'skuSetting',
            params: {
              goods_id: this.goods_id
            }
          })
          break
        case 'details':
          this.$router.push({
            path: 'details',
            name: 'details',
            params: {
              goods_id: this.goods_id
            }
          })
          break
        case 'money':
          this.$router.push({
            path: 'conversion',
            name: 'conversion',
            params: {
              goods_id: this.goods_id
            }
          })
          break
        case 'purchase':
          this.$router.push({
            path: 'purchase',
            name: 'purchase',
            params: {
              goods_id: this.goods_id
            }
          })
          break
      }
      // let goodsId = sessionStorage.getItem('goods_id')
      // if (!goodsId || goodsId == null) {
      //   this.$message({
      //     type: 'error',
      //     message: '丢失商品ID，非法数据操作'
      //   })
      //   return
      // }
      // eslint-disable-next-line eqeqeq
      // if (tab.name == 'SKU') {
      //   // this.$router.push({
      //   //   path: 'addGoods/skuSetting'
      //   // })
      //   // this.axios.post('/Admin/Goods/getGoodsSKUList', {page: 1, goods_id: goodsId}).then(res => {
      //   //   // eslint-disable-next-line eqeqeq
      //   //   if (res.data.code == 1) {
      //   //     // this.sku_data = res.data.data.data
      //   //   }
      //   // })
      // }
    }
  }
  // components: {
  //   // 调用组件
  //   draggable,
  //   basicSetting,
  //   skuSetting,
  //   conversion,
  //   purchase,
  //   shopDetails
  // }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  background: rgb(255, 255, 255);
  padding: 10px 20px;
}

</style>
