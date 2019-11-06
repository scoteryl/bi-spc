<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'appPage',
  data: function(){
    return {}
  },
  methods: {
    // clickMe: function(){
    //   // this.$message.closeAll();
    //   // this.$message('这是一条消息');
    // }
  }
}
</script>
<style lang="less">
@import url(./common/normal.css);
@import url(./common/amendStyle.less);

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // // text-align: center;
  // color: #2c3e50;
  height: 100%;
  // overflow: auto;
  position: relative;
}
</style>
