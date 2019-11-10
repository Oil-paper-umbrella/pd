<template>
  <div class="pd-app-analysis">
    <!-- <chartType></chartType>
    <router-view></router-view> -->
    <el-container>
      <el-header>
        <chartType></chartType>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>
<script>
import chartType from '../../subcomponents/home/ChartType.vue'
export default {
  components: {
    chartType
  },
  data() {
      return{

      }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .pd-app-analysis {
  width: 100%;
  height: 100%;
  background-color: red;
  .el-container {
    width: 100%;
    height: 100%;
    background-color: pink;
  }
}
</style>