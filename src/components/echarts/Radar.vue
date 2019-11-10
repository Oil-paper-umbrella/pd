<template>
  <div class="radar-chart">
    <div id="radar-container">
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
      },
      selectedCity: {
        '平顶山市': true,
        '安阳市': false,
        '鹤壁市': false,
        '济源市': false,
        '焦作市': false,
        '开封市': false,
        '洛阳市': false,
        '漯河市': false,
        '南阳市': false,
        '濮阳市': false,
        '三门峡市': false,
        '商丘市': false,
        '新乡市': false,
        '信阳市': false,
        '许昌市': false,
        '郑州市': false,
        '周口市': false,
        '驻马店市': false
      },
      colors: [
        '#0084C8','#27C2C1','#9CCB63','#D8514B',
        '#61A0A8','#F6731B','#FFA597','#84E4DD',
        '#FCD85A','#C39705','#72B332','#27C2C1',
        '#9CCB63', '#D8514B','#0084C8','#F6731B',
        '#FFA597',
      ],
      datas: [
        {name: '郑州市', value: [112,153,125,145]},
        {name: '开封市', value: [140,135,120,144]},
        {name: '洛阳市', value: [132,142,103,192]},
        {name: '平顶山市', value: [114,123,105,119]},
        {name: '焦作市', value: [152,145,168,172]},
        {name: '鹤壁市', value: [102,154,168,145]},
        {name: '新乡市', value: [121,126,145,168]},
        {name: '安阳市', value: [112,134,162,191]},
        {name: '濮阳市', value: [102,113,154,187]},
        {name: '许昌市', value: [148,156,170,185]},
        {name: '漯河市', value: [131,152,144,168]},
        {name: '三门峡市', value: [130,145,162,178]},
        {name: '南阳市', value: [121,143,155,146]},
        {name: '商丘市', value: [149,151,172,181]},
        {name: '信阳市', value: [141,135,162,188]},
        {name: '周口市', value: [130,151,126,135]},
        {name: '驻马店市', value: [154,162,155,185]},
        {name: '济源市', value: [143,154,166,178]}
      ]
    };
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      this.radarCharts();
    });
  },
  methods: {
    getData() {
      this.echartObj.indexUnit = funct.getLineUnit(); // 获取 指标单位
    },
    radarCharts() {
      this.myChart = pdChart.init("radar-container");
      let pd_this = this;
      this.myChart.setOption({
        title: pdChart.title("基础雷达图"),
        legend: pdChart.radarLegend(pd_this.selectedCity),
        color: pd_this.colors,
        radar: {
          name:{
            fontSize: 14
          },
          indicator: [
            { name: '电网发展质量', max: 200,color: '#fff'},
            { name: '公司管理效率', max: 200,color:'#D8514B'},
            { name: '创新创效能力', max: 200,color:'#54DCF2'},
            { name: '基础保障力', max: 200,color:'#FCD85A'}
          ],
          center: ['40%','50%'],
          radius: "85%",
          color: [],
          splitArea: {
            areaStyle: {
              color: [ '#4E5575','#3F4666']
            }
          }
        },
        series: [{
          name: '',
          type: 'radar',
          itemStyle : {
            normal : {
            // areaStyle: {type: 'default'},
              splitLine: {
                lineStyle: {
                }
              },
              label: {
                show: false,
                formatter:function(params) {
                  return params.value;}
              },
            }
          },
          lineStyle: {
            normal: {
              width: 4
            }
          },
          symbolSize: 12,
          data: pd_this.datas
        }]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.radar-chart {
  width: 100%;
  height: 100%;
  #radar-container {
    width: 100%;
    height: 90%;
  }
}
</style>