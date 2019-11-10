<template>
  <div class="line-chart">
    <div id="line-container">
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
        indexUnit: "",
        indicatorValue: []
      },
      selectedCity: {
        '平顶山': true,
        '安阳': false,
        '鹤壁': false,
        '济源': false,
        '焦作': false,
        '开封': false,
        '洛阳': false,
        '漯河': false,
        '南阳': false,
        '濮阳': false,
        '三门峡': false,
        '商丘': false,
        '新乡': false,
        '信阳': false,
        '许昌': false,
        '郑州': false,
        '周口': false,
        '驻马店': false
      }
    };
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      this.lineCharts();
    });
  },
  methods: {
    getData() {
      this.echartObj.indexUnit = funct.getLineUnit(); // 获取 指标单位
      this.echartObj.indicatorValue = funct.getIndicatorValue();
      window.console.log(this.echartObj.indicatorValue);
    },
    lineCharts() {
      this.myChart = pdChart.init("line-container");
      let pd_this = this;
      let option = {
        tooltip: pdChart.lineTooltip(),
        color: ['#FCD85A','#0084C8','#D8514B','#9CCB63'],
        dataZoom: pdChart.lineDataZoom(),
        legend: pdChart.lineLegend(pd_this.selectedCity),
        xAxis: pdChart.lineXaxis(pd_this.echartObj.indicatorValue),
        yAxis: pdChart.lineYaxis(pd_this.echartObj.indexUnit),
        series : funct.getLineData()
      };
      this.myChart.setOption(option);
      this.myChart.on('legendselectchanged', function(params) {
        let stack = 0;
        let defaultCityName ='平顶山';
        let selectedCity = params.selected;
        let cityName = params.name;
        for(let i in selectedCity){
          if(selectedCity[i]){
            stack++;
          }
        }
        if(stack==4){
          pd_this.$message.warning('糟糕，数据太多了，眼花缭乱的。请至多对三个地市进行比较');
          for(let i in selectedCity){
            option.legend.selected[i] = false;
            selectedCity[i] = false;
          }
          selectedCity[defaultCityName] = true;
          selectedCity[cityName] = true;
          option.legend.selected[defaultCityName] = true;
          option.legend.selected[cityName] = true;
          pd_this.myChart.setOption(option);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.line-chart {
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
  #line-container {
    width: 100%;
    height: 90%;
  }
}
</style>