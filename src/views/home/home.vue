<template>
  <el-container class="layout">
    <slide-bar></slide-bar>
    <el-container style="margin-left:200px;">
      <el-header>等娱云</el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import slideBar from '../../components/slideBar/slideBar'
export default {

  components: {
    slideBar
  }

}
</script>

<style scoped lang="scss">
.el-header {
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
}
.layout {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.el-header {
  font-size: 35px;
  line-height: 60px;
}
// 弹出窗默认样式清除
.dialogSettings {
  .el-dialog__header {
    padding: 0;
  }
}

</style>
