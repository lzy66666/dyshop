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
        <!-- <el-breadcrumb separator="|">
          <el-breadcrumb-item v-for="(item,index) in classify" :key="item.Id"  :class="{'activeMenu':currentClass==index}">{{item.goods_class}}</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="classItem" v-for="(item,index) in classify" :key="item.Id"  :class="{'activeMenu':currentClass==index}" @click="selectClass(index)">{{item.goods_class}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-col :span="1">
          <div class="menu-title">TAG:</div>
        </el-col>
        <el-col :span="23">
        <div class="classItem" v-for="(item,index) in TGAlist" :key="item.Id"  :class="{'activeMenu':currentTag==index}" @click="selectTag(index)">{{item.tag_name}}</div>
        </el-col>
      </el-col>
    </el-row>
    <div class="goodsList" style="margin-top:15px;">
      <el-row :gutter="15">
        <el-col :span="4" v-for="item in goodsList" :key="item.Id">
          <el-card :body-style="{ padding: '20px 20px 0' }" shadow="hover">
            <div class="imgblock">
              <img :src="item.goods_head_img" class="image">
            </div>
            <div style="padding: 14px;">
              <span class="goodName">{{item.goods_nickname}}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="edit(item.Id)">修改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align:center;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
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
      classify: [
        {
          goods_class: '全部',
          Id: 0
        }
      ],
      TGAlist: [
        {
          tag_name: '全部',
          Id: 0
        }
      ],
      goodsList: [],
      currentPage: 1,
      currentClass: 0,
      currentTag: 0
    }
  },
  mounted () {
    // 拉取分类信息列表
    this.axios
      .post('/Admin/Goods/getGoodsClass', {})
      .then(res => {
        // console.log(res)
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 1) {
          this.classify = [...this.classify, ...res.data.data]
          console.log(this.classify)
        }
      })
      .catch(err => {
        console.log(err)
      })
    // 拉取TGA信息列表
    this.axios
      .post('/Admin/Goods/getGoodsTagList', {})
      .then(res => {
        // console.log(res)
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 1) {
          this.TGAlist = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
    this.getGoodsInfoList(1)
  },
  methods: {
    selectClass (index) {
      this.currentClass = index
    },
    selectTag (index) {
      this.currentTag = index
    },
    // 分页
    handleCurrentChange (val) {
      this.getGoodsInfoList(val)
    },
    getGoodsInfoList (page) {
      // 拉取商品信息列表
      this.axios
        .post('/Admin/Goods/getGoodsList', { page: page })
        .then(res => {
          console.log(res)
          // eslint-disable-next-line eqeqeq
          if (res.data.code == 1) {
            let getGoodsList = res.data.data.data
            if (getGoodsList == null) {
              this.$message({
                type: 'warning',
                message: '暂无数据'
              })
              return
            }
            this.goodsList = res.data.data.data
            this.currentPage = res.data.count
          } else {

          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 修改商品信息
    edit (id) {
      this.$router.push({
        path: '/addGoods/basic',
        name: 'basicSetting',
        params: {
          goods_id: id
        }
      })
    },
    addClassify () {
      this.$prompt('请输入分类', '添加提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S+$/,
        inputErrorMessage: '输入的不能为空'
      })
        .then(({ value }) => {
          this.axios
            .post('/Admin/Goods/addGoodsClass', { goods_class: value })
            .then(res => {
              console.log(res)
              // eslint-disable-next-line eqeqeq
              if (res.data.code == 1) {
                this.classify.push({
                  id: res.data.data.id,
                  goods_class: value
                })
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                console.log(this.classify)
              }
            })
            .catch(err => {
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
.el-main{
  background: #fff;
}
.classItem{
  float: left;
  font-size: 14px;
  line-height: 14px;
  color: #606266;
  padding:10px;
  cursor: pointer;
  &:first-child{
    margin-left: 0;
  }
}

.activeMenu{
  color: #66b1ff;
  border-bottom: 2px solid #66b1ff;
}

.menu-title {
  font-size: 14px;
  line-height: 1;
  padding: 10px 0;
}
.el-breadcrumb__inner,
.el-breadcrumb__item {
  cursor: pointer;
  color: red !important;
}
.goodsList {
  background: #fff;
  padding: 10px;
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
  .imgblock {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
  }
  .image {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .goodName {
    line-height: 23px;
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
