<template>
  <div class="user">
    <el-row>
      <h1>用户管理</h1>
    </el-row>
    <el-row style="margin-bottom: 10px;">
      <el-button @click="resetDateFilter" type="danger" icon="el-icon-delete">批量删除</el-button>
      <el-button @click="clearFilter" type="primary" icon="el-icon-plus">添加角色</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="120">
          <template slot-scope="scope"> {{ scope.$index+1 }} </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名" width="120"></el-table-column>
        <el-table-column prop="userList" label="用户列表" show-overflow-tooltip></el-table-column>
        <el-table-column prop="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i class="el-icon-edit icon-control" @click="editTable(scope.$index)"></i>
            <i class="el-icon-delete icon-control" @click="delTable(scope.$index)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "超级管理员",
          userList: "管理员",
          describe: "拥有至高无上的权利"
        },
        {
          name: "部门经理",
          userList: "张三",
          describe: "具有增删改查的权限"
        },
        {
          name: "小组经理",
          userList: "李四",
          describe: "具有增加、修改和查看的权限"
        },
        {
          name: "成员",
          userList: "王五",
          describe: "具有查看的权限"
        },
      ]
    };
  },
  methods: {
    editTable(index){
      window.console.log(index);
    },
    delTable(index){
      this.tableData.splice(index,1);
    }
  },
};
</script>
<style lang="scss">
.el-table {
    color: white !important;
}
.el-table td, .el-table th {
  text-align: center !important;
}
.el-table thead {
    color: white !important;
}
.el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #111739 !important; 
}
.el-table th, .el-table tr {
    background-color: #111739 !important;
}
.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #585E80 !important;
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #585E80 !important;
}
.el-table--border, .el-table--group {
    border: 1px solid #585E80 !important;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #0B0F2A !important;
    // color: #2C9EF3;
}
.icon-control {
  margin: 0 5px;
}
.el-table__empty-block {
   background-color: #111739 !important;
}
.el-table__empty-text {
   color: white !important;
}
.el-table, .el-table__expanded-cell {
  background-color: #111739 !important; 
}
</style>