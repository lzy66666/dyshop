<template>
  <el-main>
    <el-tabs v-model="activeTab" :value="activeTab" @tab-click="tabView" :before-leave="tableave">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
      </el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </el-main>
</template>

<script>

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
    this.$bus.$on('goodsParams', (res) => {
      this.goods_id = res.busGoodsId
      this.pageType = res.pageType
      console.log(res)
    })
  },
  // 导航守卫，如果没有传入goods_id不允许进入商品后续页面只能跳转到基本设置
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
  },
  beforeRouteUpdate (to, from, next) {
    let goods_id = this.goods_id
    let flag = false
    if (typeof (goods_id) === 'undefined' || this.goods_id == '') {
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
              goods_id: this.goods_id,
              pageType: this.pageType
            }
          })
          break
        case 'SKU':
          this.$router.push({
            path: 'skuSetting',
            name: 'skuSetting',
            params: {
              goods_id: this.goods_id,
              pageType: this.pageType
            }
          })
          break
        case 'details':
          this.$router.push({
            path: 'details',
            name: 'details',
            params: {
              goods_id: this.goods_id,
              pageType: this.pageType
            }
          })
          break
        case 'money':
          this.$router.push({
            path: 'conversion',
            name: 'conversion',
            params: {
              goods_id: this.goods_id,
              pageType: this.pageType
            }
          })
          break
        case 'purchase':
          this.$router.push({
            path: 'purchase',
            name: 'purchase',
            params: {
              goods_id: this.goods_id,
              pageType: this.pageType
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
