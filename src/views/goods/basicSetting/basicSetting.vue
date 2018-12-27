/* eslint-disable eqeqeq */
<template>
  <el-form
    :model="goodsFrom"
    :rules="rules"
    ref="goodsFrom"
    class="demo-goodsFrom"
    label-width="100px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsFrom.goods_name" autocomplete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="友好名称" prop="nickname">
          <el-input v-model="goodsFrom.nickname" autocomplete="off" placeholder="请输入友好名称"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="goods_code">
          <el-input v-model="goodsFrom.goods_code" autocomplete="off" placeholder="请输入商品编码"></el-input>
        </el-form-item>
        <el-form-item label="商品单位" prop="goods_company">
          <el-input v-model="goodsFrom.goods_company" autocomplete="off" placeholder="请输入商品单位"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="class_id">
          <el-select v-model="goodsFrom.class_id" placeholder="请选择分类">
            <el-option
              v-for="item in classValueList"
              :key="item.Id"
              :label="item.goods_class"
              :value="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否使用">
          <el-switch v-model="goodsFrom.is_use"></el-switch>
        </el-form-item>
        <el-form-item label="销售标签" prop="goods_labels">
          <el-tag
            :key="tag.Id"
            v-for="tag in goodsFrom.goods_labels"
            closable
            :disable-transitions="false"
            @close="delTag(tag)"
          >{{tag.tag_name}}</el-tag>
          <el-button class="button-new-tag" size="small" @click="selectTag" type="primary">选择标签</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="COVER" prop="coverimage">
          <div class="coverImg">
            <img
              :src="goodsFrom.coverimage"
              class="avatar"
              v-if="goodsFrom.coverimage!=''"
              @click="openResources"
            >
            <i class="el-icon-plus coverimage-icon" @click="openResources" v-else></i>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="footerBtn">
      <el-button type="primary" @click="onSubmit('goodsFrom')">保存</el-button>
    </el-form-item>
    <el-dialog
      title="资源管理"
      :visible.sync="coverImgStatus"
      width="1200px"
      center
      class="folderPanel"
    >
      <v-resources :folderList="folderList" :folderMenuData="folderMenuData" v-on:callBack="imgUrlBack"></v-resources>
      <!-- <div class="resourcesListBody" style="height:550px;">
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
            <div
              class="folderName"
              v-for="(item,index) in folderNameList"
              :key="index"
            >{{item.name}}</div>
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
        <el-button @click="coverImgStatus = false">取 消</el-button>
        <el-button type="primary" @click="coverImgEnter">确 定</el-button>
      </span> -->
    </el-dialog>
    <!-- 标签 -->
    <el-dialog title="选择TGA" :visible.sync="tagVisible" width="600px" center class="tagPanel">
      <div class="tagPanelBody">
        <el-row :gutter="10">
          <el-col :span="19">
            <el-input v-model="tagInputValue" placeholder="请输入标签" @keyup.enter.native="addTag"></el-input>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="addTag">添加标签</el-button>
          </el-col>
        </el-row>
        <el-row style="padding:10px 0;">
          <el-checkbox-group v-model="tagSelectList" size="mini">
            <el-checkbox
              :value="tag.Id"
              border
              v-for="tag in tagList"
              :key="tag.tag_name"
              :label="tag.tag_name"
            ></el-checkbox>
          </el-checkbox-group>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tagVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterTag">确 定</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import vResources from '../resources/resources'
