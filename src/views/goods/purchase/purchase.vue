<template>
  <el-form
    :model="purchaseFrom"
    :rules="purchaseRules"
    ref="purchaseFrom"
    class="demo-purchaseFrom"
    label-width="100px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="店铺名称" prop="seller_name">
          <el-input v-model="purchaseFrom.seller_name" autocomplete="off" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="采购网址" prop="pur_url">
          <el-input v-model="purchaseFrom.pur_url" autocomplete="off" placeholder="请输入采购网址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="purchaseFrom.mobile" autocomplete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="采购价" prop="pur_price">
          <el-input v-model="purchaseFrom.pur_price" autocomplete="off" placeholder="请输入采购价"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="purchaseFrom.remark" autocomplete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="footerBtn">
      <el-col :span="12">
        <el-button type="primary" @click="onSubmit('purchaseFrom')">保存</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      formLabelWidth: '120px',
      purchaseFrom: {
        goods_id: '',
        seller_name: '',
        pur_url: '',
        mobile: '',
        pur_price: '',
        remark: ''
      },
      purchaseRules: {
        seller_name: [{ required: true, message: '请输入成本价', trigger: 'blur' }],
        pur_url: [{ required: true, message: '请输入采购地址', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        pur_price: [{ required: true, message: '请输入采购价格', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.purchaseFrom.goods_id = this.$route.params.goods_id
      // eslint-disable-next-line eqeqeq
      this.axios.post('/Admin/Goods/getGoodsPurchase', {goods_id: this.purchaseFrom.goods_id}).then((res) => {
        console.log(res.data)
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 1) {
          let getGoodsData = res.data.data
          this.purchaseFrom = getGoodsData
          // nickname 参数对不上
          this.purchaseFrom.nickname = getGoodsData.goods_nickname
          // 销售标签赋值
          this.purchaseFrom.goods_labels = getGoodsData.tags
          // 是否使用赋值
          // eslint-disable-next-line eqeqeq
          if (getGoodsData.is_use == 1) {
            this.purchaseFrom.is_use = true
          } else {
            this.purchaseFrom.is_use = false
          }
          // cover图片赋值
          this.purchaseFrom.coverimage = getGoodsData.goods_head_img
          // 商品单位赋值
          this.purchaseFrom.goods_company = getGoodsData.goods_unit
          this.postType = 2
          this.purchaseFrom.goods_id = goods_id
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (!this.purchaseFrom.goods_id.length) {
          this.$message({
            type: 'error',
            message: '丢失商品ID，非法数据操作'
          })
          return
        }
        if (valid) {
          this.axios.post('/Admin/Goods/addGoodsPurchase', this.purchaseFrom).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.data.code == 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.footerBtn {
  text-align: center;
}
</style>
