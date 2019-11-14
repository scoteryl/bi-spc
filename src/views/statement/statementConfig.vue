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
            <div class="optionItem" @click='addLegend("time")'>
              <img src="../../images/time_icon.png">
              <span>日期</span>
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
          <!-- 查询组件 -->
          <li class="swiper-slide">
            <el-popover
              placement="bottom"
              width="400"
              v-model="topVisible"
              >
              <div class="popupView">
                <ul>
                  <li @click="selSearchComponent"><img src=""><span>文本查询</span></li>
                  <!-- <li><img src=""><span>滑块</span></li> -->
                  <li @click="selSearchComponent"><img src=""><span>日期选取</span></li>
                  <li @click="selSearchComponent"><img src=""><span>下拉选取</span></li>
                  <li @click="selSearchComponent"><img src=""><span>数值区间</span></li>
                  <li @click="selSearchComponent"><img src=""><span>日期区间</span></li>
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
            :class="{itemFixed: item.fixed}"
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
                    <!-- 悬浮 -->
                    <li @click="setGridItemFixed(item)"><span class="fa" :class="item.fixed?'fa-arrow-circle-o-down':'fa-arrow-circle-o-up'" :title="item.fixed?'不悬浮':'悬浮'"></span></li>
                    <!-- 音视频组件上传 -->
                    <li v-if="item.type=='video'" @click="videoComponentUploadFile(item)" title="上传"><span class="fa fa-video-camera"></span></li>
                    <!-- 图片组件上传 -->
                    <li v-if="item.type=='pic'" @click="picComponentUploadFile(item)" title="上传"><span class="fa fa-photo"></span></li>
                    <!-- 配置 -->
                    <li v-if="item.options.config" @click="configItem(item)" title="配置"><span class="fa fa-cogs"></span></li>
                    <!-- 删除 -->
                    <li @click="removeItem(item)" title="删除"><span class="fa fa-trash"></span></li>
                  </ul>
                </div>
                <!-- 根据不同类型，加载不同组件 -->
                <component 
                  :is="gridItemComponent(item.type)"
                  :viewW="item.w"
                  :viewH="item.h"
                  :options="item.options"
                  :ref="item.type+item.i"
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

    <!-- 日期组件设置修改弹窗 -->
    <el-dialog
      title="组件设置"
      :visible.sync="timeComponentSetting.show"
      width="350px"
      >
      <div class="timeComponentSettingPopup">
        <el-form 
          ref="timeComponentSettingForm"
          label-width="80px">
          <el-form-item label="组件名称" >
            <el-row>
              <el-col :span="18">
                <el-input v-model="timeComponentSetting.form.title" size='small'></el-input>
              </el-col>
              <el-col :offset='1' :span="4">
                <el-switch
                  v-model="timeComponentSetting.form.titleShow">
                </el-switch>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="显示格式">
            <el-select 
              v-model="timeComponentSetting.form.timeFormat" 
              placeholder="请选择活动区域"
              size='small'
              >
              <el-option 
                v-for="(opt,idx) in timeComponentSetting.format"
                :key="idx"
                :label="opt.label"
                :value="opt.value" 
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体大小" >
            <el-input-number v-model="timeComponentSetting.form.fontNum" :min="10" :max="150" size='small'></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色" >
            <el-color-picker v-model="timeComponentSetting.form.color" show-alpha size="small"></el-color-picker>
          </el-form-item>
          <el-form-item label="字体加粗" >
            <el-switch
              v-model="timeComponentSetting.form.fontBold"
              >
            </el-switch>
          </el-form-item>

          <el-form-item label="背景颜色" >
            <el-color-picker v-model="timeComponentSetting.form.bgColor" show-alpha size="small"></el-color-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size='small' @click="settingTimeComponent(1)">{{timeComponentSetting.type==1?'创建':'修改'}}</el-button>
            <el-button size='small' @click="settingTimeComponent(2)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 图片组件设置修改弹窗 -->
    <el-dialog
      title="组件设置"
      :visible.sync="picComponentSetting.show"
      width="300px"
      >
      <div class="picComponentSettingPopup">
        <el-form 
          ref="picComponentSettingForm"
          label-width="80px">
          <el-form-item label="组件名称" >
            <el-row>
              <el-col :span="18">
                <el-input v-model="picComponentSetting.form.title" size='small'></el-input>
              </el-col>
              <el-col :offset='1' :span="4">
                <el-switch
                  v-model="picComponentSetting.form.titleShow">
                </el-switch>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="图片显示">
            <el-select 
              v-model="picComponentSetting.form.imgStyle" 
              size='small'
              >
              <el-option 
                v-for="(opt,idx) in picComponentSetting.style"
                :key="idx"
                :label="opt.label"
                :value="opt.value" 
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="背景颜色" >
            <el-color-picker v-model="picComponentSetting.form.bgColor" show-alpha size="small"></el-color-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size='small' @click="settingComponent(1,'pic')">修改</el-button>
            <el-button size='small' @click="settingComponent(2,'pic')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    
    <!-- 文本组件设置修改弹窗 -->
    <el-dialog
      title="组件设置"
      :visible.sync="textComponentSetting.show"
      width="300px"
      >
      <div class="textComponentSettingPopup">
        <el-form 
          ref="textComponentSettingForm"
          label-width="80px">
          <el-form-item label="组件名称" >
            <el-row>
              <el-col :span="18">
                <el-input v-model="textComponentSetting.form.title" size='small'></el-input>
              </el-col>
              <el-col :offset='1' :span="4">
                <el-switch
                  v-model="textComponentSetting.form.titleShow">
                </el-switch>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="背景颜色" >
            <el-color-picker v-model="textComponentSetting.form.bgColor" show-alpha size="small"></el-color-picker>
          </el-form-item>
      
          <el-form-item>
            <el-button type="primary" size='small' @click="settingComponent(1,'text')">修改</el-button>
            <el-button size='small' @click="settingComponent(2,'text')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 多媒体组件设置修改弹窗 -->
    <el-dialog
      title="组件设置"
      :visible.sync="videoComponentSetting.show"
      width="300px"
      >
      <div class="videoComponentSetting">
        <el-form 
          ref="videoComponentSetting"
          label-width="80px">
          <el-form-item label="组件名称" >
            <el-row>
              <el-col :span="18">
                <el-input v-model="videoComponentSetting.form.title" size='small'></el-input>
              </el-col>
              <el-col :offset='1' :span="4">
                <el-switch
                  v-model="videoComponentSetting.form.titleShow">
                </el-switch>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="播放控制">
            <el-checkbox-group v-model="videoComponentSetting.form.control">
              <el-checkbox label="autoplay">自动播放</el-checkbox>
              <el-checkbox label="loop">循环</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="背景颜色" >
            <el-color-picker v-model="videoComponentSetting.form.bgColor" show-alpha size="small"></el-color-picker>
          </el-form-item>
      
          <el-form-item>
            <el-button type="primary" size='small' @click="settingComponent(1,'video')">修改</el-button>
            <el-button size='small' @click="settingComponent(2,'video')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// // 原拖拽布局插件  
