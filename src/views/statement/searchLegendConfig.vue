<template>
  <div id="searchLegendConfigPage">
    <div class="configView">
      <!-- 数据库分类字段树 -->
      <div class="dataTree">
      
      </div>
      <!-- 报表图例树 -->
      <div class="legendTree">

      </div>
      <!-- 主配置视口 -->
      <div class="mainView">
        <!-- 关联区域 -->
        <div class="relevancy">

        </div>
        <!-- 组件设置 -->
        <div class="componentConfig">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchLegendConfigPage',
  data: function(){
    return {}
  },
  methods: {

  }
}
</script>
<style lang="less">
@import url(../../common/base.less);

#searchLegendConfigPage{
  height: 100%;
  
}

</style>