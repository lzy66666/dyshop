<template>
  <div>
    <el-table :data="skuData" border style="width: 100%">
      <el-table-column type="index" label="编号" width="80" align="center"></el-table-column>
      <el-table-column prop="goods_sku_code" label="SKU编号" align="center"></el-table-column>
      <el-table-column prop="goods_sku_name" label="SKU名称" align="center"></el-table-column>
      <el-table-column prop="goods_sku_color" label="颜色" align="center"></el-table-column>
      <el-table-column prop="goods_sku_head_img" label="首图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.goods_sku_head_img" class="image">
        </template>
      </el-table-column>
      <el-table-column prop="goods_sku_total_num" label="库存" align="center"></el-table-column>
      <el-table-column prop="goods_sku_is_use" label="可用状态" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.goods_sku_is_use"></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center" >
        <template slot-scope="scope">
          <el-button @click="edit(scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click="add" type="text" size="small">新增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="add">新增</el-button>
    <el-dialog
      :title="sku_page_type== 1?'新增SKU':'SKU修改'"
      :visible.sync="skuPanelStatus"
      width="30%"
      center
    >
      <el-form :model="sku_form">
        <el-form-item label="SKU名称" label-width="100px">
          <el-input v-model="sku_form.goods_sku_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="SKU编号" label-width="100px">
          <el-input v-model="sku_form.goods_sku_code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="颜色" label-width="100px">
          <el-input v-model="sku_form.goods_sku_color" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" label-width="100px">
          <el-input v-model="sku_form.goods_sku_total_num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="首图" label-width="100px">
          <div class="coverImg">
            <img
              :src="sku_form.goods_sku_head_img"
              class="avatar"
              v-if="sku_form.goods_sku_head_img!=''"
              @click="openResources"
            >
            <i class="el-icon-plus coverimage-icon" @click="openResources" v-else></i>
          </div>
        </el-form-item>
        <el-form-item label="可用状态" label-width="100px">
          <el-switch v-model="sku_form.goods_sku_is_use" ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="skuPanelStatus = false">取 消</el-button>
        <el-button type="primary" @click="skuSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="资源管理"
      :visible.sync="coverImgStatus"
      width="1200px"
      center
      class="folderPanel"
    >
      <v-resources :folderList="folderList" :folderMenuData="folderMenuData" :max="1" :selectImgInfo="[sku_form.goods_sku_head_img]" v-on:callBack="imgUrlBack"></v-resources>
    </el-dialog>
  </div>
</template>

<script>
import vResources from '../resources/resources'
export default {
  data () {
    return {
      sku_form: {
        goods_id: '',
        goods_sku_code: '',
        goods_sku_color: '',
        goods_sku_head_img: '',
        goods_sku_total_num: '',
        goods_sku_is_use: false,
        goods_sku_name: ''
      },
      sku_page_type: 1,
      skuData: [],
      flieType: 1,
      folderNameList: [],
      folderList: [],
      folderMenuData: [],
      skuPanelStatus: false,
      coverImgStatus: false
    }
  },
  created () {
    this.sku_page_type = this.$route.params.pageType
    this.sku_form.goods_id = this.$route.params.goods_id
    // 如果等于2属于修改商品参数，拉取商品参数否则属于添加
    if (this.sku_page_type == 2) {
      this.axios.post('/Admin/Goods/getGoodsSKUList', {goods_id: this.sku_form.goods_id, page: 1}).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          if (res.data.data.data != null) {
            this.skuData = res.data.data.data
          }
        }
      })
    }
  },
  methods: {
    // 添加sku
    add () {
      this.skuPanelStatus = true
      this.sku_page_type = 1
      let createFrom = {
        goods_id: this.$route.params.goods_id,
        goods_sku_code: '',
        goods_sku_color: '',
        goods_sku_head_img: '',
        goods_sku_total_num: '',
        goods_sku_is_use: false,
        goods_sku_name: ''
      }
      this.sku_form = createFrom
    },
    // 编辑sku
    edit (index) {
      this.sku_form = JSON.parse(JSON.stringify(this.skuData[index]))
      this.sku_form.index = index
      this.sku_form.goods_sku_id = this.sku_form.Id
      this.skuPanelStatus = true
      this.sku_page_type = 2
    },

    // SKU发送数据
    skuSubmit () {
      let postUrl = ''
      // eslint-disable-next-line eqeqeq
      if (this.sku_page_type == 1) {
        postUrl = '/Admin/Goods/addGoodsSKU'
      } else {
        postUrl = '/Admin/Goods/saveGoodsSKU'
        // this.sku_form.goods_sku_id = this.sku_form.Id
      }
      this.axios.post(postUrl, this.sku_form).then(res => {
        this.skuPanelStatus = false
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 1 && this.sku_page_type == 1) {
          let data = this.sku_form
          this.skuData.push(data)
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        // eslint-disable-next-line eqeqeq
        } else if (res.data.code == 1 && this.sku_page_type == 2) {
          this.$set(this.skuData, this.sku_form.index, this.sku_form)
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },
    // 打开资源列表
    openResources () {
      this.flieType = 1
      this.folderNameList = []
      this.axios
        .post('/Admin/Resource/getDirList', {})
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.code == 1) {
            var dataMsg = res.data.data.data
            this.folderList = dataMsg
            this.folderMenuData = dataMsg
          }
        })
      this.coverImgStatus = true
    },
    // 资源列表回调函数
    imgUrlBack (data) {
      this.sku_form.goods_sku_head_img = data.coverimage
      this.coverImgStatus = data.coverImgStatus
    }
  },
  components: {
    vResources
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 100px;
  height: 100px;
}
.iconBtn {
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
}

.coverImg {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
  .coverimage-icon,
  img {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>
