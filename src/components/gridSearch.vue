<template>
  <div class="gridSearch">
    <div v-if="options.titleIsShow" class="gridItemTit">{{options.title}}</div>
    <div 
      class="gridItemView" 
      :class="{hasTit: options.titleIsShow}"
      :style="{backgroundColor: options.bgColor||'transparent'}"
      >

      <div class="searchComponentView">
        <!-- 文本查询 -->
        <div class="searchRow" v-if="options.type===1">
          <div class="searchBtn">
            <el-button type="success" size="small">查询</el-button>
          </div>
          <div class="searchBody">
            <el-input
              placeholder="请输入查询内容"
              size="small" 
              v-model="searchInputKey"
              clearable>
            </el-input>
          </div>
        </div>
        <!-- 日期选取 -->
        <div class="searchRow" v-if="options.type===2">            
          <!-- type  date 日  month 月  year 年  datetime 日期加时间  week 周  dates 多选日   -->
          <el-date-picker
            v-model="searchDate"
            type="datetime"
            size="small"
            format="yyyy-MM-dd HH:00"
            value-format="yyyy-MM-dd HH:00"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <!-- 下拉选取 -->
        <div class="searchRow" v-if="options.type===3">
          <div class="searchBtn">
            <el-button type="success" size="small">查询</el-button>
          </div>
          <div class="searchBody">
            <!-- multiple 多选  filterable 搜索  -->
            <el-select v-model="searchSelect" clearable placeholder="请选择" size="small">
              <el-option
                v-for="(item,idx) in selectOptions"
                :key="idx"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 数值区间 -->
        <div class="searchRow" v-if="options.type===4">
          <div class="searchBtn">
            <el-button type="success" size="small">查询</el-button>
          </div>
          <div class="searchBody">
            <el-input
              class="intervalInput"
              placeholder="请输入数值"
              type="number"
              size="small"
              v-model="searchIntervalValue1">
            </el-input>
            <span class="gt_icon"></span>
            <span>值</span>
            <span class="lt_icon"></span>
            <el-input
              class="intervalInput"
              placeholder="请输入数值"
              type="number"
              size="small"
              v-model="searchIntervalValue2">
            </el-input>
          </div>
        </div>
        <!-- 日期区间 -->
        <div class="searchRow"  v-if="options.type===5">
          <!-- type  daterange 日范围选取  monthrange 月范围选取  datetimerange 时间范围 -->
          <el-date-picker
            v-model="dateInterval"
            type="datetimerange"
            size="small"
            format="yyyy-MM-dd HH:00"
            value-format="yyyy-MM-dd HH:00"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
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

      // 下拉选取选项
      selectOptions: [
        {
          label:　'选项1',
          value:　1,
        },{
          label:　'选项2',
          value:　2,
        },{
          label:　'选项3',
          value:　3,
        },{
          label:　'选项4',
          value:　4,
        }
      ],

      // 文本查询
      searchInputKey: '',
      // 日期查询
      searchDate: '',
      // 下拉选取
      searchSelect: '',
      // 数值区间
      searchIntervalValue1: '',
      searchIntervalValue2: '',
      // 日期区间
      dateInterval: ''


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

  },
  mounted: function(){
    // 初始化分页
    // this.initPage();
  }
}
</script>
<style lang="less">
@import url(../common/base.less);

.gridSearch{
  // 基本设置样式
  .gridItem();
  >.gridItemView{
    position: relative;

    .searchRow{
      .clearfix();
      .searchBtn{
        float: right;
        width: 60px;
        text-align: center;
      }
      .searchBody{
        margin-right: 70px;
        .el-select{
          display: block;
        }
        >.intervalInput{
          display: inline-block;
          width: 90px;
        }
        >span{
          margin: 0 8px;
          display: inline-block;
          vertical-align: middle;
        }

      }
      .el-date-editor .el-range-separator{
        line-height: 32px;
      }
    } 

  }
}
</style>