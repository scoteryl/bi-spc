<template>
  <el-table-column 
    :label="coloumnHeader.name" 
    align="center">
    <template v-for="item in coloumnHeader.children">
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
  </el-table-column>
</template>
<script>
// 递归 elementUI 多层级表头
export default {
  name: 'TableColumn',
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    }
  }
}
</script>