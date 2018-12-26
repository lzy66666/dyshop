<template>
  <div>
    <el-form
      :model="conversion"
      :rules="conversionRules"
      ref="conversion"
      class="demo-conversion"
      label-width="100px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="成本价" prop="goods_cost">
            <el-input v-model="conversion.goods_cost" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="售价" prop="goods_price">
            <el-input v-model="conversion.goods_price" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="游戏券" prop="goods_game_ticket">
            <el-input v-model="conversion.goods_game_ticket" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动游戏券" prop="goods_activity_game_ticket">
            <el-input v-model="conversion.goods_activity_game_ticket" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="goods_integral">
            <el-input v-model="conversion.goods_integral" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="footerBtn">
      <el-col :span="12">
        <el-button type="primary" @click="onSubmit('conversion')">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      conversion: {
        goods_id: '',
        goods_cost: '',
        goods_price: '',
        goods_game_ticket: '',
        goods_activity_game_ticket: '',
        goods_integral: ''
      },
      conversionRules: {
        goods_cost: [{ required: true, message: '请输入成本价', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入售价', trigger: 'blur' }],
        goods_game_ticket: [{ required: true, message: '请输入游戏券', trigger: 'blur' }],
        goods_activity_game_ticket: [
          { required: true, message: '请输入活动游戏券', trigger: 'blur' }
        ],
        goods_integral: [{ required: true, message: '积分', trigger: 'blur' }]
      }
    }
  },
  created () {
    console.log(1)
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        this.conversion.goods_id = sessionStorage.getItem('goods_id')
        if (!this.conversion.goods_id.length) {
          this.$message({
            type: 'error',
            message: '丢失商品ID，非法数据操作'
          })
          return
        }
        if (valid) {
          this.axios.post('/Admin/Goods/addGoodsPrice', this.conversion).then((res) => {
            console.log(res)
            // eslint-disable-next-line eqeqeq
            if (res.data.code == 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            }
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
