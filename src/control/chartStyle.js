//echarts 组件
import echarts from "echarts";
import funct from './methods.js'

// 通用模块

/**
 * @namespace init 初始化 echarts
 * @param id  指定DOM元素
 * **/
let init = function(id) {
  return echarts.init(document.getElementById(id));
}
/**
 * @namespace title 图例名称以及样式 字体样式默认为 白色、加粗、12px
 * @param title  图例名称
 * **/
let title = function(title) {
  return {
    text: title,
    textStyle: textStyle("bold",12)
  }
} 
/**
 * @namespace textStyle 文字样式，默认颜色为 #fff
 * @param weight  文字粗细
 * @param size  文字大小
 * **/
let textStyle = function(weight,size){
  return {
    color: "#fff",
    fontWeight: weight,
    fontSize: size
  }
}
/**
 * @namespace lineStyle 线样式
 * @param color  线条颜色
 * @param num  线条粗细大小
 * **/
let lineStyle = function(color,num){
  return {
    color: color,
    width: num
  }
}


// 柱形图 
/**
 * @namespace barTooltip 柱形图提示
 * @param title  xData X轴城市名称数组
 * **/
let barTooltip = function(xData){
  return {
    type: "axis",
    textStyle: textStyle("bold",14),
    formatter: function(params) {
      let sortIndex = funct.sortCity(">"); // 对 得分 进行排序
      let index; // 排名
      for (let i = 0; i < sortIndex.length; i++) {
        if (xData[params.dataIndex] == sortIndex[i].cityName) {
          index = i;
          break;
        }
      }
      return (
        xData[params.dataIndex] +
        "<br/>" +
        params.seriesName +
        ":" +
        params.value +
        funct.getUnit("bar") +
        "<br>" +
        "排名：" +
        (index + 1)
      );
    }
  }
}
/**
 * @namespace barGrid 柱形图 网格 X、Y轴位置
 * **/
let barGrid = function(){
  return [
    {//底下Y轴
      show: false,
      bottom: "12%",
      containLabel: false,
      height: "40%"
    },
    {//X轴
      show: false,
      top: "48%",
      height: "0%",
      zlevel: 100
    },
    {//上边Y轴
      show: false,
      top: "8%",
      containLabel: false,
      height: "40%"
    }
  ]
}
/**
 * @namespace barXaxis 柱形图 X轴样式
 * @param title  xData X轴城市名称数组
 * **/
let barXaxis = function(xData){
  return [
    {
      type: "category",
      position: "bottom",
      data: []
    },
    {//x轴样式
      gridIndex: 1,
      type: "category",
      position: "center",
      axisLine: {
        show: true,
        lineStyle: lineStyle("#fff",1)
      },
      zlevel: 200,
      axisLabel: {
        show: true,
        align: "center",
        textStyle: textStyle("normal",12),
        inside: true
      },
      data: xData,
      name: "城市",
      nameTextStyle: textStyle("bold",12)
    },
    {
      gridIndex: 2,
      type: "category",
      position: "top",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      data: []
    }
  ]
}
/**
 * @namespace barYaxis 柱形图 y轴样式
 * @param indexUnit  指标的单位
 * **/
let barYaxis = function(indexUnit){
  return [
    {
      type: "value",
      inverse: true, //echarts Y轴翻转属性,
      position: "left", //位置属性
      axisLabel: {
        show: true,
        textStyle: textStyle("bold",12),
        formatter: function(value) {
          // 消除 下边 x轴 的原点值，避免其与上边 x轴 原点值交错
          let item = "";
          if (value == 0) {
            item = "";
          } else {
            item = value;
          }
          return item;
        }
      },
      axisLine: {
        lineStyle: lineStyle("#fff",1)
      },
      axisTick: {
        show: true,
        lineStyle: lineStyle("#fff",1)
      },
      splitLine: {
        show: true,
        lineStyle: lineStyle("#1B283E",1)
      },
      max: 5,
      splitNumber: 6,
      name: "低于平均值/" + indexUnit
    },
    {
      gridIndex: 1, //对应的是grid  通过grid设置X Y相对位置
      show: false
    },
    {
      gridIndex: 2,
      type: "value",
      position: "left", //双Y轴一个翻转一个不翻转
      axisLine: {
        lineStyle: lineStyle("#fff",1)
      },
      axisLabel: {
        show: true,
        textStyle: textStyle("bold",12)
      },
      axisTick: {
        show: true,
        lineStyle: lineStyle("#fff",1)
      },
      splitLine: {
        show: true,
        lineStyle: lineStyle("#1B283E",1)
      },
      min: 65,
      max: 90,
      splitNumber: 5,
      name: indexUnit,
      nameTextStyle: {
        fontWeight: "bold"
      }
    }
  ]
}
/**
 * @namespace barSeries 柱形图的数据
 * @param otherCityScore  除 平顶山市 以外的 17个地市的数据
 * @param pdCityScore  平顶山市 的数据
 * @param overAvg  该城市超过平均分多少分
 * @param belowAvg  该城市低于平均分多少分
 * **/
