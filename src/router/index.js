import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import Home from '../components/Home.vue'
import Raw from '../components/subcomponents/data/Raw.vue'
import Cluster from '../components/subcomponents/data/Cluster.vue'
import Analysis from '../components/subcomponents/data/Analysis.vue'
import Jurisdiction from '../components/subcomponents/management/Jurisdiction.vue'
import Index from '../components/subcomponents/management/Index.vue'
import Port from '../components/subcomponents/management/Port.vue'
import Operation from '../components/subcomponents/management/Operation.vue'
import DataAnalysis from '../components/subcomponents/management/DataAnalysis.vue'
import Forecast from '../components/subcomponents/management/Forecast.vue'
import Interface from '../components/subcomponents/management/Interface.vue'
import User from '../components/subcomponents/management/User.vue'
import Message from '../components/subcomponents/management/Message.vue'
import Bar from '../components/echarts/Bar.vue'
import FirstPie from '../components/echarts/FirstPie.vue'
import SecondPie from '../components/echarts/SecondPie.vue'
import Line from '../components/echarts/Line.vue'
import Radar from '../components/echarts/Radar.vue'
import Map from '../components/echarts/Map.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: Home,
    redirect: '/home/pie',
    children: [
      {
        path: 'pie',
        name: '饼图',
        component: FirstPie
      },
      {
        path: 'subpie',
        name: '二级饼图',
        component: SecondPie
      },
      {
        path: 'bar',
        name: '柱形图',
        component: Bar
      },
      {
        path: 'line',
        name: '折线图',
        component: Line
      },
      {
        path: 'radar',
        name: '雷达图',
        component: Radar
      },
      {
        path: 'map',
        name: '雷达图',
        component: Map
      }
    ]
  },
  {
    path: '/raw',
    name: '原始数据展示',
    component: Raw
  },
  {
    path: '/cluster',
    name: '聚类数据显示',
    component: Cluster
  },
  {
    path: '/analysis',
    name: '分析结果展示',
    component: Analysis
  },
  {
    path: '/jurisdiction',
    name: '权限管理',
    component: Jurisdiction
  },
  {
    path: '/index',
    name: '指标设定',
    component: Index
  },
  {
    path: '/port',
    name: '数据导入、导出',
    component: Port
  },
  {
    path: '/operation',
    name: '数据操作',
    component: Operation
  },
  {
    path: '/dataAnalysis',
    name: '数据分析',
    component: DataAnalysis
  },
  {
    path: '/forecast',
    name: '指标预测',
    component: Forecast
  },
  {
    path: '/interface',
    name: '接口管理',
    component: Interface
  },
  {
    path: '/user',
    name: '用户管理',
    component: User
  },
  {
    path: '/message',
    name: '邮件箱',
    component: Message
  }
]

const router = new VueRouter({
  routes
})
export default router
