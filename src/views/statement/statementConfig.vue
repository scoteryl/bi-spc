<template>
  <div id="statementConfigPage">
    <div class="topOption">
      <div class="systemConfigBtn" @click="clickMe"><img src="../../images/system_icon.png"><span>系统设置</span></div>
      <div class="optionList swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <div class="optionItem" @click='addLegend("chart")'>
              <img src="../../images/chart_icon.png">
              <span>图例</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem" @click='addLegend("table")'>
              <img src="../../images/tab_icon.png">
              <span>表格</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem" @click='addLegend("pic")'>
              <img src="../../images/pic_icon.png">
              <span>图片</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem" @click='addLegend("text")'>
              <img src="../../images/text_icon.png">
              <span>文本框</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem" @click='addLegend("video")'>
              <img src="../../images/video_icon.png">
              <span>视频<br>音频</span>
            </div>
          </li>
          <li class="swiper-slide">
            <div class="optionItem" @click='addLegend("web")'>
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
    <div class="configMain">
      <div class="systemConfig">

      </div>
      <div class="drapView">
        
        <grid-layout
          :layout.sync="layout"
          :col-num="gridConfig.colNum"
          :row-height="gridConfig.height"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :margin="gridConfig.margin"
          :use-css-transforms="false"
          @layout-updated="layoutUpdatedEvent"
          @layout-ready="layoutReadyEvent"
          ref="gridLayout"
          >
          <grid-item v-for="(item,idx) in layout"
            class="item"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="idx"
            :static="item.isStatic"
            @resized="gridViewChange"
            drag-allow-from=".drapBorder"
            drag-ignore-from=".itemView"
            >
            <div class="drapBorder">
              <div class="itemView" 
                :class="item.linkModel"
                >
                <div class="itemTopMenu">
                  <ul>
                    <li @click="configItem(item)" title="配置"><span class="fa fa-cogs"></span></li>
                    <li @click="removeItem(item)" title="删除"><span class="fa fa-trash"></span></li>
                  </ul>
                </div>
                <!-- 根据不同类型，加载不同组件 -->
                <component 
                  :is="gridItemComponent(item.type)"
                  :viewW="item.w"
                  :viewH="item.h"
                  :options="item.options"
                >
                </component>
                <!-- 富文本编辑
                <div 
                  class="editTextView" 
                  v-if="item.type==1" 
                  :id="'text'+item.i" 
                  contenteditable='true' 
                  @focus="offResize(item)"
                  @blur="onResize(item)"
                ></div>
                关联蒙层 -->
                <div class="layer" @click="setLink(item)">
                  <div v-if="item.isLink && item.linkModel!='linkMain'" class="topMenu">编辑依赖字段</div>
                  <div v-if="item.linkModel!='linkMain'" class="sign" :class="{on: item.isLink}"></div>
                </div>
              </div>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';

// 图例组件
const GridChart = () => import('../../components/gridChart.vue');
// 表格组件
const GridTable = () => import('../../components/gridTable.vue');
// 图片组件
const GridPic = () => import('../../components/gridPic.vue');
// 富文本组件
const GridText = () => import('../../components/gridText.vue');
// 音\视频组件
const GridVideo = () => import('../../components/gridVideo.vue');
// web组件
const GridWeb = () => import('../../components/gridWeb.vue');



