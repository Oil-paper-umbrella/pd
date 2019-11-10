<template>
  <div class="bar-chart">
    <div class="bar-sort-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          排序
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="getData()">默认</el-dropdown-item>
          <el-dropdown-item @click.native="getData('>')">从高到低</el-dropdown-item>
          <el-dropdown-item @click.native="getData('<')">从低到高</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div id="bar-container">
    </div>
  </div>
</template>

<script>

import funct from "../../control/methods.js";
import pdChart from "../../control/chartStyle.js";
export default {
  name: "echarts",
  data() {
    return {
      myChart: {},
      echartObj: {
        title: '',
        xAxisData: [],
        indexUnit: "", // 指标单位
        allCityScore: [], // 十八城市得分
        otherCityScore: [], // 其他十七个城市得分
        pdCityScore: [], // 平顶山市得分
        overAvg: [], // 超过平均分的 城市得分
        belowAvg: [] // 低于平均分的 城市得分
      }
    };
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      this.barCharts();
    });
  },
  methods: {
    getData(symbol) {
      let eObj = this.echartObj;
      let sortCityArray = funct.sortCity(symbol); // 对数据进行排序 symbol值有：空、>、<三种情况，其中空为默认
      let cityName = funct.getCitysName(sortCityArray); // 获取排序过后 18城市名   
      eObj.xAxisData = cityName; // 获取 柱形图 x轴的 18地市名称
      eObj.title = funct.getModuleName(); // 获取 指标名称
      eObj.indexUnit = funct.getUnit("bar"); // 获取 指标单位
      eObj.allCityScore = funct.allCitysScore(sortCityArray); // 获取 18 个城市得分
      eObj.otherCityScore = funct.getCitysScore(sortCityArray); // 获取除 平顶山市 以外的 17个 城市得分
      eObj.pdCityScore = funct.getPDScore(sortCityArray); // 获取 平顶山市 的得分
      eObj.overAvg = funct.getOverAvg(eObj.allCityScore); // 获取 高于 平均分的得分，若低于平均分，该城市得分为 0
      eObj.belowAvg = funct.getBelowAvg(eObj.allCityScore); // 获取 低于 平均分的得分，若高于平均分，该城市得分为 0
    },
    barCharts() {
      this.myChart = pdChart.init("bar-container");
      let pd_this = this;
      this.myChart.setOption({
        title: pdChart.title(pd_this.echartObj.title),
        legend: {
          show: true,
          textStyle: pdChart.textStyle("bold",15)
        },
        tooltip: pdChart.barTooltip(pd_this.echartObj.xAxisData),
        grid: pdChart.barGrid(),
        xAxis: pdChart.barXaxis(pd_this.echartObj.xAxisData),
        yAxis: pdChart.barYaxis(pd_this.echartObj.indexUnit),
        series: pdChart.barSeries(pd_this.echartObj.otherCityScore,pd_this.echartObj.pdCityScore,pd_this.echartObj.overAvg,pd_this.echartObj.belowAvg)
      });
    }
  },
  watch: {
    echartObj: {
      handler: function(val){
        this.echartObj = val;
        this.barCharts();
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bar-chart {
  width: 100%;
  height: 100%;
  position: relative;
  .bar-sort-menu {
    width: 9%;
    height: 10%;
    position: relative;
    left: 91%;

    .el-dropdown {
      color: white;
      z-index: 100;
      width: 96px;
      text-align: center;
      line-height: 36px;
      border-radius: 5px;
      border: 1px solid #60c1de;
    }
    .el-dropdown-menu {
      background-color: #fff;
      border: 1px solid #fff;
      padding: 0;
      user-select: none;
    }
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: #fff;
      color: #3d97f5;
      border-radius: 5px;
    }
  }
  #bar-container {
    width: 100%;
    height: 90%;
  }
}
</style>