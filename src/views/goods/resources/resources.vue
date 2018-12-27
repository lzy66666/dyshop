<template>
  <div>
    <div class="resourcesListBody" style="height:550px;">
      <div class="folderListMenu">
        <el-tree :data="folderMenuData" :props="defaultProps">
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @click="folderListMenuClick(node)"
          >
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
      <div class="folederBody">
        <div class="flieMenu">
          <div class="folderName" @click="openResources">全部文件</div>
          <div class="folderName">
            <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
          </div>
          <div class="folderName" v-for="(item,index) in folderNameList" :key="index">{{item.name}}</div>
        </div>
        <div
          class="img-box-card"
          v-for="(item,index) in folderList"
          :key="index"
          @click="getImgList(index)"
          v-if="flieType == 1"
        >
          <div class="viewDir"></div>
          <div class="file-name">{{item.dir_name}}</div>
        </div>
        <div
          class="img-box-card"
          v-for="(item,index) in flieImgList"
          :key="index"
          :data-id="item.Id"
          @click="selectImg(index)"
          v-if="flieType == 2"
        >
          <label
            class="el-upload-list__item-status-label"
            :class="item.active==true?'activeImg':''"
          >
            <i class="el-icon-upload-success el-icon-check"></i>
          </label>
          <div class="viewImg">
            <img :src="item.resource_url" :alt="item.resource_nickname">
          </div>
          <div class="file-name">{{item.resource_nickname}}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="coverImgEnter">确 定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'resources',
  data () {
    return {
      flieImgList: [],
      flieType: 1,
      defaultProps: {
        label: 'dir_name'
      },
      folderNameList: [],
      selectImgInfo: []
    }
  },
  // eslint-disable-next-line vue/no-dupe-keys
  props: ['folderMenuData', 'folderList'],
  methods: {
    openResources () {
      this.flieType = 1

      // this.folderNameList = []
      // this.axios
      //   .post('/Admin/Resource/getDirList', {})
      //   .then(res => {
      //     // eslint-disable-next-line eqeqeq
      //     if (res.data.code == 1) {
      //       var dataMsg = res.data.data.data
      //       this.folderList = dataMsg
      //       this.folderMenuData = dataMsg
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      // this.coverImgStatus = true
    },
    // 打开资源文件夹请求图片文件
    getImgList (index) {
      this.flieType = 2
      this.flieImgList = []
      this.folderNameList = []
      // eslint-disable-next-line no-undef
      this.flieImgStatus = true
      this.axios
        .post('/Admin/Resource/getFileList', {
          dir_id: this.folderList[index].Id
        })
        .then(res => {
          console.log(res)
          this.flieImgList = res.data.data.data
          this.flieImgStatus = false
          console.log(this.folderList)
          this.folderNameList.push({ name: this.folderList[index].dir_name })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 资源列表菜单事件
    folderListMenuClick (name) {
      let index = this.folderMenuData.findIndex(d => d.dir_name === name.label)
      console.log(index)
      this.getImgList(index)
    },
    // 选中图片
    selectImg (index) {
      this.selectImgInfo = []
      for (let i = 0; i < this.flieImgList.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (i == index) {
          this.$set(this.flieImgList[i], 'active', true)
          this.selectImgInfo.push(this.flieImgList[i])
        } else {
          this.$set(this.flieImgList[i], 'active', false)
        }
      }
    },
    // 确认选择
    coverImgEnter () {
      console.log(this.selectImgInfo)
      if (this.selectImgInfo.length > 0) {
        this.$message({
          message: '选择成功!',
          type: 'success'
        })
        this.coverImgStatus = false
        let callInfo = {
          coverimage: this.selectImgInfo[0].resource_url,
          coverImgStatus: false
        }
        this.$emit('callBack', callInfo)
        this.$nextTick(() => {
          this.flieType = 1
          this.folderNameList = []
        })
      } else {
        this.$message({
          message: '警告，请选择一张封面图片',
          type: 'warning'
        })
      }
    },
    close () {
      let callInfo = {
        coverImgStatus: false
      }
      this.$emit('callBack', callInfo)
      this.$nextTick(() => {
        this.flieType = 1
        this.folderNameList = []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.footerBtn {
  text-align: center;
  margin-top: 15px;
}
// 图片卡片视图
.folderPanel {
  .folderListMenu {
    float: left;
    width: 200px;
    margin-right: 20px;
    border-right: 1px solid #ddd;
    height: 100%;
  }
  .folederBody {
    float: left;
    .flieMenu {
      overflow: hidden;
      margin-bottom: 10px;
      margin-left: 4px;
      .folderName {
        float: left;
        font-weight: 400;
        color: #606266;
        cursor: pointer;
        line-height: 1;
        &:hover {
          color: #409eff;
        }
      }
    }
    .img-box-card {
      width: 120px;
      height: 127px;
      text-align: center;
      border: 1px solid #eee;
      cursor: pointer;
      border-radius: 5px;
      float: left;
      margin: 4px 0 0 6px;
      position: relative;
      overflow: hidden;
      .activeImg {
        display: block !important;
      }
      label {
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
        z-index: 1;
        i {
          font-size: 12px;
          margin-top: 11px;
          transform: rotate(-45deg);
          color: #fff;
        }
      }
      &:hover {
        border: 1px solid #f1f5fa;
        border-radius: 5px;
        background: #f1f5fa;
      }
      .viewImg,
      .viewDir {
        position: relative;
        margin: 9px auto 0;
        width: 84px;
        height: 84px;
        overflow: hidden;
      }
      .viewDir {
        background: url(../../../assets/images/folder.png) center no-repeat;
      }
      .viewImg {
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .file-name {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 6px 5px 5px;
      }
    }
  }
  .folderListMenu {
    width: 200px;
  }
  .is-focusable {
    color: #409eff;
  }
  .dialog-footer{
    padding: 10px 20px 20px;
    display: block;
    text-align: center;
  }
}
</style>
