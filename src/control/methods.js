//引入json数据
import bar from './json/bar.json'
import firstPie from './json/firstPie.json'
import secondPie from './json/secondPie.json'
import line from './json/line.json'

/**
 * @namespace getModuleName 获取指标名称  用处：通用
 * **/
let getModuleName= function(){
  return bar.indexInfo.indexName
}
/**
 * @namespace getUnit 获取指标单位  用法：通用
 * **/
let getUnit = function(chartType){
  if(chartType == "bar"){
    return bar.indexInfo.unit
  }
}

/**
 * @namespace getCitysName 获取18地市名  用处：柱形图 x 轴
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let getCitysName = function(cityArry) {
  let cityNames = [];
  for (let i=0; i<18; i++){
    cityNames.push(cityArry[i].cityName);
  }
  return cityNames;
}
/**
 * @namespace allCitysScore 获取18地市得分  用处：柱形图得分
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let allCitysScore = function(cityArry){
  let citysScore = [];
  for(let i=0;i<18;i++){
    citysScore.push(cityArry[i].datas);
  }
  return citysScore;
}
/**
 * @namespace getCitysScore 获取(除平顶山市以外)17地市得分  用处：柱形图 series1
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let getCitysScore = function(cityArry) {
  let citysScore = []; // 获取城市得分
  let scoreData;
  for (let i = 0; i < 18; i++) {
    if(cityArry[i].cityName == "平顶山"){
      scoreData = 0;
    }else{
      scoreData = cityArry[i].datas;
    }
    citysScore.push(scoreData);
  }
  return citysScore;
}
/**
 * @namespace getPDScore 获取平顶山市得分  用处：柱形图 series2
 * @param cityArry  18地市数组(排序/非排序)
 * **/
let getPDScore = function(cityArry) {
  let citysScore = []; // 获取城市得分
  let scoreData;
  for (let i = 0; i < 18; i++) {
    if(cityArry[i].cityName == "平顶山"){
      scoreData = cityArry[i].datas;
    }else{
      scoreData = 0;
    }
    citysScore.push(scoreData);
  }
  return citysScore;
}
/**
 * @namespace getOverAvg 求诚实得分超过平均分多少(低于平均分置为0))  用处：柱形图 series3
 * @param citysScore  所有城市得分
 * **/
let getOverAvg = function(citysScore) {
  let avg = bar.cityScore[20].datas;
  let overAvg = [];
  for(let i=0; i<18; i++) {
      let result = parseFloat(( citysScore[i]- avg).toFixed(2));
      if (result < 0) {
        result = 0;
      }
      overAvg.push(result);
  }
  return overAvg;
}
/**
 * @namespace getOverAvg 求诚实得分低于平均分多少(高于平均分置为0))  用处：柱形图 series3
 * @param citysScore  所有城市得分
 * **/
let getBelowAvg = function(citysScore) {
  let avg = bar.cityScore[20].datas;
  let belowAvg = [];
  for(let i=0; i<18; i++) {
      let result = parseFloat(( citysScore[i]- avg).toFixed(2));
      if (result < 0) {
        result = Math.abs(result);
      }else{
        result = 0;
      }
      belowAvg.push(result);
  }
  return belowAvg;
}
/**
 * @namespace sortCity 对所有城市得分进行排序  用处：柱形图 series3
 * @param symbol  比较符 
 * **/
let sortCity = function(symbol){
  let sortCityScore = []; // 数组中包含 cityName 跟 datas
  for (let i=0;i<18;i++){
      sortCityScore.push(bar.cityScore[i]);
  }
  if(symbol != undefined ){
    if(symbol === '<'){
      for (let i = 0; i < sortCityScore.length - 1; i++) {
        for (let j = 0; j < sortCityScore.length - 1 - i; j++) {
          if (sortCityScore[j].datas > sortCityScore[j + 1].datas) {
            let temp = sortCityScore[j]
            sortCityScore[j] = sortCityScore[j + 1]
            sortCityScore[j + 1] = temp
          }
        }
      }
    }else if (symbol === '>'){
      for (let i = 0; i < sortCityScore.length - 1; i++) {
        for (let j = 0; j < sortCityScore.length - 1 - i; j++) {
          if (sortCityScore[j].datas < sortCityScore[j + 1].datas) {
            let temp = sortCityScore[j]
            sortCityScore[j] = sortCityScore[j + 1]
            sortCityScore[j + 1] = temp
          }
        }
      }
    }
  }
  return sortCityScore;
}


let firstPieData = function(){
  let tarArry = [];
  let pieData = firstPie.ModuleValue;
  for(let i=0;i<pieData.length;i++){
    let targetName = pieData[i].module;
    let targetScore = pieData[i].value;
    tarArry.push({
        name:targetName,
        value:targetScore
    })
  }
  return tarArry;
}

let getIndexOfModule = function(){
  let tarArry = [];
  let pieSeriesData = secondPie.quality;
  for(let i=0;i<pieSeriesData.length;i++){
    let targetName = pieSeriesData[i].indicators;
    let targetScore = pieSeriesData[i].avg;
    tarArry.push({
        name:targetName,
        value:targetScore
    })
  }
  return tarArry;
}


let indexAllScore = function(){
  let allScore = [];
  let pieData = firstPie.ModuleValue;
  for(let i=0;i<pieData.length;i++){
    allScore.push(pieData[i].allscore)
  }
  return allScore;
}

//折线图
let getIndicatorValue = function(){
  let indicatorData = line.indexCycle.time;
  let newIndex = [];
  for (let i=0;i<indicatorData.length;i++){
      if (indicatorData[i] != '期初值'){
          newIndex.push(indicatorData[i]);
      }
  }
  return newIndex;
}
let getLineUnit = function(){
  return line.indexInfo.unit
}
let getLineData = function(){
  let tarArry = [];
  let lineSeriesData = line.cityScore;
  for(let i=0;i<18;i++){
      let targetName = lineSeriesData[i].cityName;
      let targetScore = lineSeriesData[i].dataList;
      tarArry.push({
          name: targetName,
          type: 'line',
          data: targetScore
      })
  }
  return tarArry;
}

let funct ={//所有方法的集合
  getModuleName, //传入子指标/指标值，获取对应索引号，通用
  getUnit,
  getCitysName,
  allCitysScore,
  getCitysScore,
  getPDScore,
  getOverAvg,
  getBelowAvg,
  sortCity,

  firstPieData,
  indexAllScore,

  getIndexOfModule,

  getIndicatorValue,
  getLineUnit,
  getLineData
}
export default funct;