<template>
  <div id="searchLegendConfigPage">
    <div class="configView">
      <!-- 数据库分类字段树 -->
      <div class="dataTree">
        <!-- 数据源选取 -->
        <div class="data_origin">
          <el-cascader
            :options="dataSource.options"
            v-model="dataSource.selValue"
            size='small'
          ></el-cascader>
        </div>
        <div class="treeView">
          <el-tree
            :data="dataTree"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderTreeContent">
          </el-tree>


          <!-- <div 
            class="treeGroup" 
            v-for="(groupItem,gid) in dataTree"
            :key="gid"
            
            >
            <div class="groupTitle">
              <i class="fa" :class="treeIcon(groupItem.type)" ></i>
              <span>{{groupItem.label}}</span>
            </div>
            <div class="groupList" v-if="groupItem.children && groupItem.children.length">
              
              <draggable
                :list="groupItem.children"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @change="log"
                >
                

                <div 
                  class="tree_node"
                  v-for="(item, idx) in groupItem.children"
                  :key="idx"
                  >
                  <i class="fa" :class="treeIcon(item.type)" ></i>
                  <span>{{item.label}}</span>
                </div>
              </draggable>               
            </div>
          </div> -->
     
            <!-- <el-tree
              :data="dataTree"
              node-key="value"
              default-expand-all
              :expand-on-click-node="false" 
              :render-content="renderTreeContent">
            </el-tree> -->
        </div>
      </div>
      <!-- 报表图例树 -->
      <div class="legendTree">
        <el-tree
          :data="legendTree"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderTreeContent">
        </el-tree>
      </div>
      <!-- 主配置视口 -->
      <div class="mainView">
        <!-- 关联区域 -->
        <div class="relevancy">
          <div class="data_source">
            <div class="label">
              数据源
            </div>
            <div class="fieldList">
              <draggable
                class="dragArea"
                :list="dataField"
                group="dataField"
                :sort="false"
                @change="(data)=> this.fieldChange(1, data)"
                >
                <div 
                  class="fieldItem"
                  v-for="(field,idx) in dataField"
                  :key="idx"
                >
                  <!-- {{JSON.stringify(field)}} -->
                  <span>{{field.label}}</span>
                  <i class="fa fa-angle-down" @click="fieldMenu($event, field)"></i>
                </div>
              </draggable>
            </div>
          </div>
          <div class="legend_source">
            <div class="label">
              图形
            </div>
            <div class="fieldList">
              <draggable
                class="dragArea"
                :list="legendField"
                group="legendField"
                :sort="false"
                @change="(data)=> this.fieldChange(2, data)"
                >
                <div 
                  class="fieldItem"
                  v-for="(legend,idx) in legendField"
                  :key="idx"
                >
                  <span>{{legend.label}}</span>
                  <i class="fa fa-angle-down" @click="fieldMenu($event, legend)"></i>
                </div>
              </draggable>
            </div>
          </div>
        </div>
        <!-- 组件设置 -->
        <div class="componentConfig" :style="{minHeight: componentConfig.minHeight+'px'}">
          <div class="configTitle">组件信息</div>
          <div class="configView">

          </div>
        </div>
      </div>
    </div>
    <!-- 菜单 -->
    <Menu 
      v-model="menuData.menuShow"
      ref="menuComponent" 
      :menuList="menuData.menuList" 
      :x="menuData.menuX" 
      :y="menuData.menuY"
      :callback="menuClickCallBack"
    />
  </div>
</template>
<script>
// 拖拽
import draggable from 'vuedraggable';
// 菜单组件
const Menu = resolve => require(['@/components/menu.vue'], resolve);

