<template>
  <el-aside width="201px">
    <el-col>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="width:200px"
        theme="dark"
        router
      >
        <el-menu-item :index="item.path" v-for="item in menulist" :key="item.value">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      menulist: [
        {
          name: '商品列表',
          path: '/',
          icon: 'el-icon-setting'
        },
        {
          name: '商品添加',
          path: '/addGoods',
          icon: 'el-icon-setting'
        },
        {
          name: '资源管理',
          path: '/no',
          icon: 'el-icon-setting'
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.el-aside {
  border-right: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  bottom: 0;
}
.el-menu {
  border-right: none;
  color: rgb(191, 203, 217);
  background-color: rgb(48, 65, 86);
}
.el-menu-item,
.el-submenu__title,
.el-aside {
  color: rgb(191, 203, 217);
  background-color: rgb(48, 65, 86);
}
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background: rgb(28, 52, 69);
}
</style>
