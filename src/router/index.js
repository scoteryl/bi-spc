import Vue from 'vue'
import VueRouter from 'vue-router'

// 报表模块
const Statement = resolve => require(['../views/statement/statement.vue'], resolve);
// 报表  分类列表
const StatementClassify = resolve => require(['../views/statement/statementClassify.vue'], resolve);
// 报表  报表配置
const StatementConfig = resolve => require(['../views/statement/statementConfig.vue'], resolve);
// 报表  图例配置
const LegendConfig = resolve => require(['../views/statement/legendConfig.vue'], resolve);


Vue.use(VueRouter)

const routes = [
  {
    path: '/statement',
    name: 'statementModel',
    component: Statement,
    children: [
      {
        path: 'classify',
        name: 'statementClassify',
        component: StatementClassify
      },{
        path: 'config',
        name: 'statementConfig',
        component: StatementConfig
      },{
        path: 'legend',
        name: 'legendConfig',
        component: LegendConfig
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
