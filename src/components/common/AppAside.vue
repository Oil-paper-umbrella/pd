<template>
  <div class="pd-app-aside">
    <div class="pd-app-name">
      <h1>后台管理系统</h1>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      width="100%"
      :default-active="$route.path"
      router
      unique-opened
    >
      <el-submenu v-for="(item,index) in menuList" :index="item.menuIndex" :key="index">
        <template slot="title">
          <i :class="item.iconClass"></i>
          <span slot="title">{{ item.menuTitle }}</span>
        </template>
        <el-menu-item
          v-for="(subitem,i) in item.submenuList"
          :key="i"
          :index="subitem.route"
        >{{ subitem.name }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "pd-app-aside",
  data() {
    return {
      // 侧边栏，功能模块数组
      menuList: [
        {
          menuIndex: "1",
          menuTitle: "数据展示",
          iconClass: "el-icon-monitor",
          submenuList: [
            { route: "/raw", name: "原始数据展示" },
            { route: "/cluster", name: "聚类数据显示" },
            { route: "/analysis", name: "分析结果展示" }
          ]
        },
        {
          menuIndex: "2",
          menuTitle: "后台管理",
          iconClass: "el-icon-paperclip",
          submenuList: [
            { route: "/jurisdiction", name: "权限管理" },
            { route: "/index", name: "指标设定" },
            { route: "/port", name: "数据导入、导出" },
            { route: "/operation", name: "数据操作" },
            { route: "/dataAnalysis", name: "数据分析" },
            { route: "/forecast", name: "指标预测" },
            { route: "/interface", name: "接口管理" },
            { route: "/user", name: "用户管理" },
            { route: "/message", name: "邮件箱" }
          ]
        }
      ]
    };
  },
  mounted() {
    let count = 0;
    for (let index = 0; index < this.$route.path.length; index++) {
      if(this.$route.path[index] == "/"){
        count = count+1;
      }
    }
    this.$store.commit("add_tabs", { route: "/home", name: "首页" }); 
    
    if(count == 1 ){
      // 刷新时判断当前路由是否已经加入 tab 数组中，若已经在数组中，则 切换 activeIndex
      let flag = false; // 用于设置 判断 点击路由在 tab 数组中是否已存在，默认不存在数组中
      for (let option of this.tabList) {
        if (option.name === this.$route.name) {
          flag = true; // 在 tab 数组中已存在
          this.$store.commit(
            "set_active_index",
            "/" + this.$route.path.split("/")[1]
          ); // 更改 activeIndex
          // this.$route.path = "/home/pie";
          break;
        }
      }
      if (!flag) {
        window.console.log(this.$route.path);
        if (this.$route.path !== "/home") {
          // 判断当前路由是否是首页，如果不是，则将 当前路由 添加到 tab 数组中，并更改 activeIndex·
          this.$store.commit("add_tabs", {
            route: this.$route.path,
            name: this.$route.name
          }); // 将 当前路由 添加到 tab 数组中
          this.$store.commit("set_active_index", this.$route.path); // 更改 activeIndex
        } else {
          alert("00");
        }
      }else {
        window.console.log(this.$route.path);
      }
    }else{
      this.$store.commit("set_active_index", "/" + this.$route.path.slice(1,5));
    }
  },
  computed: {
    tabList() {
      return this.$store.state.tabList;
    }
  }
};
</script>

<style lang="scss">
.pd-app-aside {
  overflow: hidden;
  .pd-app-name {
    text-align: center;
    color: white;
    pointer-events: none;
  }
  .pd-app-name:hover {
    color: white;
    cursor: default;
  }
  .el-menu {
    background-color: #111739;
    border: none;
    .el-menu-item {
      color: white;
      text-indent: 1em; 
      background-color: rgba(0, 0, 0, 0);
    }
    .is-active,
    .el-menu-item:hover {
      color: #409eff;
      background: rgba(0, 0, 0, 0);
    }
    .el-submenu__title {
      color: white;
      text-indent: 0;
    }
    .el-submenu__title:hover {
      color: #409eff;
      background-color: rgba(0, 0, 0, 0);
      i {
        color: #409eff;
      }
    }
  }
}
</style>