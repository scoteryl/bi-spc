<template>
  <div class="gridTable">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}}</div>
    <div class="gridItemView" :class="{hasTit: options.titleIsShow}">
      <div class="girdTableView" :class="{hasPages: tableConfig.isPages}">
        <el-table
          :data="tableData.data"
          :height="tableConfig.isTopFixed?'100%':'auto'"
          border
          show-summary
          @cell-click="cellClick"
          style="width: 100%">
          <!-- 动态列 动态绑定数据 -->
          <el-table-column
            v-for="(col, idx) in tableData.cols"
            :prop="col.field"
            :fixed='col.isFixed'
            :sortable="col.isSort"
            :label="col.name">
          </el-table-column>
        </el-table>
      </div>
      <div class="gridTablePage" v-if="tableConfig.isPages">
        <el-pagination
          :small="true"
          :layout="tableConfig.pagesLayout"
          :page-size="tableConfig.currentNumSize"
          :total="tableConfig.pagesTotal"
          :current-page="tableConfig.currentPage"
          @current-change="changePage"
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gridTable',
  data: function(){
    return {
      // loading
      loadHandle: null,
      // 节流更新句柄
      changeTimer: null,
      // 表格数据
      tableData: {
        cols: [
          {
            // 列名
            name: 'ID',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: 'left',
            // 依赖字段
            field: 'id',
          },{
            // 列名
            name: '姓名',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'name',
          },{
            // 列名
            name: '数据1',
            // 是否排序
            isSort: true,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'amount1',
          },{
            // 列名
            name: '数据2',
            // 是否排序
            isSort: true,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'amount2',
          },{
            // 列名
            name: '数据3',
            // 是否排序
            isSort: true,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'amount3',
          },{
            // 列名
            name: '累计',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: 'right',
            // 依赖字段
            field: 'total',
          }
        ],
        data: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3.2',
            amount3: 10,
            total: 123456
          }, {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '4.43',
            amount3: 12,
            total: 123456
          }, {
            id: '12987124',
            name: '王小虎',
            amount1: '324',
            amount2: '1.9',
            amount3: 9,
            total: 123456
          }, {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2.2',
            amount3: 17,
            total: 123456
          }, {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4.1',
            amount3: 15,
            total: 123456
          }
        ]
      },
      // 表格设置
      tableConfig: {
        isTopFixed: true,
        // 是否分页
        isPages: false,
        // 分页配置
        pagesLayout: "prev, pager, next",
        // 分页数量 
        currentNumSize: 10,
        // 总页数
        pagesTotal: 1000,
        // 当前页数
        currentPage: 1,
      }
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
        console.log('options变化了',newVal);
        
        // 浏览器变化  更新视口
        this.initPage();
      },
      deep:true
    }
  },
  methods: {
    // 表格单元格被单击事件
    cellClick: function(row, column, cell, event){
      /**
       * row  行数据
       * column  表格列数据
       * cell  单元格DOM
       * event  事件
      */

      console.log(row, column, cell, event)
    },
    // 初始化分页
    initPage: function(){
      // console.log(this.$el);
      this.$nextTick(()=> {
        var elView = this.$el.offsetWidth;
        console.log(elView);
        if(elView < 300){
          this.tableConfig.pagesLayout = "prev, jumper, next";
        }else{
          this.tableConfig.pagesLayout = "prev, pager, next";
        }
      });
    },
    // 分页变化
    changePage: function(page){
      console.log(page);
    }
  },
  mounted: function(){
    // 初始化分页
    this.initPage();
  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridTable{
  // 基本设置样式
  .gridItem();

  >.gridItemView{
    overflow: auto;
    >.girdTableView{
      min-width: 200px;
      height: 100%;
      &.hasPages{
        height: calc(100% - 30px);
      }
    }
    >.gridTablePage{
      min-width: 200px;
      margin-top: 2px;
      text-align: center;
      .el-pagination__jump{
        margin-left: 0;
      }
    }
  }
}
</style>