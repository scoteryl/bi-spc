<template>
  <div class="gridTime">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}}</div>
    <div 
      class="gridItemView" 
      :class="{hasTit: options.titleIsShow}"
      :style="{backgroundColor: options.bgColor||'transparent'}"
      >
      <p :style="{fontSize: options.fontNum+'px',color: options.color,fontWeight: options.fontBold?'bold':'normal'}">
        <span>{{timeShowStr}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gridTime',
  data: function(){
    return {
      // loading
      loadHandle: null,
      // 节流更新句柄
      changeTimer: null,
      // 时间更新定时器
      timeHandle: null,
      // 展示时间字符
      timeShowStr: '',
    }
  },
  props: {
    viewW: Number, 
    viewH: Number,
    options: Object,
  },
  created: function(){
    // console.log(this.options);
    // 初始化时间组件
    this.initTimeComponent();
  },
  watch: {
    // 监听传参变化，更新视图
    options: {
      handler: function(newVal, oldVal){
        // console.log('options变化了',newVal);
        
        // 浏览器变化  更新视口
        this.initTimeComponent();
      },
      deep:true
    }
  },
  methods: {
    // 初始化日期组件
    initTimeComponent: function(){
      this.timeShowStr = new Date().Format(this.options.timeFormat.label);
      this.timeHandle = setInterval(()=>{
        this.timeShowStr = new Date().Format(this.options.timeFormat.label);
      },1000);
    }
  },
  beforeDestroy: function(){
    // console.log('被销毁了');
    // 销毁前注销定时器
    if(this.timeHandle){
      clearInterval(this.timeHandle);
    }
  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridTime{
  // 基本设置样式
  .gridItem();
  >.gridItemView{
    text-align: center;
    >p{
      display: inline-table;
      height: 100%;
      >span{
        display: table-cell;
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
      // vertical-align: middle;
    }
  }
}
</style>