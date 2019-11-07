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
                <el-button class="tabBtn" type="text" size="mini" @click="tabOption(scope.row, 'edit')">修改</el-button>
                <el-button class="tabBtn" type="text" size="mini" @click="tabOption(scope.row, 'config')">配置</el-button>
                <el-button class="tabBtn" type="text" size="mini" @click="tabOption(scope.row, 'remove')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @current-change="pageChange"
            :current-page="pageOption.current"
            :page-size="pageOption.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageOption.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新建/修改报表弹窗 -->
    <el-dialog
      :title="statementForm.type==1?'新建':'修改'"
      :visible.sync="statementForm.visible"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      width="400px"
      >
      <el-form ref="statementForm" :rules="statementForm.rules" :model="statementForm" label-width="80px">
        <el-form-item label="报表名称" prop='name'>
          <el-input v-model="statementForm.name" size='small'></el-input>
        </el-form-item>
        <el-form-item label="描述" prop='desc'>
          <el-input type="textarea" v-model="statementForm.desc" size='small'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='small' @click='statementPopup(true)'>{{statementForm.type==1?'立即创建':'修改'}}</el-button>
          <el-button size='small' @click='statementPopup(false)'>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      ],
      // 列表分页
      pageOption: {
        total: 400,
        pageSize: 10,
        current: 1
      },
      // 报件 表单 创建/修改
      statementForm: {
        visible: false,
        // 1 创建  2 修改
        type: 1,
        id: '',
        name: '',
        desc: '',
        rules: {
          name: [
            { required: true, message: '请输入报表名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
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
      // console.log('新建');
      this.statementForm.visible = true;
      this.statementForm.type = 1;
      this.statementForm.id = '';
      this.statementForm.name = '';
      this.statementForm.desc = '';
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
    },
    // 分页变更
    pageChange: function(page){
      console.log('变更页数');
    },
    // 报表列表操作  type  1 修改 2 配置 3删除
    tabOption: function(data, type){
      var that = this;
      var backFun = {
        'edit': function(){
          // console.log('修改');

          that.statementForm.visible = true;
          that.statementForm.type = 2;
          that.statementForm.id = data.id;
          that.statementForm.name = data.name;
          that.statementForm.desc = data.describe;
        },
        'config': function(){
          // console.log('配置');
          that.$router.push({path:'/statement/config', query: {sid: data.id}});
        },
        'remove': function(){
          // console.log('删除');
          that.$confirm('你确定要删除吗？', '删除', {
            distinguishCancelAndClose: true,
            type: 'warning',
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          }).then(() => {
            //确定
          }).catch(action => {
            // 取消
          });

        }
      }
      backFun[type]();
    },
    // 报表弹窗操作 state   true 确认  false 取消
    statementPopup: function(state){
      if(state){
        // 验证表单内容
        this.$refs['statementForm'].validate((results) => {
          console.log(results);
          if (results) {
            // alert('submit!');


            if(this.statementForm.type==1){
              // 新建
                        
            }else{
              // 修改

            }
            this.statementForm.visible = false;


          } else {
            // console.log('error submit!!');
            return false;
          }
        });


      }else{
        this.statementForm.visible = false;
      }
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
        height: calc(100% - 40px);
        .tabBtn{
          padding: 3px 10px;  
          &:not(:first-child){
            margin-left: 5px
          }
        }
      }
      >.page{
        margin-top: 10px;
        height: 30px;
        text-align: center;
        overflow: hidden;
      }
    }
  }
}
</style>