<template>
  <div class="pd-app-head">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <span class="pd-nav-right">
            <!-- 搜索框 -->
            <el-input
              placeholder="请输入内容"
              v-model="content"
              clearable
              @keyup.enter.native="searchContent"
            >
              <i class="el-icon-search el-input__icon" slot="suffix" @click="searchContent"></i>
            </el-input>
            <!-- 信息图标 -->
            <el-badge is-dot class="item">
              <i class="el-icon-alixiaoxi" style="font-size: 20px;"></i>
            </el-badge>
            <!-- 个人中心，包含下拉框内容 -->
            <el-dropdown @command="getCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-aliyonghu"></i> T-group
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">
                  <i class="el-icon-postcard"></i>个人信息
                </el-dropdown-item>
                <el-dropdown-item command="b">
                  <i class="el-icon-setting"></i>设置
                </el-dropdown-item>
                <el-dropdown-item command="c">
                  <i class="el-icon-switch-button"></i>退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "pd-app-head",
  data() {
    return {
      content: "" // 搜索框内容
    };
  },
  methods: {
    // 点击菜单触发下拉
    getCommand(command) {
      this.$message("click on item " + command);
    },
    // 对 输入框的 内容进行判定
    searchContent() {
      let input_val = this.content;
      if (input_val.trim() == "") {
        this.$notify({
          title: "错误",
          message: "啊哦，你是不是忘记输入查询内容啦？",
          type: "error"
        });
      } else {
        this.$notify({
          title: "成功",
          message: "成功捕获到你要查询的内容",
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.pd-app-head {
  width: 100%;
  .grid-content {
    min-height: 36px;
    .pd-nav-right {
      float: right;
      .el-input {
        width: 53%;
        .el-input__inner {
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          color: #606266;
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
        }
      }
      i {
        line-height: 40px;
        margin-right: 5px;
        span {
          margin: 0;
        }
      }
      // 消息 图标样式
      .item {
        i {
          color: white;
        }
        i:hover {
          color: #409eff;
        }
      }
      .item {
        margin-left: 15px;
        margin-top: 2px;
      }
      .el-badge__content.is-fixed {
        top: 15px;
      }
      .el-dropdown {
        margin: 0 15px 0 10px;
        .el-submenu__icon-arrow {
          display: none;
        }
        .el-dropdown-link {
          cursor: pointer;
          color: white;
        }
        .el-dropdown-link:hover {
          color: #409eff;
        }
        .el-submenu [class^="el-icon-"] {
          margin-right: 15px;
        }
        .el-submenu .el-menu-item {
          margin-left: 9%;
          min-width: 0;
        }
      }
    }
  }
}
</style>
