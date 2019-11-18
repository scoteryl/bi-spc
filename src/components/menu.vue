<template>
  <div 
    v-if="value" 
    :style="{top: positionY, left: positionX}" 
    class="menuMain" 
    :class="direction==1?'right':'left'"
    @mouseleave="leaveMenu"
    @mouseover="subTitEnter($event)">
    <ul v-html="menuDomStr" @click="selectClick($event)">
    </ul>
  </div>
</template>
<script>
export default {
  name: 'menuMain',
  props: {
    value: Boolean,
    // menuShow: Boolean,
    menuList: Array,
    callback: Function,
    x: Number,
    y: Number,
  },
  data: function() {
    return {
      // 是否展示
      // show: false,
      show: this.value,
      // // 菜单列表
      // menuList: [],
      // 解析后的菜单DOM字符串
      menuDomStr: "",
      // 是左弹还是右弹 1 右弹  2 左弹
      direction: 1,
      // 菜单最大深度
      depth: 1,
      // 单层菜单的最大宽度
      maxWidth: 102,
      // 定位坐标
      positionX: '0px',
      positionY: '0px',
    }
  },
  methods: {
    // 解析传入菜单数据  递归解析菜单数据
    parsing: function(data, dep) {
      var html = "";
      this.depth = this.depth>dep?this.depth:dep;
      for(var i=0; i<data.length; i++){
        var one = data[i];
        // console.log(one);
        if(one.children && one.children.length){
          // 有子菜单
          html += "<li class='item subMenuItem'><span class='tit' title='"+one.key+"'>" + one.key + "</span><ul class='subMenu'>" + this.parsing(one.children, dep+1) + "</ul></li>";
        }else{
          // 当前是最底层菜单
          html += "<li class='item'><span class='menuNode' title='"+one.key+"' data-id='" + one.id + "'>" + one.key + "</span></li>";
        }
      }
      return html;
    },
    // 选中事件
    selectClick: function(e) {
      // console.log(e);
      var targetEl = e.target;

      if(targetEl.className == 'menuNode'){
        // console.log("当前最后子节点");
        var itemId = targetEl.getAttribute("data-id");
        if(this.callback){
          this.callback(itemId);
        }
        this.show = false;

        // console.log(targetEl.getAttribute("data-id"));
      }else{
        // console.log("子菜标题");
      }

    },
    // 鼠标移出菜单
    leaveMenu: function() {
      // this.value = false;
      this.$emit('input', false);
    },
    // 子级菜单 标题进入
    subTitEnter: function(e) {
      var targetEl = e.target;
      // console.log(e);
      if(targetEl.className == "tit"){
        // console.log(targetEl.getClientRects());

      }
    }

  },
  // created: function() {
  //   console.log(123);
  //   // this.
  //   // console.log(this.menuList);
  // },
  watch: {
    // // 自定义组件 v-model传入的值是value
    // value: function (newValue, oldValue) {
    //   console.log(newValue);
    //   this.show = newValue;
    // },
    value: function(newValue, oldValue) {
      // console.log();
      // console.log(this.menuList);
      if(newValue){
        // 当要展示菜单时
        // console.log(this.x,this.y);

        // 解析传入菜单数据
        this.menuDomStr = this.parsing(this.menuList, 1);

        // 当前视口宽度
        var viewW = window.innerWidth;
        var viewH = window.innerHeight;

        // 当前菜单最大深度展开宽度
        var menuMaxWidth = this.maxWidth * this.depth;


        // 横向超屏检测
        if(this.x+this.maxWidth > viewW){
          // 一层都展不开的超屏 向左展开菜单
          this.direction = 2;
          this.positionX = viewW - (this.maxWidth+5)+'px';
        }else if(this.x+(this.maxWidth*this.depth) > viewW){
          // 能展开第一层，但展不开最大深度
          this.direction = 2;
          this.positionX = (this.x?this.x-5:0)+'px';
        }else{
          // 都没有问题
          this.direction = 1;
          this.positionX = (this.x?this.x-5:0)+'px';
        }
        // 纵向超屏检测
        this.positionY = viewH>this.menuList.length*32+this.y?this.y-5+'px':(viewH-this.menuList.length*32-5+'px')
        // console.log(viewH, this.menuList.length, this.positionY, this.y);


        // console.log(this.$options.data());
      }else{
        // 自定义组件要用 父级input回传数据
        this.$emit("input", false);
      }

    }
  }
}
</script>
<style lang="less" >

  .menuMain{
    position: fixed;
    z-index: 99999;
    ul{
      // padding: 0 5px;
      border: 1px solid #aaa;
      background-color: #fff;
      // width: 100px;
      &.subMenu{
        display: none;
        position: absolute;
        top: -1px;
        // left: calc(100% + 5px);
        // left: 100%;
      }
    }

    &.right ul.subMenu{
      left: 100%;
    }
    &.left ul.subMenu{
      right: 100%;
    }

    li{
      position: relative;
      white-space: nowrap;
      font-size: 12px;
      background-color: #fff;
      cursor: pointer;
      &:not(:last-child){
        padding-bottom: 1px;
        &:after{
          content: "";
          display: block;
          position: absolute;
          left: 5px;
          right: 5px;
          bottom: 0;
          height: 1px;
          background-color: #aaa;
        }
      }

      >span{
        display: block;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        max-width: 100px;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      &.subMenuItem:hover>ul{
        display: block;
      }

    }

  }
</style>