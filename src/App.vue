<template>
  <div id="app" :style="appStyle">
    <el-container id="pd-app-container">
      <i :class="iconClass"  @click="toggleAside" :style="arrowStyle" style="font-size: 23px;" ></i>
      <!-- 侧边栏 组件 -->
      <el-aside class="el-aside-app" :style="asideStyle">
        <AppAside></AppAside>
      </el-aside>
      <el-container class="pd-app-main">
        <!-- 导航栏 组件 -->
        <el-header class="el-header-app">
          <AppHead></AppHead>
        </el-header>

        <el-main class="el-main-app">
          <el-tabs
            v-model="activeIndex"
            type="card"
            closable
            @tab-click="tabClick"
            v-if="tabList.length"
            @tab-remove="tabRemove"
          >
            <el-tab-pane
              v-for="(item,index) in tabList"
              :key="index"
              :label="item.name"
              :name="item.route"
            >
              <!-- 路由容器 -->
              <router-view :key="keys"></router-view>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from "./components/common/AppAside.vue";
import AppHead from "./components/common//AppHead.vue";
export default {
  name: "app",
  components: {
    AppAside, // 侧边栏组件
    AppHead // 头部组件
  },
  data() {
    return {
      // App 容器样式
      appStyle: {
        width: "",
        height: ""
      },
      // 侧边栏样式
      asideStyle: {
        width: '12%',
        display: 'block'
      },
      // 隐藏框图标类名
      iconClass: 'el-icon-caret-left',
      // 隐藏框样式
      arrowStyle: {
        position: 'absolute',
        top: '50%',
        left: '10.5%',
        'z-index': 100
      },
      keys: 0
    };
  },
  methods: {
    // 获取设备 宽度 和 高度
    getHeight() {
      let clientWidth = document.documentElement
        ? document.documentElement.clientWidth
        : document.body.clientWidth;
      this.appStyle.width = clientWidth + "px";
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.appStyle.height = clientHeight + "px";
    },
    // 切换 侧边栏 显示状态
    toggleAside(){
      let active = this.asideStyle.display;
      if(active == "none"){
        this.asideStyle.display = "block";
        this.iconClass = "el-icon-caret-left";
        this.arrowStyle.left = "10.5%"
      }else{
        this.asideStyle.display = "none";
        this.iconClass = "el-icon-caret-right";
        this.arrowStyle.left = "1%"
      }
      ++this.keys; // key的值发生变化，能够重新渲染对应组件
    },
    // tab切换时，动态的切换路由
    tabClick() {
      let path = this.activeIndex;
      this.$router.push({ path: path });
    },
    // tab移除，除了首页不可删除，其余均可删除
    // @params targetName 要删除的tab对应的路由路径
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/home") {
        // 点击删除首页，弹出操作错误的消息框
        this.$message.error("哎呀，手滑了！首页不可删除哟~");
        return;
      }
      this.$store.commit("delete_tabs", targetName); // 删除tab
      if (this.activeIndex.route === targetName) {
        // 如果删除的页面为选中状态，需要设置当前激活的路由
        if (this.tabList && this.tabList.length >= 1) {
          // 若页面路由大于等于1，当前激活路由默认设置为最后一个
          this.$store.commit(
            "set_active_index",
            this.tabList[this.tabList.length - 1].route
          );
          this.$router.push({ path: this.activeIndex });
        } 
      }
    }
  },
  mounted() {
    this.getHeight();
    let pd_this = this;
    // 监听浏览器窗口的变化
    window.onresize = function() {
      pd_this.getHeight();
    };
  },
  computed: {
    tabList() {
      return this.$store.state.tabList;
    },
    activeIndex: {
      // 获取当前路由的 activeIndex
      get() {
        return this.$store.state.activeIndex;
      },
      // 设置路由的 activeIndex
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  watch: {
    // 监听路由变化
    $route(to) {
      // 判断路由是第一路由，还是第二路由(第一路由的子路由)，通过地址 / 数目来判断
      let count = 0;
      for (let i = 0; i < to.path.length; i++) {
        if(to.path[i] == "/"){
          count = count+1;
        }
      }
      // 如果是 第一路由 则要添加到 tab 中去
      if(count == 1 ){
        // 判断点击路由在 tab 数组中是否已存在，默认不存在数组中
        let flag = false; 
        // 遍历 tab 数组，判断 当前点击的路由是否在 tab 数组中已存在，若已存在则更改 activeIndex
        for (let option of this.tabList) {
          if (option.name === to.name) {
            flag = true; // 在 tab 数组中已存在
            this.$store.commit("set_active_index", "/" + to.path.split("/")[1]); // 更改 activeIndex
            break;
          }
        }
        // 当前路由在 tab 数组中不存在
        if (!flag) {
          // 将当前路由添加到 tab 数组中
          this.$store.commit("add_tabs", {
            route: "/" + to.path.split("/")[1],
            name: to.name
          });
          this.$store.commit("set_active_index", "/" + to.path.split("/")[1]); // 更改 activeIndex
        }
      }
    }
  }
};
</script>

<style lang="scss">
// 全局样式
i {
  color: white;
}
i:hover {
  color: #409eff;
}
#app {
  background: #0b0f2a;
  color: white;
  user-select: none;
  position: relative;
  #pd-app-container {
    width: 100%;
    height: 100%;
    .el-aside-app {
      height: 100%;
      background-color: #111739;
    }
    .pd-app-main {
      width: 85%;
      height: 100%;
      .el-header-app {
        background-color: #111739;
        line-height: 60px;
        padding: 0;
        border-left: 1px solid #272d4f;
      }
      .el-main-app {
        height: 100%;
        background-color: #111739;
        margin: 10px 5px 0 10px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        .el-tabs {
          width: 100%;
          height: 100%;
          .el-tabs__header {
            margin: 0;
          }
          .el-tabs__item {
            color: white;
            .el-icon-close:hover {
              background-color: #D95262;
              color: #fff;
            }
          }
          .el-tabs__content {
            height: 94%;
            .el-tab-pane {
              height: 100%;
            }
          }
        }
        .el-tabs--card > .el-tabs__header {
          border-bottom: 1px solid #585e80;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__nav {
          border: 1px solid #585e80;
          border-bottom: none;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
          border-bottom-color: #111739;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item {
          border-left: 1px solid #585e80;
        }
      }
      .el-menu--horizontal>.el-menu-item {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>