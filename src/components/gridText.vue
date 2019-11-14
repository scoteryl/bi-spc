<template>
  <div class="gridText">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}} 
      <!-- <button @click="clickMe">clickMe</button> -->
    </div>
    <div 
      class="gridItemView" 
      :class="{hasTit: options.titleIsShow}"
      :style="{backgroundColor: options.bgColor||'transparent'}"
    >
      <div class="textView" contenteditable='true'></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gridText',
  data: function(){
    return {
      // loading
      loadHandle: null,
      // 节流更新句柄
      changeTimer: null,
      // 富文本DOM元素
      textDomEl: null
    }
  },
  props: {
    viewW: Number, 
    viewH: Number,
    options: Object,
  },
  watch: {
    // 监听传参变化，更新视图
    options: {
      handler: function(newVal, oldVal){
        // console.log('options变化了',newVal);
        
        // 浏览器变化  更新视口
      },
      deep:true
    }
  },
  mounted: function(){
    // 获取富文本DOM视口元素
    this.textDomEl = this.$el.querySelector('.textView');
    // 初始化富文本插件
    console.log(CKEDITOR);
    this.initTextComponent();
    console.log('textComponent', this.textDomEl);
  },
  methods: {
    // 初始化 text 组件
    initTextComponent: function(){
      // 启用内联编辑
      window.CKEDITOR.disableAutoInline = true;
      window.CKEDITOR.inline(this.textDomEl);
    }

  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridText{
  // 基本设置样式
  .gridItem();
  >.gridItemView{
    >.textView{
      height: 100%;
      overflow: auto;
    }
  }

}
</style>