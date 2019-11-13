<template>
  <div class="user">
    <el-row>
      <h1>权限管理</h1>
    </el-row>
    <el-row style="margin-bottom: 10px;">
      <el-button type="danger" icon="el-icon-delete" @click="delBacch">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addRole">添加权限</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="120">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="权限名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="初步名" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i class="el-icon-edit icon-control" @click="editOperation(scope)"></i>
            <i
              class="el-icon-delete icon-control"
              @click="delOperation(scope.$index,scope.row.name)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 操作确认框 -->
    <el-dialog title="提示" :visible.sync="delDialog" width="30%" v-dialogDrag>
      <span>角色删除需谨慎，确认要删除{{ operationName }}角色么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog=false">取 消</el-button>
        <el-button type="primary" @click="delTable">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="角色编辑" :visible.sync="editDialog" width="30%" v-dialogDrag>
      <el-form
      ref="editMsg" label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="editMsg.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="name">
        <el-input v-model="editMsg.describe"></el-input>
      </el-form-item>
      <el-form-item label="网站角色">
        <el-select v-model="editMsg.identity" placeholder="请选择活动区域">
          <el-option label="超级管理员" value="superAdmin"></el-option>
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="经理" value="manager"></el-option>
          <el-option label="成员" value="member"></el-option>
        </el-select>
      </el-form-item>
      <el-row style="text-align: center;">
        <el-button type="success" size="small" @click="editTable">确定</el-button>
        <el-button type="primary" size="small" @click="editDialog = false">取消</el-button>
      </el-row>
    </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "超级管理员",
          userList: ["管理员","驻地"],
          describe: "拥有至高无上的权利"
        },
        {
          name: "部门经理",
          userList: ["张三"],
          describe: "具有增删改查的权限"
        },
        {
          name: "小组经理",
          userList: ["李四"],
          describe: "具有增加、修改和查看的权限"
        },
        {
          name: "成员",
          userList: ["王五"],
          describe: "具有查看的权限"
        }
      ],
      delDialog: false,
      operationIndex: 0,
      operationName: "",
      editDialog: false,

      editMsg: {
        name: "",
        describe: "",
        identity: ""
      }
    };
  },
  methods: {
    delOperation(index, name) {
      this.operationIndex = index;
      this.operationName = name;
      this.delDialog = true;
    },
    editOperation(scope) {
      window.console.log(scope);
      this.editDialog = true;
    },
    delTable() {
      if (this.operationName == "超级管理员") {
        this.$message.error("哎呀，手滑了！超级管理员不可删除哟~");
        this.delDialog = false;
        return;
      }
      this.tableData.splice(this.operationIndex, 1);
      this.delDialog = false;
    },
    editTable() {
      this.editMsg.describe="";
      this.editMsg.identity="";
      this.editMsg.name="";
      this.editDialog = false;
    },
    delBacch(){
      window.console.log("00");
    },
    addRole(){
      this.editDialog = true;
    }
  }
};
</script>
<style lang="scss">

</style>