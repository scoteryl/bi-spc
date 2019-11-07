<template>
  <!--  查询组件设置 -->
  <el-dialog
    title="组件"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'searchComponentConfigModel',
  data: function(){
    return {}
  },
  methods: {}
}
</script>
<style lang="less">

</style>