// import VueGridLayout from 'vue-grid-layout';
// 新变拖拽布局插件  添加fixed标识
import VueGridLayout from 'vue-grid-layout2';

// 图例组件
const GridChart = () => import('../../components/gridChart.vue');
// 表格组件
const GridTable = () => import('../../components/gridTable.vue');
// 图片组件
const GridPic = () => import('../../components/gridPic.vue');
// 富文本组件
const GridText = () => import('../../components/gridText.vue');
// 时间组件
const GridTime = ()=> import('../../components/gridTime.vue');
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
        height: 20,
      },
      // gird 组件默认宽高配置
      gridComponentDefaultView: {
        "chart": {
          w: 20,
          h: 10
        },
        "table": {
          w: 20,
          h: 10
        },
        "pic": {
          w: 10,
          h: 8
        },
        "text": {
          w: 15,
          h: 15
        },
        "time": {
          w: 10,
          h: 6
        },
        "video": {
          w: 20,
          h: 10
        },
        "web": {
          w: 10,
          h: 6
        }
      },

      // 日期组件设置
      timeComponentSetting: {
        // 显示
        show: false,
        // 1 创建  2 修改
        type: 1,
        // 日期显示格式
        format: [
          {
            label: 'yyyy年MM月dd日 hh时mm分ss秒',
            value: 1
          },{
            label: 'yyyy-MM-dd hh:mm:ss',
            value: 2
          },{
            label: 'yyyy/MM/dd hh:mm:ss',
            value: 3
          },{
            label: 'yyyy年MM月dd日 hh时mm分',
            value: 4
          },{
            label: 'yyyy-MM-dd hh:mm',
            value: 5
          },{
            label: 'yyyy/MM/dd hh:mm',
            value: 6
          },{
            label: 'yyyy年MM月dd日',
            value: 7
          },{
            label: 'yyyy-MM-dd',
            value: 8
          },{
            label: 'yyyy/MM/dd',
            value: 9
          },{
            label: 'hh时mm分ss秒',
            value: 10
          },{
            label: 'hh:mm:ss',
            value: 11
          },{
            label: 'hh时mm分',
            value: 12
          },{
            label: 'hh:mm',
            value: 13
          }
        ],
        // 表单 
        form: {
          // 设置ID
          id: '',
          // 标题
          title: '',
          // 是否展示
          titleShow: true,
          // 组件背景色
          bgColor: '#fff',
          // 日期显示格式
          timeFormat: 1,
          // 字体大小
          fontNum: 16,
          // 是否加粗
          fontBold: false,
          // 颜色
          color: '#666666'
        }

      },
      // 图片组件设置
      picComponentSetting: {
        // 显示
        show: false,
        // 显示样式
        style: [
          {
            label: '拉伸',
            value: 'fill'
          },{
            label: '居中',
            value: 'contain'
          },{
            label: '平铺',
            value: 'cover'
          },{
            label: '无',
            value: 'none'
          }
        ],
        // 表单 
        form: {
          // 设置ID
          id: '',
          // 标题
          title: '',
          // 是否展示
          titleShow: true,
          // 组件背景色
          bgColor: '#fff',
          // 显示样式
          imgStyle: 'fill',
        }
      },
      // 图片组件设置
      textComponentSetting: {
        // 显示
        show: false,
        // 表单 
        form: {
          // 设置ID
          id: '',
          // 标题
          title: '',
          // 是否展示
          titleShow: true,
          // 组件背景色
          bgColor: '#fff',
        }
      },
      // 图片组件设置
      videoComponentSetting: {
        // 显示
        show: false,
        // 表单 
        form: {
          // 设置ID
          id: '',
          // 标题
          title: '',
          // 是否展示
          titleShow: true,
          // 播放控制
          control: [],
          // 组件背景色
          bgColor: '#fff',
        }
      }
    }
  },
  methods: {
    // 测试
    clickMe: function(){
      console.log('系统设置');
      // this.layout[0].options.title = 12356;
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
      // 关闭查询弹窗
      this.topVisible = false;
      console.log(this.topVisible);
      
    },
    // 动态加载组件
    gridItemComponent: function(type){
      var components = {
        'chart': GridChart,
        'table': GridTable,
        'pic': GridPic,
        'time': GridTime,
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
        // 图例
        'chart': function(){
          that.addGridItem(that.id++, type, that.gridComponentDefaultView[type].w, that.gridComponentDefaultView[type].h, {
            "title": "我是图表组件标题",
            "titleIsShow": true,
            "config": true,
            "bgColor": '#fff'
          });
        },
        // 表格
        'table': function(){
          that.addGridItem(that.id++, type, that.gridComponentDefaultView[type].w, that.gridComponentDefaultView[type].h, {
            "title": "我是表格组件标题",
            "titleIsShow": true,
            "config": true,
            "bgColor": '#fff'
          });

        },
        // 图片
        'pic': function(){
          that.addGridItem(that.id++, type, that.gridComponentDefaultView[type].w, that.gridComponentDefaultView[type].h, {
            "title": "图片组件",
            "titleIsShow": true,
            "config": true,
            "imgStyle": "fill",
            "bgColor": '#fff'
          });

        },
        // 富文本
        'text': function(){
          that.addGridItem(that.id++, type, that.gridComponentDefaultView[type].w, that.gridComponentDefaultView[type].h, {
            "title": "文本组件",
            "titleIsShow": true,
            "config": true,
            "bgColor": '#fff'
          });
        },
        // 日期
        'time': function(){
          // 设置默认选项
          that.timeComponentSetting.type = 1;
          that.timeComponentSetting.form.title = '日期组件';
          that.timeComponentSetting.form.titleShow = true;

          that.timeComponentSetting.form.id = '';
          that.timeComponentSetting.form.timeFormat = 1;
          that.timeComponentSetting.form.fontNum = 16;
          that.timeComponentSetting.form.fontBold = false;
          that.timeComponentSetting.form.color = '#666666';
          
          that.timeComponentSetting.form.bgColor = '#fff';

          that.timeComponentSetting.show = true;
          // that.addGridItem(that.id++, type, 8, 5, {
          //   "title": "我是日期组件标题",
          //   "titleIsShow": true,
          //   "config": true,
          // });
        },
        // 音视频
        'video': function(){
          that.addGridItem(that.id++, type, that.gridComponentDefaultView[type].w, that.gridComponentDefaultView[type].h, {
            "title": "音视频组件",
            "titleIsShow": true,
            "config": true,
            "bgColor": '#fff',
            "control": [],
          });
        },
        // web组件
        'web': function(){
          that.addGridItem(that.id++, type, that.gridComponentDefaultView[type].w, that.gridComponentDefaultView[type].h, {
            "title": "我是web组件标题",
            "titleIsShow": true,
            "config": true,
            "bgColor": '#fff'
          });
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
    // 添加grid项目   gid 项目ID  type 类型  宽  高  option
    addGridItem: function (gid, type, itemW, itemH, opiton) {
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
        // 是否悬浮
        "fixed": false,
        // 是否联动项目
        "isLink": false,
        // options
        "options": {
          ...opiton,
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
                "fixed": false,
                "isLink": false,
                "options": {
                  ...opiton,
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

      this.$confirm('你确定要删除组件吗？', '删除', {
        distinguishCancelAndClose: true,
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        //确定
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
      }).catch(action => {
        // 取消
      });
    },
    // 设置单一项目悬浮
    setGridItemFixed: function(item){
      // console.log(item);
      // console.log('设置单一项目是否悬浮');
      item.fixed = !item.fixed;
    },
    // 配置项目
    configItem: function(item){
      // console.log(item);
      var that = this;
      var backFun = {
        'chart': function(){
       
        },
        'table': function(){


        },
        'pic': function(){
          // 修改图片组件
          that.picComponentSetting.form.id = item.i;
          that.picComponentSetting.form.title = item.options.title;
          that.picComponentSetting.form.titleShow = item.options.titleIsShow;
          that.picComponentSetting.form.imgStyle = item.options.imgStyle;
          that.picComponentSetting.show = true;

        },
        'text': function(){
          // 修改图片组件
          that.textComponentSetting.form.id = item.i;
          that.textComponentSetting.form.title = item.options.title;
          that.textComponentSetting.form.titleShow = item.options.titleIsShow;
          that.textComponentSetting.form.bgColor = item.options.bgColor;
          that.textComponentSetting.show = true;
        },
        'time': function(){
          // 修改时间组件
          that.timeComponentSetting.type = 2;
          that.timeComponentSetting.form.id = item.i;

          that.timeComponentSetting.form.title = item.options.title;
          that.timeComponentSetting.form.titleShow = item.options.titleIsShow;

          that.timeComponentSetting.form.timeFormat = item.options.timeFormat.value;
          that.timeComponentSetting.form.fontNum = item.options.fontNum;
          that.timeComponentSetting.form.color = item.options.color;
          that.timeComponentSetting.show = true;

        },
        'video': function(){
          // 修改多媒体组件
          that.videoComponentSetting.form.id = item.i;
          that.videoComponentSetting.form.title = item.options.title;
          that.videoComponentSetting.form.titleShow = item.options.titleIsShow;
          that.videoComponentSetting.form.bgColor = item.options.bgColor;
          that.videoComponentSetting.form.control = item.options.control;
          
          that.videoComponentSetting.show = true;
        },
        'web': function(){
      
        },
      }
      // 分类执行
      backFun[item.type]();
    },
    // 生成二维数组地图
    genereatePlaneArr: function (data) {
      var map = [];
      if(Array.isArray(data)){
        for(var i = 0; i<data.length; i ++){
          var one = data[i];
          // console.log(one);
          // 跳过悬浮定位
          if( one.fixed ){
            continue;
          }
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
      // 当插件加载完成后  获取现在的二维地图树
      this.layoutMap = this.genereatePlaneArr(this.layout);
    },
    layoutUpdatedEvent: function(newLayout) {
      // 当插件内容布局发生变化后  获取现在的二维地图树
      this.layoutMap = this.genereatePlaneArr(this.layout);
    },
    // 更新时间戳
    updateTimes: function(){
      return parseInt(new Date().getTime()+''+this.rnd(100,999));
    },
    // 返回指定范围随机数  m 最大值  n 最小值
    rnd: function (m,n) {
      return (Math.random()*(m-n+1)+n)|0;
    },

    // 设置日期组件  state 1 创建/修改  2 取消
    settingTimeComponent: function(state){
      if(state){
        // 获取选中日期格式
        var dataFormat = {
          label: '',
          value: this.timeComponentSetting.form.timeFormat
        };
        this.timeComponentSetting.format.forEach(option => {
          if(option.value == this.timeComponentSetting.form.timeFormat){
            dataFormat.label = option.label;
          }
        });

        // 创建/修改
        if(this.timeComponentSetting.type == 1){
          // 创建
          this.addGridItem(this.id++, 'time', this.gridComponentDefaultView['time'].w, this.gridComponentDefaultView['time'].h, {
            "title": this.timeComponentSetting.form.title,
            "titleIsShow": this.timeComponentSetting.form.titleShow,
            "config": true,
            "timeFormat": {
              label: dataFormat.label,
              value: dataFormat.value
            },
            "fontBold": this.timeComponentSetting.form.fontBold,
            "fontNum": this.timeComponentSetting.form.fontNum,
            "color": this.timeComponentSetting.form.color,
            "bgColor": this.timeComponentSetting.form.bgColor,
          });
        }else{
          // 修改
          this.layout.forEach(gridItem => {
            if(gridItem.i == this.timeComponentSetting.form.id){
              // console.log(gridItem);
              gridItem.options.title = this.timeComponentSetting.form.title;
              gridItem.options.titleIsShow = this.timeComponentSetting.form.titleShow;
              gridItem.options.timeFormat.label = dataFormat.label;
              gridItem.options.timeFormat.value = dataFormat.value;
              gridItem.options.fontNum = this.timeComponentSetting.form.fontNum;
              gridItem.options.fontBold = this.timeComponentSetting.form.fontBold;
              gridItem.options.color = this.timeComponentSetting.form.color;
              gridItem.options.bgColor = this.timeComponentSetting.form.bgColor;
              gridItem.options.updataTime = this.updateTimes();
            }
          });
        }
      }
      this.timeComponentSetting.show = false;
    },
    // 设置组件  state 1 修改  2 取消  type 组件类型
    settingComponent: function(state, type){
      // 图片组件设置 富文本组件设置 共用一个弹窗确认取消
      var componentFormHandle = {
        "pic": this.picComponentSetting,
        "text": this.textComponentSetting,
        "video": this.videoComponentSetting,
      }

      var targetFormData = componentFormHandle[type].form;
      if(state){
        // 修改
        this.layout.forEach(gridItem => {
          if(gridItem.i == targetFormData.id){
            // console.log(gridItem);

            for(var key in targetFormData){
              if(key !== 'id' && key!== 'titleShow'){
                gridItem.options[key] = targetFormData[key];
              }else if(key === 'titleShow'){
                gridItem.options.titleIsShow = targetFormData[key];
              }
            }

            // gridItem.options.title = this.picComponentSetting.form.title;
            // gridItem.options.titleIsShow = this.picComponentSetting.form.titleShow;
            // gridItem.options.imgStyle = this.picComponentSetting.form.imgStyle;
            // gridItem.options.bgColor = this.picComponentSetting.form.bgColor;
            gridItem.options.updataTime = this.updateTimes();
          }
        });
      }

      // 关闭弹窗
      componentFormHandle[type].show = false;
    },
    // 图片组件上传图片  传入 单一项目数据
    picComponentUploadFile: function(item){
      // console.log(item,this.$refs[item.type+item.i]);
      // 调用图片子组件选取文件方法
      if(this.$refs[item.type+item.i][0] && this.$refs[item.type+item.i][0].selImgFile){
        this.$refs[item.type+item.i][0].selImgFile();
      }
    },
    // 多媒体组件  上传音视频
    videoComponentUploadFile: function(item){
      // console.log(item ,this.$refs);
      // 调用多媒体组件选取文件方法
      if(this.$refs[item.type+item.i][0] && this.$refs[item.type+item.i][0].selFile){
        this.$refs[item.type+item.i][0].selFile();
      }
    },
      
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
        this.throttleTimer = null;
        var viewWidth = document.querySelector("#statementConfigPage .optionList").offsetWidth;
        // 设置grid 布局行高
        this.gridConfig.height = this.$el.offsetWidth/50|0;
        // 视口变化 初始化顶部组件列表
        this.initTopOptions((viewWidth/85)|0);
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
    // 单一选项宽度不小于85
    this.initTopOptions((viewWidth/85)|0);

    // 设置grid 布局行高
    this.gridConfig.height = this.$el.offsetWidth/50|0;
    // console.log(this.$el.offsetWidth);
  },
  components: {
    // vue-gril-layout
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,

    // // grid-legend
    // GridChart,
    // GridTable,
    // GridText,
    // GridPic,
    // GridVideo,
    // GridWeb,
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
    margin-top: 5px;
    // padding: 10px;
    height: calc(100% - 45px);
    overflow: auto;
    border-radius: 5px;
    background-color: @modelPartitionBGColor;
    >.drapView{
      .item{
        box-sizing: border-box;
        background-color: rgba(200,200,200,0.5);
        height: 100%;
        transition: none;
        // 悬浮定位，层级100
        &.itemFixed{
          z-index: 100;
        }
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
              // height: 25px;
              /* background: rgba(100,100,100,.4); */
              background: transparent;
              transition: all 0.2s linear;
              padding: 0;
              // padding: 0 10px;
              z-index: 10;
              >ul{
                float: right;
                >li{
                  float: left;
                  padding: 0 5px;
                  height: 20px;
                  line-height: 20px;
                  font-size: 16px;
                  text-align: center;
                  cursor: pointer;
                }
              }
            }
            &:hover>.itemTopMenu{
              top: 3px;
            }
          }
        }
      }
    }
  }

  .timeComponentSettingPopup{
    .el-select{
      width: 230px;
    }
  }
}
</style>