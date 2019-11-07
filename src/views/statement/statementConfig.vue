<template>
  <div id="statementConfigPage">
    <div class="topOption">
      <div class="systemConfigBtn"><img src="../../images/system_icon.png"><span>系统设置</span></div>
      <div class="optionList swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <div class="optionItem">
              <img src="../../images/chart_icon.png">
              <span>图例</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem">
              <img src="../../images/tab_icon.png">
              <span>表格</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem">
              <img src="../../images/pic_icon.png">
              <span>图片</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem">
              <img src="../../images/text_icon.png">
              <span>文本框</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem">
              <img src="../../images/video_icon.png">
              <span>视频<br>音频</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem">
              <img src="../../images/web_icon.png">
              <span>web<br>组件</span>
            </div>
          </li>
          <li class="swiper-slide">
            <el-popover
              placement="bottom"
              width="400"
              v-model="topVisible"
              >
              <div class="popupView">
                <ul>
                  <li><img src=""><span>文本查询</span></li>
                  <!-- <li><img src=""><span>滑块</span></li> -->
                  <li><img src=""><span>日期选取</span></li>
                  <li><img src=""><span>下拉选取</span></li>
                  <li><img src=""><span>数值区间</span></li>
                  <li><img src=""><span>日期区间</span></li>
                </ul>
              </div>
              <div class="optionItem" slot="reference">
                <img src="../../images/search_icon.png">
                <span>查询<br>组件</span>
              </div>
            </el-popover>
          </li>
        </ul>
      </div>
    </div>
    <div class="drapView">

    </div>
  </div>
</template>
<script>
export default {
  name: 'statementConfigPage',
  data: function(){
    return {
      // 顶部导航 swiper
      topOptionSwiper: null,
      // 节流定时器
      throttleTimer: null,
      // 顶部组件弹窗
      topVisible: false
    }
  },
  methods: {
    // 初始化顶部菜单导航   传入一屏展示个数
    initTopOptions: function(num){
      // 如果初始化过swiper则销毁
      if(this.topOptionSwiper){
        this.topOptionSwiper.destroy(false);
      }
      this.topOptionSwiper = new Swiper('.optionList', {
        slidesPerView: num,
        spaceBetween: 5,
      });
    },
    // 选取查询组件
    selSearchComponent: function(){
      this.topVisible = false;
      console.log(this.topVisible);
      
    }
  },
  // 通过计算属性，监听视口变化
  computed: {
    viewChange: function(){
      return this.$store.state.windowViewW+','+this.$store.state.windowViewH;
    }
  },
  watch: {
    viewChange: function(newVal, oldVal){
      // 节流
      if(this.throttleTimer){
        clearTimeout(this.throttleTimer);
      }
      this.throttleTimer = setTimeout(()=>{
        var viewWidth = document.querySelector("#statementConfigPage .optionList").offsetWidth;
        // 视口变化 初始化导航
        this.initTopOptions((viewWidth/85)|0);
        this.throttleTimer = null;
      },200);
    }
  },
  mounted: function(){
    // 视口变化 初始化导航
    var viewWidth = document.querySelector("#statementConfigPage .optionList").offsetWidth;
    this.initTopOptions((viewWidth/85)|0);
  }
}
</script>
<style lang="less">
@import url(../../common/base.less);

#statementConfigPage{
  height: 100%;
  >.topOption{
    padding: 5px 10px;
    background-color: @modelPartitionBGColor;
    border-radius: 5px;
    >.systemConfigBtn{
      float: right;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      user-select: none;
      cursor: pointer;
      >img{
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 3px;
      }
    }
    >.optionList{
      display: block;
      margin-right: 80px;
      height: 30px;
      >ul{
        >li{
          .optionItem{
            width: 75px;
            user-select: none;
            cursor: pointer;
            >img{
              margin-right: 3px;
              float: left;
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
            >span{
              display: table-cell;
              width: 40px;
              height: 30px;
              line-height: 14px;
              font-size: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }

  >.drapView{
    margin-top: 10px;
    padding: 10px;
    height: calc(100% - 50px);
    border-radius: 5px;
    background-color: @modelPartitionBGColor;
  }
}
</style>