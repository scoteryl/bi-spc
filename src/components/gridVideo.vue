<template>
  <div class="gridVideo">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}}</div>
    <div 
      class="gridItemView" 
      :class="{hasTit: options.titleIsShow}"
      :style="{backgroundColor: options.bgColor||'transparent'}"
      @dblclick="selFile"
      >
      <audio v-show="videoUrl && type==1" :id="'audio'+videoDomId" :autoplay="isAutoPlay" :loop="isLoop" class="audioPlayer" controls :src="videoUrl">
        您的浏览器不支持 audio 标签。
      </audio>
      <div :id="'video'+videoDomId" class="videoView" v-show="videoUrl && type==2"></div>
      <span v-show="!videoUrl">双击上传多媒体</span>
      <div class="imgInput"><input ref="fileInput" @change="uploadFile($event)"  type="file"></div>
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
      // 多媒体获取input
      videoFileInput: null,
      // videoId
      videoDomId:"",
      // 限制类型
      limitType: ['audio/mp3','audio/ogg','video/x-flv','video/mp4'],
      // 多媒体类型  0 默认  1 音频   2 视频
      type: 0,
      // 多媒体地址
      videoUrl: '',
      // 自动播放
      isAutoPlay: false,
      // 循环
      isLoop: false,
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
        // console.log(newVal);
        this.isAutoPlay = newVal.control.indexOf("autoplay")!==-1;
        this.isLoop = newVal.control.indexOf("loop")!==-1;
        console.log(this.isAutoPlay,this.isLoop);
        // 初始化播放组件
        this.initVideoComponent();
      },
      deep:true
    },
    // 监听类型变化 
    type: function(newVal, oldVal){
      this.initVideoComponent();

    }
  },
  methods: {
    // 视频播放组件初始化
    initVideoComponent: function(){
      // console.log(this.options.i);
      if(this.type === 2 ){
        var videoObject = {
          container: '#video'+this.videoDomId,  //“#”代表容器的ID，“.”或“”代表容器的class
          variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
          loaded:'loadedHandler',//监听播放器加载成功
          video: this.videoUrl, //视频地址
          autoplay: this.isAutoPlay,
          loop: this.isLoop,
        };
        var player=new ckplayer(videoObject);

      }else{
        if(this.isAutoPlay){
          this.$nextTick(function(){
            document.getElementById('audio'+this.videoDomId).play();
          });
        }
      }


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

        // console.log(this.limitType.indexOf(file.type));
        var fileType = this.limitType.indexOf(file.type);

        // 验证
        if(fileType==-1){
          this.$message.error("文件类型不正确");
          return;
        }

        // 本地可展示文件
        this.type = fileType<2 ? 1:2;
        this.videoUrl = window.URL.createObjectURL(file);
        // console.log(this.type , this.videoUrl);
        this.$refs.fileInput.value = null;
        this.isAutoPlay = this.options.control.indexOf("autoplay")!==-1;
        this.isLoop = this.options.control.indexOf("loop")!==-1;
        // 初始化 播放组件
        this.initVideoComponent();
      }

    }

  },
  mounted: function(){
    // console.log('音视频组件');
    // 设置当前组件的唯一ID
    this.videoDomId = this.$md5(new Date().getTime()+''+(Math.random()*1000|0));
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
    >.videoView{
      height: 100%;
    }
    >.audioPlayer{
      display: block;
      margin: 0 auto;
      height: 100%;
      outline: none;
    }

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