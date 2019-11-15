<template>
  <div id="statementPage">
    <div class="topNav">
      <ul>
        <li v-for="(item,index) in topNav" :key="index">
          <router-link v-if="item.path" :to="item.path">{{item.name}}</router-link>
          <span v-else>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="statementView">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'statementPage',
  data: function(){
    return {
      // 顶部导航
      topNav: [],
      // 跳转报表ID
      jumpStatementId: ''
    }
  },
  created: function(){
    // console.log(this.$route);
    // 设置头部导航
    this.getTopNav(this.$route);
  },
  methods: {
    getTopNav: function(route){
      // console.log(route);
      var that = this;
      that.topNav = [{
        name: '分类列表',
        path: '/statement/classify'
      }];
      // 分类执行方法
      var switchFun = {
        'statementClassify': function(){
          that.topNav.length = 1;
          that.jumpStatementId = '';
          that.topNav[0].path = '';
        },
        'statementConfig': function(){
          if(route.query && route.query.sid){
            that.jumpStatementId = route.query.sid;
            that.topNav.push({
              name: '报表配置',
              path: ''
            })  ;
          }else{
            // 参数不全
            that.$router.replace('/statement/classify');
          }
        },
        'legendConfig': function(){
          if(route.query && (route.query.sid!==undefined && route.query.sid!=='') && (route.query.tid!==undefined && route.query.tid!=='')){            
            that.jumpStatementId = route.query.sid;
            that.topNav.push({
              name: '报表配置',
              path: '/statement/config?sid='+that.jumpStatementId
            });
            that.topNav.push({
              name: '图例配置',
              path: ''
            });
          }else{
            // 参数不全
            that.$router.replace('/statement/classify');
          }
        },
        'searchLegendConfig': function(){
          if(route.query && (route.query.sid!==undefined && route.query.sid!=='') && (route.query.tid!==undefined && route.query.tid!=='') ){
            that.jumpStatementId = route.query.sid;
            that.topNav.push({
              name: '报表配置',
              path: '/statement/config?sid='+that.jumpStatementId
            });
            that.topNav.push({
              name: '查询组件配置',
              path: ''
            });
          }else{
            // 参数不全
            that.$router.replace('/statement/classify');
          }
        }
      }
      // 执行
      if(route.name=='statementModel'){
        that.topNav[0].path = '';
        that.$router.replace('/statement/classify');
      }else{
        switchFun[route.name]();
      }
    }
  },
  watch: {
    // 监听路由变化，变更顶部导航
    $route: function(newVal, oldVal){
      // console.log(newVal);
      // 根据不同的
      this.getTopNav(newVal);
    }
  }
}
</script>
<style lang="less">
@import url(../../common/base.less);

#statementPage{
  box-sizing: border-box;
  padding: 5px;
  height: 100%;
  background-color: @modelBGColor;
  >.topNav{
    padding: 5px;
    background-color: @modelPartitionBGColor;
    border-radius: 5px;
    >ul{
      .clearfix();
      >li{
        position: relative;
        float: left;
        padding: 0 5px;
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        font-size: 12px;
        &:not(:last-child){
          padding-right: 15px;
          &:before{
            content: ">";
            position: absolute;
            right: 0;
            top: 3px;
            width: 10px;
            height: 14px;
            line-height: 14px;
            text-align: center;
          }
        }
      
        >a{
          display: block;
          color: @linkActiveFontColor;
        }
        >span{
          display: block;
          color: @linkFontColor;
        }
      }
    }
  }

  >.statementView{
    margin-top: 5px;
    height: calc(100% - 35px);
    // background-color: @modelPartitionBGColor;
  }
  // color: @textColor;
}
</style>