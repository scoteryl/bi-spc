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
  created: function(){
    // 保存初始化视口宽/高,并记录到vuex
    this.$store.state.windowViewW = window.innerWidth;
    this.$store.state.windowViewH = window.innerHeight;
    window.onresize = () => {
      this.$store.state.windowViewW = window.innerWidth;
      this.$store.state.windowViewH = window.innerHeight;
    }
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
