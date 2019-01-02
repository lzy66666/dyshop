<template>
  <div>
    <div class="detailsBody">
      <el-row>
        <el-col :span="10">
          <!-- <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="delFileImg"
            list-type="picture-card"
            :multiple="true"
            :on-success="fileSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>-->
          <el-button @click="openResources" style="margin-bottom:10px;">添加图片</el-button>
          <draggable v-model="detailsImgList" v-if="detailsImgList.length>0">
            <div class="coverImg" v-for="element in detailsImgList" :key="element.Id">
              <img :src="element.resource_url" class="avatar">
            </div>
          </draggable>
          <!-- <div class="coverImg">
            <i class="el-icon-plus coverimage-icon" @click="openResources"></i>
          </div>-->
        </el-col>
        <el-col :span="13" :offset="1">
          <div class="ipone">
            <el-scrollbar style="height:100%;background:#fff;">
              <div
                class="detail-item"
                v-for="item in detailsImgList"
                :key="item.resource_url+new Date()"
              >
                <img :src="item.resource_url" :alt="item.resource_nickname">
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="footerBtn" style="text-align:center;margin-top:20px;">
      <el-button type="primary" @click="onSubmitDetails">保存</el-button>
    </el-row>
    <el-dialog
      title="资源管理"
      :visible.sync="coverImgStatus"
      width="1200px"
      center
      class="folderPanel"
      :close-on-click-modal="false"
    >
      <v-resources
        :folderList="folderList"
        :folderMenuData="folderMenuData"
        :selectImgInfo="detailsImgList"
        v-on:callBack="imgUrlBack"
      ></v-resources>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import vResources from '../resources/resources'
export default {
  data () {
    return {
      detailsImgList: [],
      folderNameList: [],
      folderList: [],
      folderMenuData: [],
      coverImgStatus: false
    }
  },
  created () {
    this.pageInit()
  },
  methods: {
    iopenResources () {
      console.log(1)
    },
    // 文件上传成功
    fileSuccess (response, file, fileList) {
      this.detailsImgList = fileList
      this.dragImgStatus = true
    },
    // 照片墙删除
    delFileImg (file, fileList) {
      console.log(file, fileList)
    },
    // 预览照片
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化页面
    pageInit () {
      this.goods_id = this.$route.params.goods_id
      console.log(this.$route.params)

      // 拉取商品详情列表
      this.axios
        .post('/Admin/Goods/getGoodsFind', { goods_id: this.goods_id})
        .then(res => {
          console.log(res)
          if (res.data.code == 1) {
            let getImgData = res.data.data.goods_detail.split(',')
            for (let i = 0; i < getImgData.length; i++) {
              this.detailsImgList.push({
                resource_url: getImgData[i]
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 打开资源列表
    openResources () {
      this.flieType = 1
      this.folderNameList = []
      this.axios.post('/Admin/Resource/getDirList', {}).then(res => {
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
      // this.sku_form.goods_sku_head_img = data.coverimage
      this.coverImgStatus = data.coverImgStatus
    },
    onSubmitDetails () {
      let imgArray = []
      for (let i = 0; i < this.detailsImgList.length; i++) {
        imgArray.push(this.detailsImgList[i].resource_url)
      }
      this.axios
        .post('/Admin/Goods/saveGoodsDetail', {
          goods_id: this.goods_id,
          goods_detail: imgArray.join(',')
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 1) {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    draggable,
    vResources
  }
}
</script>

<style lang="scss" scoped>
.detail-item {
  width: 100%;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
.ipone {
  position: relative;
  background: #111;
  border-radius: 55px;
  box-shadow: 0px 0px 0px 2px #aaa;
  width: 320px;
  height: 568px;
  padding: 105px 25px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  &:before {
    content: "";
    width: 60px;
    height: 10px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    background: #333;
    top: 50px;
  }
  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    margin-left: -30px;
    bottom: 20px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 5px solid #333;
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
  margin: 5px;
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
    display: block;
  }
}
</style>
