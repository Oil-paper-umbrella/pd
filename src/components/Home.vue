<template>
  <div class="pd-app-home">
    <el-container>
      <el-header class="el-header-home" style="height: 40px;">
        <el-menu 
          :default-active="$route.path"
          router
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item v-for="(item,index) in chartType" :key="index" :index="item.route" >
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="el-main-home">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "pd-app-home",
  data() {
    return {
      activeIndex: '/home/pie',
      chartType: [
          {
            route: "/home/pie",
            name: "饼图"
          },
          {
            route: "/home/bar",
            name: "柱形图"
          },
          {
            route: "/home/line",
            name: "折线图"
          },
          {
            route: "/home/radar",
            name: "雷达图"
          },
          {
            route: "/home/map",
            name: "地图"
          }
        ]
    };
  },
  methods: {
    handleClick(tab, event) {
      window.console.log(tab, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pd-app-home {
  width: 100%;
  height: 100%;
  .el-header-home {
    border: none;
    padding: 0;
    margin: 0;
    .el-menu {
    background: none;
  }
  .el-menu--horizontal>.el-menu-item {
    color: #fff;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    background: none;
  }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background: none;
    color: #fff;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    color: #fff;
  }
  }
  .el-main {
    padding: 0px;
  }
  .el-container {
    width: 100%;
    height: 100%;
    .el-main-home {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