export default {
  name: 'searchLegendConfigPage',
  data: function(){
    return {
      // 数据库源选取
      dataSource: {
        selValue: '',
        options: [
          {
            value: 1,
            label: '分类1',
            children: [{
              value: 'all',
              label: '全部'
            },{
              value: 11,
              label: '数据库1'
            },{
              value: 12,
              label: '数据库1'
            },{
              value: 13,
              label: '数据库1'
            },{
              value: 14,
              label: '数据库1'
            }]
          },{
            value: 2,
            label: '分类2',
            children: [{
              value: 'all',
              label: '全部'
            },{
              value: 21,
              label: '数据库1'
            },{
              value: 22,
              label: '数据库1'
            }]
          }
        ]
      },
      // 数据字段树  type 1 数据表  2 字符字段  3 数字字段
      dataTree: [
        {
          label: '数据表1超长超长超长超长超长超长超长超长超长超长超长超长超长',
          drapSel: true,
          value: 1,
          type: 1,
          children: [
            {
              label: '字段1',
              drapSel: true,
              value: 101,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 102,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 103,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 104,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 105,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 106,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 107,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 108,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 109,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 110,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 111,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 112,
              type: 3,
            }
          ]
        },{
          label: '数据表2',
          drapSel: true,
          value: 2,
          type: 1,
          children: [
            {
              label: '字段2',
              drapSel: true,
              value: 201,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 202,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 203,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 204,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 205,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 206,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 207,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 208,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 209,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 210,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 211,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 212,
              type: 3,
            },{
              label: '字段1',
              drapSel: true,
              value: 213,
              type: 2,
            },{
              label: '字段2',
              drapSel: true,
              value: 214,
              type: 3,
            }
          ]
        }
      ],
      // 图例树  type  10 图例列表  11 图例
      legendTree: [{
        label: '图表列表',
        drapSel: true,
        value: 10,
        type: 10,
        children: [{
          label: '图例1',
          drapSel: true,
          value: 11,
          type: 11,
        },{
          label: '图例2',
          drapSel: true,
          value: 12,
          type: 12,
        },{
          label: '图例3',
          drapSel: true,
          value: 13,
          type: 13,
        },{
          label: '图例4',
          drapSel: true,
          value: 14,
          type: 14,
        }]
      }],
      // 数据库 关联字段
      dataField: [],
      // 图形  关联图形
      legendField: [],

      menuData: {
        // 菜单坐标
        menuX: 0,
        menuY: 0,
        // 是否展示
        menuShow: false,
        // 菜单列表
        menuList: [],
        // 点击数据
        targetData: null,
      },
      // 菜单列表
      menuList: [
        {
          id: 10,
          key: '日期粒度',
          children: [
            {
              id: 101,
              key: '年月',
            },{
              id: 102,
              key: '年月日',
            },{
              id: 103,
              key: '年月日小时',
            },{
              id: 104,
              key: '年月日时分秒',
            }
          ]
        },{
          id: 20,
          key: '汇总方式',
          children: [
            {
              id: 201,
              key: '求和',
            },{
              id: 202,
              key: '平均值',
            },{
              id: 203,
              key: '最大值',
            },{
              id: 204,
              key: '最小值',
            },{
              id: 205,
              key: '计数'
            }
          ]
        },{
          id: 30,
          key: '配置'          
        },{
          id: 9,
          key: '删除'          
        }
      ],
       
      // 组件设置区域
      componentConfig: {
        minHeight: 0,

      }
    }
  },
  mounted: function(){
    // 计算最小高度
    this.componentMinHeight();
  },
  // 通过计算属性，监听视口变化
  computed: {
    viewChange: function(){
      return this.$store.state.windowViewW+','+this.$store.state.windowViewH;
    }
  },
  methods: {
    // 计算表单最小高度
    componentMinHeight: function(){
      var viewHeight = this.$el.offsetHeight;
      var relevancyHeight = this.$el.querySelector('.relevancy').offsetHeight;
      this.componentConfig.minHeight = viewHeight - relevancyHeight -5;
      // console.log(this.$el.offsetHeight, this.$el.querySelector('.relevancy').offsetHeight);
      // return 100;
    },
    // 树控件自定义返回内容
    renderTreeContent: function (h, { node, data, store }){
      // console.log(h, node, data, store);

      var nodeClass = {
        // 数据表
        '1': 'fa-database',
        // 字符串字段
        '2': 'fa-sort-alpha-asc',
        // 数字字段
        '3': 'fa-sort-numeric-asc',

        '10': 'fa-area-chart',
        // 柱状图
        '11': 'fa-bar-chart',
        // 拆线图
        '12': 'fa-line-chart',
        // 饼图
        '13': 'fa-pie-chart',
        // 表格
        '14': 'fa-table'
      };
      var nodeData = [node.data];

        // <draggable
        //   class="dragArea"
        //   draggable = ".tree_node"
        //   v-model={node.data}
        //   group={{name: 'people', pull: 'clone', put: false }}

        //   >
        // </draggable>
      if(data.type == 1 || data.type == 10 ){
        return (
          <div class="tree_node" title={node.data.label}>
            <i class={'fa '+nodeClass[node.data.type]}></i>
            <span>{node.data.label}</span>
          </div>
        );
      }else{
        return (
          <draggable
            draggable = ".tree_node"
            v-model={nodeData}
            group={{name: data.type<10?'dataField':'legendField', pull: 'clone', put: false }}
            >
            <div class={node.data.drapSel?'tree_node':'tree_node_sel'} title={node.data.label}>
              <i class={'fa '+nodeClass[node.data.type]}></i>
              <span>{node.data.label}</span>
            </div>
          </draggable>
        );
      }
    },
    // 关联拖拽变化  type 1 数据库字段  2 图例   
    fieldChange: function(type, data){
      // console.log(type,data);
      // 当前添加的数据
      var targetData = data.added.element;
      // 当前要遍历的树列表数据
      var list = type==1? this.dataTree : this.legendTree;

      // 遍历树数据，设置已经拖拽选中
      for(var i=0;i<list.length;i++){
        // 第一层
        var group = list[i];
        if(group.children && group.children.length){
          for(var itemI = 0;itemI<group.children.length;itemI++){
            var one =  group.children[itemI];
            if(one.value == targetData.value){
              // console.log(one, targetData);
              one.drapSel = false;
              return;
            }
          }
        }
      }

    },
    // 关联字段/图形点击菜单
    fieldMenu: function(e, item){
      // console.log(e, item);
      // 菜单列表
      var listArr = [];

      switch(true){
        case item.type == 2: 
          listArr.push(this.menuList[0]);
          break;
        case item.type == 3:
          listArr.push(this.menuList[1]);
          break;
        case item.type > 10:
          listArr.push(this.menuList[2]);
          break;
      }
      listArr.push(this.menuList[3]);


      this.menuData.menuX = e.clientX;
      this.menuData.menuY = e.clientY;
      this.menuData.menuList = listArr;
      this.menuData.targetData = item;
      // 展示菜单
      this.menuData.menuShow = true;
    },
    // 菜单单击回调方法
    menuClickCallBack: function(id){
      // console.log(data);
      // console.log(this.menuData.targetData);

      switch(parseInt(id)){
        case 101:
          // 日期字段 年月

          break;
        case 102:
          // 日期字段 年月日

          break;
        case 103:
          // 日期字段 年月日小时

          break;
        case 104:
          // 日期字段 年月日时分秒

          break;
        case 201:
          // 数值字段求和

          break;
        case 202:
          // 数值字段平均值

          break;
        case 203:
          // 数值字段最大值

          break;
        case 204:
          // 数值字段最小值

          break;
        case 205:
          // 数值字段计数

          break;
        case 30:
          // 关联图例配置

          break;
        case 9:
          // 删除

          var delArr = this.menuData.targetData.type>10 ? this.legendField: this.dataField;

          for(var i = delArr.length-1;i>=0;i--){
            var one = delArr[i];
            if(one.value == this.menuData.targetData.value){
              // 恢复变成可以拖拽选中
              one.drapSel = true;
              // 查找并删除选中数据
              delArr.splice(i,1);
              break;
            }
          }
          break;
      }


      this.menuData.menuList = [];
      this.menuData.targetData = null,
      this.menuData.menuShow = false;

    }
  },
  components: {
    draggable,
    Menu,
  },
  watch: {
    viewChange: function(newVal, oldVal){
      // // 节流
      // if(this.throttleTimer){
      //   clearTimeout(this.throttleTimer);
      // }
      // this.throttleTimer = setTimeout(()=>{
 
      // },200);
      
      // 计算最小高度
      this.componentMinHeight();
    }
    
  }
}
</script>
<style lang="less">
@import url(../../common/base.less);

