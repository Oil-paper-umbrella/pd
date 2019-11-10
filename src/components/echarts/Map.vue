<template>
  <div class="map-chart">
    <div id="map-container"></div>
  </div>
</template>

<script>
require('echarts/map/js/province/henan');
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
      datas: [
        {
          name: '郑州市',
          value: 100,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '开封市',
          value: 400,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '洛阳市',
          value: 100,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '平顶山市',
          value: 466,
          itemStyle: {
            normal: {
              areaColor: '#FCD85A'
            }
          }
        },
        {
          name: '焦作市',
          value: 100,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '鹤壁市',
          value: 300,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '新乡市',
          value: 500,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '安阳市',
          value: 200,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '濮阳市',
          value: 500,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '许昌市',
          value: 200,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '漯河市',
          value: 500,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '三门峡市',
          value: 200,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '南阳市',
          value: 400,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '商丘市',
          value: 600,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '信阳市',
          value: 300,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '周口市',
          value: 600,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '驻马店市',
          value: 300,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        },
        {
          name: '济源市',
          value: 600,
          itemStyle: {
            normal: {
              areaColor: '#60C1DE'
            }
          }
        }
    ]
    };
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      this.mapCharts();
    });
  },
  methods: {
    getData() {
      this.echartObj.indexUnit = funct.getLineUnit(); // 获取 指标单位
    },
    mapCharts() {
      this.myChart = pdChart.init("map-container");
      let pd_this = this;
      this.myChart.setOption({
        tooltip : pdChart.mapTooltip(),
        series: pdChart.mapSeries(pd_this.datas)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map-chart {
  width: 100%;
  height: 100%;
  #map-container {
    width: 100%;
    height: 100%;
  }
}
</style>