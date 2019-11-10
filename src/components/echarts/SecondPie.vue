<template>
  <div class="pie-chart">
    <div id="second-pie-container">
    </div>
  </div>
</template>

<script>

import pdChart from "../../control/chartStyle.js";
import funct from '../../control/methods';
export default {
  name: "echarts",
  data() {
    return {
      myChart: {},
    };
  },
  created() {
    this.$nextTick(() => {
      this.pieCharts();
    });
  },
  methods: {
    pieCharts() {
      window.console.log(funct.getIndexOfModule());
      this.myChart = pdChart.init("second-pie-container");
      this.myChart.setOption({
        color: ['#FCD85A','#0084C8','#D8514B','#9CCB63'],
        tooltip : {
          trigger: 'item',
          textStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14
          },
          /* formatter:function (params) {
            let moduleName = IndexsOfModule.IndexValue[params.dataIndex].indexName;
            let moduleScore = IndexsOfModule.IndexValue[params.dataIndex].datas;
            let indexScore = IndexsOfModule.IndexValue[params.dataIndex].indexScore;
            let moduleAllScore = IndexsOfModule.Module.sum;
            let GDP = ((indexScore/moduleAllScore)*100).toFixed(2);
            return  moduleName +"<br />得分："+moduleScore+"<br/>满分："+indexScore+"<br>占比：" + GDP+"%"
          } */
        },
        legend: {
          orient: 'vertical',
          right: '13%',
          top:'30%',
          textStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 15
          }
        },
        series : [
          {
            type: 'pie',
            radius : '70%',
            center: ['45%', '50%'],
            data:funct.getIndexOfModule(),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pie-chart {
  width: 100%;
  height: 100%;
  #second-pie-container {
    width: 100%;
    height: 90%;
  }
}
</style>