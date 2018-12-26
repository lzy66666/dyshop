<template>
  <div>
    <div class="detailsBody">
      <el-row>
        <el-col :span="10">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="delFileImg"
            list-type="picture-card"
            :multiple="true"
            :on-success="fileSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-col>
        <el-col :span="13" :offset="1">
          <div class="ipone">
            <el-scrollbar style="height:100%;background:#fff;">
              <div class="detail-item" v-for="item in detailsImgList" :key="item.value">
                <img :src="item.url" :alt="item.name">
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="footerBtn" style="text-align:center;margin-top:20px;">
      <el-button type="primary">保存</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detailsImgList: []
    }
  },
  methods: {
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
    }
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
</style>