let barSeries = function(otherCityScore,pdCityScore,overAvg,belowAvg){
  return [
    {
      gridIndex: 0, //选取调整好的轴,调整图形是向上还是向下
      type: "bar",
      name: "得分",
      barWidth: "55%",
      data: otherCityScore, // 除 平顶山市 以外的17个城市对应得分
      xAxisIndex: 2,
      yAxisIndex: 2,
      stack: "城市得分",
      itemStyle: {
        color: "#76DA91"
      }
    },
    {
      gridIndex: 0, //选取调整好的轴,调整图形是向上还是向下
      type: "bar",
      name: "得分",
      barWidth: "55%",
      data: pdCityScore, // 平顶山市 得分
      xAxisIndex: 2,
      yAxisIndex: 2,
      stack: "城市得分",
      itemStyle: {
        color: "#F8CB7F"
      }
    },
    {
      gridIndex: 1, ////选取调整好的轴,调整图形是向上还是向下
      type: "bar",
      name: "超过平均分",
      barWidth: "55%",
      data: overAvg, // 超过平均多少，低于平均分值置为0
      itemStyle: {
        color: "#60C1DE"
      },
      stack: "与平均分的差"
    },
    {
      gridIndex: 1, ////选取调整好的轴,调整图形是向上还是向下
      type: "bar",
      name: "低于平均分",
      barWidth: "55%",
      data: belowAvg, // 低于平均分，超过平均分值置为0
      itemStyle: {
        color: "#C23531"
      },
      stack: "与平均分的差"
    }
  ]
}

// 四大模块 饼图
/**
 * @namespace firstPieTooltip 一级饼图的提示框
 * **/
let firstPieTooltip = function(){
  return {
    trigger: 'item',
    textStyle: textStyle("bold",14),
    formatter:function (params) {
      let indexScore = funct.indexAllScore()[params.dataIndex];
      return  params.name +"<br />得分："+params.value+"分"+"<br/>满分："+indexScore+"分"+"<br>占比：" + params.percent+"%"
    }
  }
}
/**
 * @namespace firstPieLegend 一级饼图小图例
 * **/
let firstPieLegend = function(){
  return {
    orient: 'vertical',
    right: '13%',
    top:'30%',
    textStyle: textStyle("bold",15)
  }
}
/**
 * @namespace firstPieSeries 一级饼图数据
 * **/
let firstPieSeries = function(){
  return [
    {
      type: 'pie',
      radius : '70%',
      center: ['45%', '50%'],
      data:funct.firstPieData(),
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

// 折线图
/**
 * @namespace lineTooltip 折线图提示框
 * **/
let lineTooltip = function(){
  return {
    trigger: 'axis',
    textStyle: textStyle("bold",14)
  }
}
/**
 * @namespace lineDataZoom 折线图数据缩放
 * **/
let lineDataZoom = function(){
  return [
    {
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      textStyle: {
        color: '#fff'
      }
    },
    {
      type: 'inside'
    }
  ]
}
/**
 * @namespace lineLegend 折线图 小图例
 * @param selectedCity  城市默认状态 是 显示 还是 不显示
 * **/
let lineLegend = function(selectedCity){
  return {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    selectedMode: 'multiple',
    selected: selectedCity,
    textStyle: textStyle("bold",15)
  }
}
/**
 * @namespace lineXaxis 折线图 x轴样式 和 数值
 * @param indicatorValue  季度(周期)值 
 * **/
let lineXaxis = function(indicatorValue){
  return {
    axisLine: {
      show: true,
      lineStyle: lineStyle("#fff",1)
    },
    axisLabel: {
      show: true,
      textStyle: textStyle("normal",12),
      nameTextStyle: textStyle("bold",12)
    },
    data: indicatorValue,//该指标的周期值（指标值）
    name: "季度"
  }
}
/**
 * @namespace lineYaxis 折线图 y轴 样式和数值
 * @param indexUnit  指标单位 
 * **/
let lineYaxis = function(indexUnit){
  return {
    type: 'value',
    axisLabel: {
      formatter: '{value} '
    },
    axisLine: {
      lineStyle: lineStyle("#fff",1)
    },
    textStyle: textStyle("normal",12),
    nameTextStyle: textStyle("bold",12),
    name: indexUnit,
    splitLine: {
      show: true,
      lineStyle: lineStyle("#1B283E",1)
    },
    min: 70
  }
}

// 雷达图
/**
 * @namespace radarLegend 雷达图 小图例
 * @param selectedCity  城市默认状态 是 显示 还是 不显示
 * **/
let radarLegend = function(selectedCity){
  return {
    type: 'scroll',
    orient: 'vertical',
    right: 150,
    selectedMode: 'multiple',
    selected: selectedCity,
    textStyle: textStyle("bold",15)
  }
}

// 地图
let mapTooltip = function(){
  return {
    trigger: 'item',
    formatter: '{b}<br/>得分：{c} ',
    textStyle: textStyle("bold",14)
  }
}
let mapSeries = function(datas){
  return [
    {
      type: 'map',
      top: '10%',
      mapType: '河南',
      roam: false,//鼠标缩放和平移漫游
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          color:'red'
        }
      },
      data: datas,
      zoom: 1.25
    }
  ]
}

let pdChart ={//所有方法的集合
  init,//传入子指标/指标值，获取对应索引号，通用
  title,
  textStyle,
  barTooltip,
  barGrid,
  barXaxis,
  barYaxis,
  barSeries,
  firstPieTooltip,
  firstPieLegend,
  firstPieSeries,
  lineTooltip,
  lineDataZoom,
  lineLegend,
  lineXaxis,
  lineYaxis,
  radarLegend,
  mapTooltip,
  mapSeries
}
export default pdChart;