<template>
  <div class="gridPic">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}}</div>
    <div class="gridItemView" :class="{hasTit: options.titleIsShow}"
      @dblclick="selImgFile"
      >
      <el-image
        v-if="imgUrl"
        style="width: 100%; height: 100%"
        :src="imgUrl"
        :fit="options.imgStyle">
      </el-image>
      <span v-else>双击上传图片</span>
      <div class="imgInput"><input ref="imgFileInput" @change="uploadFile($event)" accept="image/*" type="file"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gridPic',
  data: function(){
    return {
      // loading
      loadHandle: null,
      // 节流更新句柄
      changeTimer: null,
      // 图片获取input
      imgFileInput: null,
      // 图片展示地址
      imgUrl: '',
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
    selImgFile: function(){
      // console.log(this.$refs.imgFileInput);
      // 激活input 选取文件
      this.$refs.imgFileInput.click();
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
  },
  mounted: function(){
    // 初始化分页
    // this.initPage();
  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridPic{
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