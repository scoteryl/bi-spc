<template>
  <div id="statementClassifyPage">
    <div class="topSearch">
      <div class="searchInput">
        <el-input
          placeholder="报表ID/名称"
          prefix-icon="el-icon-search"
          size="mini"
          v-model="searchWords">
        </el-input>
      </div>
      <el-button type="primary" size="mini" :loading="searchLoading" @click="search">查询</el-button>
      <el-button v-if="selClassify" type="primary" size="mini" @click="newStatement">新建</el-button>
    </div>
    <div class="listView">
      <div class="treeView">
        <div class="view">
          <el-tree
            :data="classifyListTree"
            node-key="id"
            :default-expand-all='true'
            :highlight-current='true'
            :expand-on-click-node='false'
            :current-node-key='0'
            ref="classifyTree"
            :filter-node-method="filterClassifyTree"
            @node-click="selClassifyTreeNode"
          >
          </el-tree>
        </div>
      </div>
      <div class="listTable">
        <div class="view">
          <el-table
            :data="classifyList"
            maxHeight="100%"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="id"
              label="报表ID"
              width="70">
            </el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="报表名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="url"
              label="URL"
              width="200">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="报表描述"
              width='400'>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="170">
              <template slot-scope="scope">
                <el-button class="tabBtn" type="text" size="mini">修改</el-button>
                <el-button class="tabBtn" type="text" size="mini">配置</el-button>
                <el-button class="tabBtn" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'statementClassifyPage',
  data: function(){
    return {
      // 搜索词
      searchWords: "",
      // 搜索加载
      searchLoading: false,
      // 分类列表
      classifyListTree: [{
        id: 0,
        label: '全部',
        children: [
          {
            id: 1,
            label: '分类1'
          },{
            id: 2,
            label: '分类2'
          },{
            id: 3,
            label: '分类3'
          },{
            id: 4,
            label: '分类4'
          },{
            id: 5,
            label: '分类5'
          },{
            id: 6,
            label: '分类6'
          },{
            id: 7,
            label: '分类7'
          },{
            id: 8,
            label: '分类8'
          },{
            id: 9,
            label: '分类9'
          }
        ]
      }],
      // 选中分类
      selClassify: 0,
      // 分类列表
      classifyList: [
        {
          id: 1,
          name: '报表1',
          url: 'http://www.baidu.com',
          describe: '这是报表描述这是报表描述这是'
        },{
          id: 2,
          name: '报表2',
          url: 'http://www.baidu.com',
          describe: '这是报表描述这是报表描述这是报表描述这'
        },{
          id: 3,
          name: '报表3',
          url: 'http://www.baidu.com',
          describe: '这是报表描述这是报表描述这是报表描述这是'
        },{
          id: 4,
          name: '报表4',
          url: 'http://www.baidu.com',
          describe: '这是报表描述这是报表描述这是报表描述这是报表描述这是报表描述这是报表描述这是报表描述这是报'
        },{
          id: 5,
          name: '报表5',
          url: 'http://www.baidu.com',
          describe: '这是报表描述这是报表描述这是报表描述这'
        },{
          id: 6,
          name: '报表6',
          url: 'http://www.baidu.com',
          describe: '这是报'
        }
      ]
    }
  },
  methods: {
    // 报表查找
    search: function(){
      if(!this.searchLoading){
        this.searchLoading = true;
        setTimeout(()=>{
          this.searchLoading = false;
        }, 2000);
      }

      this.$refs.classifyTree.filter({type:'search',value:111});
      this.$refs.classifyTree.setCurrentKey(0);
    },
    // 新建报表
    newStatement: function(){
      console.log('新建');
    },
    // 选取报表树节点
    selClassifyTreeNode: function(data){
      // console.log(data);
      this.selClassify = data.id;
    },
    // 过滤节点树
    filterClassifyTree: function(value, data){
      // console.log(value,data);
      if(data.id==0){
        return true;
      }
      return data.id%2?true:false;
    }
  }
}
</script>
<style lang="less">
@import url(../../common/base.less);

#statementClassifyPage{
  height: 100%;
  >.topSearch{
    margin-bottom: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: @modelPartitionBGColor;
    .clearfix();
    >.searchInput{
      float: left;
      margin-right: 10px;
      width: 150px;
    }
    >button{
      float: left;
    }
  }
  >.listView{
    height: calc(100% - 37px);
    .clearfix();
    >.treeView{
      box-sizing: border-box;
      padding: 10px;
      float: left;
      width: @statementMenuWidth;
      height: 100%;
      background-color: @modelPartitionBGColor;
      border-radius: 5px;
      >.view{
        overflow: auto;
        height: 100%;;
      }
    }
    >.listTable{
      box-sizing: border-box;
      margin-left: calc(@statementMenuWidth + 5px);
      padding: 10px;
      height: 100%;
      background-color: @modelPartitionBGColor;
      border-radius: 5px;
      >.view{
        height: 100%;
        .tabBtn{
          padding: 3px 10px;  
          &:not(:first-child){
            margin-left: 5px
          }
        }
      }
    }
  }
}
</style>