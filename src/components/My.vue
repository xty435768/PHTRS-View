<template>
  <div
    id="magicalDragScene"
    class="mc-root mc-ui-absolute-pane"
  >
    <el-row
      style="position: absolute; left: 19.2675%; top: 13.5714%; width: 66.5605%; height: 580px;"
      v-if="true"
    >
      <el-col
        style="width: 31.7284%; height: 548px;"
        :xs="24"
        :md="12"
      >
        <el-menu
          mode="vertical"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/my/info">个人信息</el-menu-item>
          <el-menu-item
            style="left: 0px;"
            index="/my/pwd"
          >密码修改</el-menu-item>
          <el-menu-item
            style="left: 0px;"
            index="/index"
          >返回主页</el-menu-item>
        </el-menu>
      </el-col>
      <el-col
        style="width: 68.1481%; height: 548px;"
        :xs="24"
        :md="12"
      >
        <div>
          <router-view>

          </router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "My",
  data () {
    return {
      active: 0,

    }
  },
  methods: {
    handleSelect: function (index, indexPath) {
      console.log()
      this.active = index;
      console.log(this.active)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted () {
    //alert("点击左侧菜单更改用户信息！")
  }
}
</script>
<style scoped>
.username_style {
  margin: 0px auto 22px auto;
}
</style>