export default {
  name: 'statementConfigPage',
  data: function(){
    return {
      // 顶部导航 swiper
      topOptionSwiper: null,
      // 节流定时器
      throttleTimer: null,
      // 顶部组件弹窗
      topVisible: false,

      id: 0,
      // 布局位置数据
      layout: [],
      // 布局二维数组地图
      layoutMap: [],
      // 布局列数
      layoutColNum: 50,
      // grid布局设置
      gridConfig: {
        margin: [2, 2],
        colNum: 50,
        height: 20
      }
    }
  },
  methods: {
    // 是否可以拖拽
    gridDrap: function(item, state){
      // console.log(item,state);
      // item.isStatic = !state;
      // this.layout.forEach(one => {
      //   if(one.)
      // });
    },
    clickMe: function(){
      this.layout[0].options.title = 12356;
    },
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
      
    },
    // 动态加载组件
    gridItemComponent: function(type){
      var components = {
        'chart': GridChart,
        'table': GridTable,
        'pic': GridPic,
        'text': GridText,
        'video': GridVideo,
        'web': GridWeb
      }
      return components[type];
    },
    // 添加项目
    addLegend: function(type){
      var that = this;
      var backFun = {
        'chart': function(){
          that.addGridItem(that.id++, type, 8, 5);
        },
        'table': function(){
          that.addGridItem(that.id++, type, 8, 5);

        },
        'pic': function(){
          that.addGridItem(that.id++, type, 8, 5);

        },
        'text': function(){
          that.addGridItem(that.id++, type, 8, 5);
        },
        'video': function(){
          that.addGridItem(that.id++, type, 8, 5);
        },
        'web': function(){
          that.addGridItem(that.id++, type, 8, 5);
        },
      }
      // 分类执行
      backFun[type]();
    },
    // grid视口被拖拽变更
    gridViewChange: function(i, newH, newW, newHPx, newWPx){
      this.layout.forEach(item => {
        if(item.i == i){
          // 更新时间戳
          item.options.updataTime = this.updateTimes();
        }
      });
    },
    // 添加grid项目   gid 项目ID  type 类型  宽  高
    addGridItem: function (gid, type, itemW, itemH) {
      // console.log(type);
      // 产生随机宽高
      // var itemW = 8;
      // var itemH = 5;
      var addItem = {
        "x": 0,
        "y": this.layoutMap.length,
        "w": itemW,
        "h": itemH,
        // ID
        "i": gid,
        // 类型 1 富文本编辑框
        "type": type,
        // 关联状态蒙层class
        "linkModel": '',
        // 是否静态不可编辑
        "isStatic": false,
        // 是否联动项目
        "isLink": false,
        // options
        "options": {
          "title": "我是标题",
          "titleIsShow": true,
          // 更新时间戳
          "updataTime": this.updateTimes()
        }
      };
      if(this.layoutMap.length){
        // console.log(this.layoutMap.length);
        for(let r = 0 , rLen =this.layoutMap.length ; r < rLen; r++){
          for(let c = 0; c <= (this.gridConfig.colNum-itemW); c++){
            let res = this.regionalTest(
              c, 
              r, 
              itemW, 
              rLen>(r+itemH)?itemH:rLen-r
            );

            if(res.result){
              // 更新添加数据内容
              addItem = {
                "x": res.x,
                "y": res.y,
                "w": itemW,
                "h": itemH,
                "i": gid,
                "type": type,
                "linkModel": '',
                "isStatic": false,
                "isLink": false,
                "options": {
                  "title": "我是标题",
                  "titleIsShow": true,
                  "updataTime": this.updateTimes()
                }
              };

              c = this.gridConfig.colNum+1;
              r = rLen+1;
            }else{
              c = res.offsetX;
            }
          }
        }
      }

      // 更新二维数组地图
      for(let itemR = 0 ; itemR < itemH ; itemR++){
        for(let itemC = 0 ; itemC < itemW ; itemC++){
          // console.log(itemC,itemR);
          // 如果没有该行，初始化
          if(!this.layoutMap[addItem.y+itemR]){
            this.layoutMap[addItem.y+itemR] = new Array(this.gridConfig.colNum);
            for(let i = 0 ;i < this.gridConfig.colNum ; i++){
              this.layoutMap[addItem.y+itemR][i] = 0;
            }
          }
          // 标记点
          this.layoutMap[addItem.y+itemR][addItem.x+itemC] = 1;
        }
      }
      
      // 添加数据
      this.layout.push(addItem);

      return addItem.i;

    },
    // 删除项目
    removeItem: function(item){
      // console.log(item);
      for(var i = this.layout.length-1;i>=0;i--){
        var one = this.layout[i];
        if(item.i==one.i){
          this.layout.splice(i,1);
          break;
        }
      }
      // 当插件内容布局发生变化后  获取现在的二维地图树
      this.$nextTick(function(){
        this.layoutMap = this.genereatePlaneArr(this.layout);
      });
    },
    // 配置项目
    configItem: function(item){
      // console.log(item);
      for(var i = this.layout.length-1;i>=0;i--){
        var one = this.layout[i];
        if(item.i==one.i){
          one.options.titleIsShow = !one.options.titleIsShow;
          break;
        }
      }
    },
    // 生成二维数组地图
    genereatePlaneArr: function (data) {
      var map = [];
      if(Array.isArray(data)){
        for(var i = 0; i<data.length; i ++){
          var one = data[i];
          // 循环行
          for(var r = one.y ; r < ( one.y + one.h ) ; r++){
            // 循环列
            for(var c = one.x ; c < ( one.x + one.w) ; c++){
              // 检修当前行是否存在 
              if(!map[r]){
                map[r] = new Array(this.gridConfig.colNum);
                
                for(let i = 0 ; i < this.gridConfig.colNum ; i++){
                  map[r][i] = 0;
                }
              }
              // 占据为1
              map[r][c] = 1;
            }
          }
        }
      }
      return map;
    },
    // 区域检测 x,y 二维数据地图起始坐标点  w,h 检测区域宽高
    regionalTest: function (x,y,w,h) {
      // console.log("~~~~~~~")
      // console.log(x,y,w,h);
      // 定义返回 x,y 偏移 及 是否有空位置
      let offsetX = 0,offsetY = 0,res = true;
      // 按区域循环检测 二维数组地图
      for(let r = 0; r < h ;r++){
        for(let c = 0; c < w ;c++){
          let point = this.layoutMap[y+r]?this.layoutMap[y+r][x+c]:0;
          // 如该点被占据 记录偏移值
          if(point===1){
            res = false;
            offsetX = offsetX>(x+c)?offsetX:x+c;
            offsetY = offsetY>(y+r)?offsetY:y+r;
          }
        }
      }

      return {
        result: res,
        offsetX: offsetX,
        x: x,
        y: y
      };
    },
    // 组件更新完成生命周期
    layoutReadyEvent: function(newLayout) {
      // console.log("4Ready");
      // console.log(this.layout);
      // 当插件加载完成后  获取现在的二维地图树
      this.layoutMap = this.genereatePlaneArr(this.layout);
    },
    layoutUpdatedEvent: function(newLayout) {
      // console.log("Updated",newLayout);
      // console.log(this.layout);

      // console.log('数据变化了');
      
      // 当插件内容布局发生变化后  获取现在的二维地图树
      this.layoutMap = this.genereatePlaneArr(this.layout);
      
      // console.log(this.layoutMap);
    },
    // 更新时间戳
    updateTimes: function(){
      return parseInt(new Date().getTime()+''+this.rnd(100,999));
    },
    // 返回随机数
    rnd: function (m,n) {
      return (Math.random()*(m-n+1)+n)|0;
    },
    // refGrid: function () {
    //   // console.log(this.$refs.gridLayout);
    //   this.resizeFun = this.$refs.gridLayout.resizeEvent;
    //   this.$refs.gridLayout.resizeEvent = (...agrs) => {
    //     // console.log(agrs);
    //     this.resizeFun(...agrs);
    //   }
    // },
    // // 添加文本编辑控件
    // addtextEdit: function () {
    //   var index = this.addItem(this, 1);
    //   console.log(index);
    //   this.$nextTick(function (){
    //     // window.CKEDITOR.replace(document.querySelector('#text'+index));
    //     // 启用内联编辑
    //     CKEDITOR.disableAutoInline = true;
    //     CKEDITOR.inline(document.querySelector('#text'+index));
    //   });
    // },
    // // 查看文本内容
    // watchTextContent: function(){
    //   // console.log(this.textContent);
    // },
    // offResize: function(item){
    //   item.isStatic = true;
    // },
    // // 当模块视口失焦里获取内容
    // onResize: function(item){
    //   console.log("内容变更");
    //   item.isStatic = false;
    // },
    // // 设置联动
    // setAssociated: function(item){
    //   // console.log(item);
    //   this.layout.forEach(one => {
    //     // return item.linkModel = 
    //     one.isStatic = true;
    //     if(item.i==one.i){
    //       one.linkModel = 'linkMain';
    //       one.isLink = true;
    //     }else{
    //       one.linkModel = 'linkLayer';
    //     }
    //   });
    // },
    // // 取消关联
    // cancelAssociated: function(){
    //   this.layout.forEach(one => {
    //     one.linkModel = "";
    //     one.isStatic = false;
    //   });
    // },
    // // 选取关联
    // setLink: function(item){
    //   if(item.linkModel != 'linkMain'){
    //     item.isLink = !item.isLink;
    //   }
    // },
      
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
        // 视口变化 初始化顶部组件列表
        this.initTopOptions((viewWidth/85)|0);
        this.throttleTimer = null;
        // 遍历grid项目，更新时间戳
        this.layout.forEach(item => {
          item.options.updataTime = this.updateTimes();
        });
      },200);
    }
  },
  mounted: function(){
    // 初始化顶部组件列表
    var viewWidth = document.querySelector("#statementConfigPage .optionList").offsetWidth;
    this.initTopOptions((viewWidth/85)|0);
  },
  components: {
    // vue-gril-layout
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,

    // grid-legend
    GridChart,
    GridTable,
    GridText,
    GridPic,
    GridVideo,
    GridWeb,
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

  >.configMain{
    margin-top: 10px;
    // padding: 10px;
    height: calc(100% - 50px);
    border-radius: 5px;
    background-color: @modelPartitionBGColor;
    >.drapView{
      .item{
        box-sizing: border-box;
        background-color: #aaa;
        height: 100%;
        transition: none;
        >.drapBorder{
          padding: 5px;
          height: 100%;
          >.itemView{
            box-sizing: border-box;
            position: relative;
            height: 100%;
            overflow: hidden;
            
            >.itemTopMenu{
              position: absolute;
              top: -100%;
              /* left: 0; */
              right: 0;
              height: 30px;
              /* background: rgba(100,100,100,.4); */
              background: transparent;
              transition: all 0.2s linear;
              padding: 0 10px;
              z-index: 10;
              >ul{
                float: right;
                padding: 5px 0;
                >li{
                  float: left;
                  padding: 0 5px;
                  height: 20px;
                  line-height: 20px;
                  font-size: 18px;
                  text-align: center;
                }
              }
            }
            &:hover>.itemTopMenu{
              top: 0;
            }
          }
        }
      }
    }
  }
}
</style>