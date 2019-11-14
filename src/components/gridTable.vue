<template>
  <div class="gridTable">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}} 
      <!-- <button @click="clickMe">clickMe</button> -->
    </div>
    <div 
      class="gridItemView" 
      :class="{hasTit: options.titleIsShow}"
      :style="{backgroundColor: options.bgColor||'transparent'}"
    >
      <div class="girdTableView" :class="{hasPages: tableConfig.isPages}">
        <el-table
          :data="tableData.data"
          :height="tableConfig.isTopFixed?'100%':'auto'"
          border
          show-summary
          :span-method="tableSpanMethod"
          @cell-click="cellClick"
          style="width: 100%">

          <!-- 通过模版标签  动态递归添加表头 -->
          <template v-for="(item, idx) in tableData.header">
            <TableColumn 
              v-if="item.children && item.children.length" 
              :coloumn-header="item">
            </TableColumn>
            <el-table-column
              v-else
              :prop="item.field"
              :fixed='item.isFixed'
              :sortable="item.isSort"
              :label="item.name">
            </el-table-column>
          </template>
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
const TableColumn = resolve => require(['./TableColumn.vue'], resolve);

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
        header: [
          {
            // 列名
            name: 'ID',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: 'left',
            // 依赖字段
            field: 'id',
            // 子级
            children: [],
          },{
            // 列名
            name: '日期',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'date',
            // 子级
            children: [],
          },
          // 多层级表头
          {
            // 列名
            name: '配送信息',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: '',
            // 子级
            children: [
              {
                // 列名
                name: '姓名',
                // 是否排序
                isSort: false,
                // 是否固定
                isFixed: false,
                // 依赖字段
                field: 'name',
                // 子级
                children: [],
              },{
                // 列名
                name: '地址',
                // 是否排序
                isSort: false,
                // 是否固定
                isFixed: false,
                // 依赖字段
                field: '',
                // 子级
                children: [
                  {
                    // 列名
                    name: '省份',
                    // 是否排序
                    isSort: false,
                    // 是否固定
                    isFixed: false,
                    // 依赖字段
                    field: 'province',
                    // 子级
                    children: [],
                  },{
                    // 列名
                    name: '市区',
                    // 是否排序
                    isSort: false,
                    // 是否固定
                    isFixed: false,
                    // 依赖字段
                    field: 'city',
                    // 子级
                    children: [],
                  },{
                    // 列名
                    name: '街道',
                    // 是否排序
                    isSort: false,
                    // 是否固定
                    isFixed: false,
                    // 依赖字段
                    field: 'address',
                    // 子级
                    children: [],
                  }
                ],
              }
            ],
          },
          {
            // 列名
            name: '数据1',
            // 是否排序
            isSort: true,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'amount1',
            // 子级
            children: [],
          },{
            // 列名
            name: '数据2',
            // 是否排序
            isSort: true,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'amount2',
            // 子级
            children: [],
          },{
            // 列名
            name: '数据3',
            // 是否排序
            isSort: true,
            // 是否固定
            isFixed: false,
            // 依赖字段
            field: 'amount3',
            // 子级
            children: [],
          },{
            // 列名
            name: '累计',
            // 是否排序
            isSort: false,
            // 是否固定
            isFixed: 'right',
            // 依赖字段
            field: 'total',
            // 子级
            children: [],
          }

        ],
        data: [
          {
            id: '12987122',
            name: '王小虎',
            date: '2016-05-03',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            amount1: '234',
            amount2: '3.2',
            amount3: 10,
            total: 123456
          }, {
            id: '12987123',
            name: '王小虎',
            date: '2016-05-03',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            amount1: '165',
            amount2: '4.43',
            amount3: 12,
            total: 123456
          }, {
            id: '12987124',
            name: '王小虎',
            date: '2016-05-03',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            amount1: '324',
            amount2: '1.9',
            amount3: 9,
            total: 123456
          }, {
            id: '12987125',
            name: '王小虎',
            date: '2016-05-03',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            amount1: '621',
            amount2: '2.2',
            amount3: 17,
            total: 123456
          }, {
            id: '12987126',
            name: '王小虎',
            date: '2016-05-03',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
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
  components: {
    TableColumn
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
    clickMe: function(){
      console.log(this.tableData.data);
    },
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
    // 表格数据列合并
    tableSpanMethod: function(data){
      // console.log(data);
      // 要合并的数据 返回最后合并点就行
      // 被合并的数据单元格返回 [0,0]或{rowspan:0,colspan:0} ,否则会错顶数据，数据错乱
      if (data.rowIndex % 2 === 0) {
        if (data.columnIndex === 0) {
          // 合并到的地方
          return [1, 2];
          // return [data.rowIndex+1, 1];
        } else if (data.columnIndex === 1) {
          return [0, 0];
        }
      }else{
        // if(data.columnIndex === 0 || data.columnIndex === 1){
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   }
        // }
        if(data.columnIndex === 0){
          // return {
          //   rowspan: 0,
          //   colspan: 0,
          // }
        }
      }

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