#searchLegendConfigPage{
  height: 100%;
  >.configView{
    height: 100%;
    >.dataTree{
      padding: 5px;
      float: left;
      width: 250px;
      height: 100%;
      background-color: @modelPartitionBGColor;
      overflow: auto;

      .treeView{
        margin-top: 5px;
        width: 100%;
        height: calc(100% - 37px);
        overflow: auto;

        .tree_node_sel,
        .tree_node{
          user-select: none;
          cursor: pointer;
   
          // &:before{
          //   content: "";
          //   position: absolute;
          //   top: 10px;;
          //   left: -15px;
          //   width: 10px;
          //   border-bottom: 1px dotted #999;
          // }
          >i{
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
            position: relative;
            top: 3px;
          }
          >span{
            display: inline-block;
            width: 150px;
            height: 20px;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

          }
        }
        .tree_node_sel{
          color: #ccc;
          user-select: none;
          cursor: not-allowed;
        }
        
      }

      .el-cascader,
      .el-select{
        display: block;
      }

    }
    >.legendTree{
      padding: 5px;
      float: right;
      width: 250px;
      height: 100%;
      background-color: @modelPartitionBGColor;
      overflow: auto;
      .tree_node_sel,
      .tree_node{
        user-select: none;
        position: relative;
        // &:before{
        //   content: "";
        //   position: absolute;
        //   top: 10px;;
        //   left: -15px;
        //   width: 10px;
        //   border-bottom: 1px dotted #999;
        // }
        >i{
          display: inline-block;
          margin-right: 10px;
          vertical-align: top;
          position: relative;
          top: 3px;
        }
        >span{
          display: inline-block;
          width: 150px;
          height: 20px;
          line-height: 20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

        }
      }
      
      .tree_node_sel{
        color: #ccc;
        user-select: none;
        cursor: not-allowed;
      }
    }
    >.mainView{
      padding: 0 5px;
      display: block;
      margin: 0 250px;
      height: 100%;
      height: 100%;
      // 关联区域
      >.relevancy{
        padding: 5px;
        background-color: @modelPartitionBGColor;
        >.data_source,
        >.legend_source{
          margin: 5px 0;
          position: relative;
          >.label{
            position: absolute;
            top: 50%;
            left: 0;
            -webkit-transform: translate(0, -50%);
            transform: translate(0, -50%);
            width: 90px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: #666;
          }
          >.fieldList{
            margin-left: 100px;
            padding: 3px;
            border: 1px solid #aaa;
            border-radius: 5px;
            .dragArea{
              min-height: 30px;
              overflow: hidden;
              >.fieldItem{
                float: left;
                margin: 2px 5px;
                padding: 0 5px 0 10px;
                background: rgba(104,143,216,.8);
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #fff;
                border-radius: 5px 0 5px 0;
                user-select: none;
                >span{
                  display: inline-block;
                  min-width: 60px;
                }
                >i{
                  margin-left: 10px;
                  margin-right: 3px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        
      }

      // 组件信息设置
      >.componentConfig{
        margin-top: 5px;
        background-color: @modelPartitionBGColor;

        >.configTitle{
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #aaa;
        }

        >.configView{

        }


      }

    }

  }
}

</style>