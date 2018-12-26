<template>
  <el-main>
    <el-row style="margin-bottom:15px;">
      <el-button size="small" @click="addClassify">添加分类</el-button>
      <el-button size="small" @click="addGoods">添加商品</el-button>
    </el-row>
    <el-row>
      <el-col :span="1">
        <div class="menu-title">分类:</div>
      </el-col>
      <el-col :span="23">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item v-for="item in classify" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-col :span="1">
          <div class="menu-title">TAG:</div>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator="|">
            <el-breadcrumb-item v-for="item in TGAlist" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-col>
    </el-row>
    <div class="goodsList" style="margin-top:15px;">
      <el-row :gutter="15">
        <el-col :span="6" v-for="item in 30" :key="item">
          <el-card :body-style="{ padding: '20px' }" shadow="hover">
            <img
              src="https://img11.360buyimg.com/n7/jfs/t1/16031/29/2053/285252/5c18cee3E0fc6cd7f/1ea7592895fb34ae.jpg"
              class="image"
            >
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">商品的介绍</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date(),
      classify: [],
      TGAlist: ['全部', '女生', '高价', '布偶', '创意']
    }
  },
  mounted () {
    this.axios.post('/Admin/Goods/getGoodsClass', {}).then((res) => {
      console.log(res)
      // eslint-disable-next-line eqeqeq
      if (res.data.code == 1) {
        for (let i = 0; i < res.data.data.length; i++) {
          this.classify.push(res.data.data[i].goods_class)
        }
      }
    })
    this.axios.post('/Admin/Goods/getGoodsTagList', {}).then(res => {
      console.log(res)
      // eslint-disable-next-line eqeqeq
      if (res.data.code == 1) {
        console.log(res.data)
      }
    })
  },
  methods: {
    addClassify () {
      this.$prompt('请输入分类', '添加提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S+$/,
        inputErrorMessage: '输入的不能为空'
      })
        .then(({ value }) => {
          console.log(value)
          this.axios.post('/Admin/Goods/addGoodsClass', {goods_class: value}).then((res) => {
            console.log(res)
            // eslint-disable-next-line eqeqeq
            if (res.data.code == 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            }
          }).catch((err) => {
            console.log(err)
            this.$message({
              type: 'error',
              message: err
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    addGoods () {
      this.$router.push({
        path: '/addGoods'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-title {
  font-size: 14px;
  line-height: 1;
}
.el-breadcrumb__inner,
.el-breadcrumb__item {
  cursor: pointer;
}

.goods-item img {
  display: block;
  width: 100%;
  height: 350px;
  border: 1px solid #ddd;
}
.goods-item .name {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
.el-card {
  margin-bottom: 15px;
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: auto;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
