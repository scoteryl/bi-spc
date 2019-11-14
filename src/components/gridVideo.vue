<template>
  <div class="gridVideo">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}}</div>
    <div 
      class="gridItemView" 
      :class="{hasTit: options.titleIsShow}"
      :style="{backgroundColor: options.bgColor||'transparent'}"
      @dblclick="selFile"
      >

      <span>双击上传多媒体</span>
      <div class="imgInput"><input ref="fileInput" @change="uploadFile($event)" accept="image/*" type="file"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gridVideo',
  data: function(){
    return {
      // loading
      loadHandle: null,
      // 节流更新句柄
      changeTimer: null,
      // 图片获取input
      videoFileInput: null,
      // 图片展示地址
      videoUrl: '',
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
  methods: {
    // 图片组件初始化
    initImgComponent: function(){

    },
    // 选取图片
    selFile: function(){
      // console.log(this.$refs.imgFileInput);
      // 激活input 选取文件
      this.$refs.fileInput.click();
    },
    // 上传文件
    uploadFile: function(e){
      var file = e.target.files[0];
      // console.log(file,e);
      if(file){
        // 验证
        if(!/^image\//g.test(file.type)){
          this.$message.error("文件类型不正确");
          return;
        }

        // 本地可展示文件
        this.imgUrl = window.URL.createObjectURL(file);
        this.$refs.imgFileInput.value = null;
      }

    }

  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridVideo{
  // 基本设置样式
  .gridItem();

  >.gridItemView{
    position: relative;
    user-select: none;
    >span{
      position: absolute;
      top: 50%;
      left: 50%;
      height: 20px;
      line-height: 20px;
      width: 100px;
      transform: translate(-50%,-50%);
      text-align: center;
    }
    >.imgInput{
      display: none;
    }
  }

}
</style>