<template>
  <div class="gridChart">
    <div v-if="options.titleIsShow" class="gridTit">{{options.title}}</div>
    <div class="echartView" :class="{hasTit: options.titleIsShow}"></div>
  </div>
</template>
<script>
export default {
  name: 'gridChart',
  data: function(){
    return {
      // loading
      loadHandle: null,
      // echart viewDom
      echartDom: null,
      // 节流更新句柄
      changeTimer: null,
      // echarts handle
      echartsHandle: null,
      // echarts options
      echartOption: {
        color: ['#ccc'],
        // tooltip: {
        //     triggerOn: 'none',
        //     position: function (pt) {
        //         return [pt[0], 130];
        //     }
        // },
        // toolbox: {
        //     left: 'center',
        //     itemSize: 15,
        //     top: 10,
        //     feature: {
        //         dataZoom: {
        //             yAxisIndex: 'none'
        //         },
        //         restore: {}
        //     }
        // },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
      }
    }
  },
  props: {
    viewW: Number, 
    viewH: Number,
    options: Object,
  },
  watch: {
    // // 计算变化
    // viewW: function(newVal, oldVal){
    //   // console.log('视口变化');
    //   // 拖动变更视口大小  更新视口
    //   this.resizeView();
    // },
    // viewH: function(newVal, oldVal){
    //   // console.log('视口变化');
    //   // 拖动变更视口大小  更新视口
    //   this.resizeView();
    // },
    // girdViewChange: function(newVal, oldVal){
    //   // console.log(newVal);
    //   // 浏览器变化  更新视口
    //   this.resizeView();
    // },
    // 监听传参变化，更新视图
    options: {
      handler: function(newVal, oldVal){
        console.log('options变化了',newVal);
        
        // 浏览器变化  更新视口
        this.resizeView();
      },
      deep:true
    }
  },
  mounted: function(){
    // console.log(this);
    // console.log(this.viewW,this.viewH);
    // 创建组件后初始化echarts
    this.echartDom = this.$el.querySelector('.echartView');
    this.initChart();
    // console.log(this.echartDom);

  },
  computed:{
    // // 监听浏览器变化
    // girdViewChange: function(){
    //   return this.$store.state.windowViewW+','+this.$store.state.windowViewH;
    // }
  },
  methods: {
    // 视口变化
    resizeView: function(){
      if(!this.loadHandle){
        // 加载中
        this.loadHandle = this.$loading({
          target: this.$el,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.4)'
        });
      }
      if(this.changeTimer){
        clearTimeout(this.changeTimer);
      }
      this.changeTimer = setTimeout(()=>{
        // console.log('chart 视口变化了');
        // echarts视口变化
        this.echartsHandle.resize();
        // 关闭加载 清空句柄
        this.loadHandle.close();
        this.loadHandle = null;
      }, 200);
    },
    // 初始化
    initChart: function(){
      // 加载中
      this.loadHandle = this.$loading({
        target: this.$el,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
      });
      this.echartsHandle = this.$echarts.init(this.echartDom);
      this.echartsHandle.setOption(this.echartOption, true, false);
      setTimeout(()=>{
        this.echartsHandle.resize();
        // 关闭加载 清空句柄
        this.loadHandle.close();
        this.loadHandle = null;
      },200);
    },
    clickMe: function(){
      console.log(this.options);
    }
  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridChart{
  height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  >.gridTit{
    padding: 0 5px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    background-color: rgba(0,0,0,0.4);
  }
  >.echartView{
    height: 100%;
    &.hasTit{
      height: calc(100% - 25px);
    }
    width: 100%;
  }
}
</style>