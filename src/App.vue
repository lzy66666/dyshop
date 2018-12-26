<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body,
html {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  cursor: pointer;
}
.el-tabs__header {
  margin-bottom: 30px;
}
.el-dialog__body,
.el-dialog--center .el-dialog__body {
  padding-bottom: 0;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-aside,
.el-main {
  overflow: none;
}

.coverimage-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .coverimage-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
