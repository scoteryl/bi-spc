<template>
  <div id="statementPage">

    <ul>
      <li>
        <router-link to="/statement/classify">分类列表</router-link>
      </li>
      <li>
        <router-link :to='"/statement/config?id="+rnd()'>报表配置</router-link>
      </li>
      <li>
        <router-link :to='"/statement/legend?id="+rnd()'>图例配置</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'statementPage',
  data: function(){
    return {
      // 顶部导航
      topNav: [
        {
          name: '分类列表',
          path: '/statement/classify'
        }
      ],
      // 跳转报表ID
      jumpStatementId: ''
    }
  },
  methods: {
    getTopNav: function(route){
      console.log(route);
      var that = this;
      // 分类执行方法
      var switchFun = {
        'statementClassify': function(){

        },
        'statementConfig': function(){
          that.jumpStatementId = route.query.id;
          that.topNav[1] = {
            name: ''
          } 
        },
        'legendConfig': function(){

        }
      }
      // 执行
      switchFun[route.name]();
    },
    rnd: function(){
      return Math.random()*100|0;
    }
  },
  watch: {
    $route: function(newVal, oldVal){
      console.log(newVal);
      this.getTopNav(newVal)
    }
  }
}
</script>
<style lang="less">
@import url(../../common/base.less);

#statementPage{
  color: @textColor;
}
</style>