export default {
  data () {
    return {
      goodsFrom: {
        goods_name: '',
        nickname: '',
        goods_code: '',
        goods_labels: [],
        coverimage: '',
        goods_company: '',
        class_id: '',
        is_use: false
      },
      tagVisible: false,
      tagList: [],
      tagSelectList: [],
      tagInputValue: '',
      classValueList: [],
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入友好名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        goods_code: [
          { required: true, message: '请输入商品编码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        goods_company: [
          { required: true, message: '请输入商品单位', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        class_id: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        goods_labels: [
          {
            type: 'array',
            required: true,
            message: '请至少添加一个销售标签',
            trigger: 'change'
          }
        ],
        coverimage: [
          { required: true, message: '请选择封面图片', trigger: 'blur' }
        ]
      },
      coverImgStatus: false,
      folderList: [],
      flieImgList: [],
      folderMenuData: [],
      defaultProps: {
        label: 'dir_name'
      },
      folderNameList: [],
      selectImgInfo: [],
      postType: 1
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.axios.post('/Admin/Goods/getGoodsClass', {}).then(res => {
      this.classValueList = res.data.data
    })
  },
  methods: {
    // 添加标签
    addTag () {
      let tagInputValue = this.tagInputValue
      if (tagInputValue) {
        this.axios
          .post('/Admin/Goods/addGoodsTag', {
            tag_name: tagInputValue,
            is_use: 1
          })
          .then(res => {
            console.log(res)
            // eslint-disable-next-line eqeqeq
            if (res.data.code == 1) {
              this.tagList.push({
                tag_name: tagInputValue,
                tag_id: res.data.data.tag_id
              })
            } else {
              this.$message({
                type: 'warning',
                message: tagInputValue + '标签已经存在!'
              })
            }
          })
      }
      this.tagInputValue = ''
    },
    // 选择标签
    selectTag () {
      this.tagVisible = true
      this.tagSelectList = []
      this.axios.post('/Admin/Goods/getGoodsTagList', {}).then(res => {
        // console.log(res)
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 1) {
          let tagArray = this.goodsFrom.goods_labels
          if (tagArray.length > 0) {
            for (let i = 0; i < tagArray.length; i++) {
              this.tagSelectList.push(tagArray[i].tag_name)
            }
          }
          this.tagList = res.data.data
        }
      })
    },
    // 确认选择标签
    enterTag () {
      console.log(this.tagSelectList)
      if (this.tagSelectList.length > 0) {
        let selectArray = []
        for (let i = 0; i < this.tagSelectList.length; i++) {
          for (let j = 0; j < this.tagList.length; j++) {
            // eslint-disable-next-line eqeqeq
            if (this.tagSelectList[i] == this.tagList[j].tag_name) {
              selectArray.push(this.tagList[j])
              break
            }
          }
        }
        this.goodsFrom.goods_labels = selectArray
        this.tagVisible = false
      } else {
        this.$message({
          type: 'warning',
          message: '至少选择一个标签'
        })
      }
    },
    // 删除标签
    delTag (tag) {
      console.log(this.goodsFrom.goods_labels.indexOf(tag))
      this.goodsFrom.goods_labels.splice(
        this.goodsFrom.goods_labels.indexOf(tag),
        1
      )
    },
    // 提交form表单
    onSubmit (formName) {
      let postUrl = '/Admin/Goods/addGoodsInfo'
      // eslint-disable-next-line eqeqeq
      if (this.postType == 1) {
        postUrl = '/Admin/Goods/addGoodsInfo'
      } else {
        postUrl = '/Admin/Goods/saveGoodsInfo'
      }
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          // for(let i=0;i<this.goodsFrom.)
          // eslint-disable-next-line no-unreachable
          this.axios
            .post(postUrl, this.goodsFrom)
            .then(res => {
              console.log(res)
              // eslint-disable-next-line eqeqeq
              if (res.data.code == 1) {
                sessionStorage.setItem('goods_id', res.data.data.goods_id)
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.msg
                })
              }
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请检查必填项'
          })
          return false
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
        .catch(err => {
          console.log(err)
        })
      this.coverImgStatus = true
    },
    // 资源列表回调函数
    imgUrlBack (data) {
      console.log(data)
      if (data.coverimage) {
        this.goodsFrom.coverimage = data.coverimage
      }
      this.coverImgStatus = data.coverImgStatus
    },
    getData () {
      // eslint-disable-next-line camelcase
      let goods_id = this.$route.params.goods_id
      // eslint-disable-next-line eqeqeq
      if (goods_id != '' || typeof (goods_id) !== 'undefined') {
        this.axios.post('/Admin/Goods/getGoodsFind', {goods_id: goods_id}).then((res) => {
          // eslint-disable-next-line eqeqeq
          if (res.data.code == 1) {
            let getGoodsData = res.data.data
            this.goodsFrom = getGoodsData
            // nickname 参数对不上
            this.goodsFrom.nickname = getGoodsData.goods_nickname
            // 销售标签赋值
            this.goodsFrom.goods_labels = getGoodsData.tags
            // 是否使用赋值
            // eslint-disable-next-line eqeqeq
            if (getGoodsData.is_use == 1) {
              this.goodsFrom.is_use = true
            } else {
              this.goodsFrom.is_use = false
            }
            // cover图片赋值
            this.goodsFrom.coverimage = getGoodsData.goods_head_img
            // 商品单位赋值
            this.goodsFrom.goods_company = getGoodsData.goods_unit
            this.postType = 2
            this.goodsFrom.goods_id = goods_id
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  },
  components: {
    vResources
  }
}
</script>

<style lang="scss" scoped>
.footerBtn {
  text-align: center;
  margin-top: 15px;
}
// 销售标签
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
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

// tag弹窗样式
.tagPanel {
  .el-checkbox {
    margin-top: 10px;
    &:first-child {
      margin-left: 10px;
    }
  }
}
</style>
