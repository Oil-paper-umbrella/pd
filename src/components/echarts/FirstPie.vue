<template>
  <div class="pie-chart">
    <div id="first-pie-container">
    </div>
  </div>
</template>

<script>
import pdChart from "../../control/chartStyle.js";
export default {
  name: "pie-chart",
  data() {
    return {
      myChart: {},
    };
  },
  created() {
    this.$nextTick(() => {
      this.firstPieCharts();
    });
  },
  methods: {
    firstPieCharts() {
      this.myChart = pdChart.init("first-pie-container");
      this.myChart.setOption({
        tooltip : pdChart.firstPieTooltip(),
        legend: pdChart.firstPieLegend(),
        color: ['#FCD85A','#0084C8','#D8514B','#9CCB63'],
        series : pdChart.firstPieSeries()
      });
      this.myChart.on('click',()=>{
        this.$router.push({path: '/home/subpie'});
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pie-chart {
  width: 100%;
  height: 100%;
  #first-pie-container {
    width: 100%;
    height: 100%;
  }
}
</style>