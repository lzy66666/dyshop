<template>
  <el-main>
    <el-tabs v-model="activeName2" @tab-click="tabView">
      <el-tab-pane label="基本设置" name="basic">
        <basic-setting></basic-setting>
      </el-tab-pane>
      <el-tab-pane label="SKU设置" name="SKU">
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
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import draggable from 'vuedraggable'
// 基本设置
import basicSetting from '../../components/goods/basicSetting/basicSetting'
// SKU设置
import skuSetting from '../../components/goods/skuSetting/skuSetting'
// 商品详情
import shopDetails from '../../components/goods/details/details'
// 价格换算
import conversion from '../../components/goods/conversion/conversion'
// 采购相关
import purchase from '../../components/goods/purchase/purchase'

export default {
  data () {
    return {
      activeName2: 'basic',
      sku_data: ''
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handlePreview (file) {
      console.log(file)
    },
    tabView (tab, event) {
      let goodsId = sessionStorage.getItem('goods_id')
      if (!goodsId || goodsId == null) {
        this.$message({
          type: 'error',
          message: '丢失商品ID，非法数据操作'
        })
        return
      }
      // eslint-disable-next-line eqeqeq
      if (tab.name == 'SKU') {
        this.axios.post('/Admin/Goods/getGoodsSKUList', {page: 1, goods_id: goodsId}).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.code == 1) {
            // this.sku_data = res.data.data.data
          }
        })
      }
    }
  },
  components: {
    // 调用组件
    draggable,
    basicSetting,
    skuSetting,
    conversion,
    purchase,
    shopDetails
  }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  background: rgb(255, 255, 255);
  padding: 10px 20px;
}

</style>
