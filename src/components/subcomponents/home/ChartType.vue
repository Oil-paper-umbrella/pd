<template>
  <div class="pd-home-chart">
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
  </div>
</template>

<script>
export default {
  name: "pd-home-chart",
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
          }
        ]
    };
  }
};
</script>

<style lang="scss" scoped>
.pd-home-chart {
  width: 100%;
  height: 100%;
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
</style>