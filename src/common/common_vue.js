// 获取文档滚动高度
function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  }else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  }else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

// 格式化时间
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// base64图片进二进行文件（Blob）
function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  }
  var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}

// 对象数组查询
function searchArr(arr,ind,val){
  arr=Array.isArray(arr)?arr:[];
  for(var i=0;i<arr.length;i++){
    var one=arr[i];
    if(one[ind]==val){
      return {result:true,data:one,index:i};
    }
  }
  return {result:false,data:null,index:-1};
}


// 自定义提示弹窗
function alertModelMsg(msg,fun,num){
  num=parseInt(isNaN(num)?0:num);

  var d=document.createElement("div");
  d.style.cssText="position:fixed;top:0;left:0;right:0;bottom:0;z-index:9000;";
  d.innerHTML="<p style='box-sizing:border-box;position:absolute;bottom:15%;left:50%;-webkit-transform:translate(-50%,0%);-moz-transform:translate(-50%,0%);-ms-transform:translate(-50%,0%);transform:translate(-50%,0%);max-width:80%;line-height:25px;font-size:16px;color: #fff;text-align: center;padding: 5px 10px;background-color: rgba(0,0,0,0.6);border-radius:5px;'>"+msg+"</p>";

  document.body.append(d);

  setTimeout(function(){

    d.parentNode.removeChild(d);
    if(typeof(fun)=="function"){
      fun();
    }

  },num>0?num:2000);

}

// 自定义确认弹窗
function confirmModel (tit, msg, btn, success, error) {
  btn = Array.isArray(btn) ? btn : [];

  var d = document.createElement('div');
  d.id = 'confirmModel';
  d.style.cssText = 'position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4);z-index: 1000;';
  // pc
  d.innerHTML = "<div style='position: absolute;top: 50%;left: 50%; -webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);transform: translate(-50%,-50%);width:380px;overflow: hidden;border-radius: 10px;background-color: #fff;'><div style='height:50px;line-height:50px;text-align:center;font-size:18px;background-color: #2E91F6;color:#fff;'><h3 style='margin:0;padding:0;'>" + tit + "</h3></div><div style='background-color: #fff;padding: 20px 30px;line-height: 25px;'><p style='margin:0;padding:0;text-align:center;font-size: 16px;'><img style='height:20px; width: 20px;margin-right:10px;vertical-align: sub;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEKUlEQVRYR72XX2wUVRTGvzPdO1IFSiv40HYWRcvMFhPA0NiIplpJicb470EfNMFUnyAq0cQH/8SI+GBilAhqYiDREB/RGJMCikFMTUwKxljqTqmmMNOipSqRUtS5u/OZWd1muyx0pm12s8kmc8/5zm/u3Xvv+QQxP0PAFbl0TZfAeIhABpRlAJcKEH1/o3BcgKyE4T5jJN/TAvwTR1pmCjqVRv0FqlcBbBKRhSTPC+QbgmMCOQPwSgI3imA1IHWRHslJAfYy1C9mRvH75WpcEoCAMZhWTwLYBshikl+A8sGCVPDxdSfxdyXRobS5KiS7KLgHkE6AEyRfcfzcDgHylXIqAgwsw0KjVn0ikA1RYQGed3x9dKbZKh13LbUOkG0Q3AXwsJrQD1x/Fn+Wa1wE8FMjrFzK/JzgCgN4wvb03iSFy2PdZvMRGNxNigcdbMz8ipOlMdMAhhqwOH+V+R3BJRBszHj62FyKF3OHGtXafAoHALlQi+Cm5R7OFsemAAgo11KHBFhvgJ0r/dzX81F8CqJJtedqEGkeTXn6juIumQJwrdQLEGO7kM/Yvn5rPosXtQYttZki74DY7vjBS9HzAsDP9ajTi5QH4oTj67a4xV1LfQ8BHU+vjZ2TVr0k1iDUy6MtWgBw0+brAJ4ThLfZXq43tlgEAMDx9ZoEOesg0gfwbcfTTwsBcS01DmAg4+uOuEJzicta5kERttuebhA3nVoPGL1CbrF9/e5chOPmus3qcRiyW/LhBilOfyhBY+sp/BJXpLB0zWoHBUsyvn4sSV62CVeLocYh2CnZtPkZCDvjByuTiESxWUt9Ff1mfH170lzXUj9QMBatfx8E5xxP35lUZG4AZg9BS1zLHCH4ZcbXm6oJkE2r90E8GAGMQnjY8fSj1QRwLbWHwP3FJZhwPN1ZXQBzP8HmaAY+JdCa8YOWagJkLdUPyOmpbQgGTY6P00kgZvsnLG5DEeyaOohAbnZ8/V41AFxLdUNkT+EgKjmKjyfdz7OdAdcyD0B4i+3p+mmXkcGwI0kfMBuAQqsm0ifgTtvTTxUA/GY0TBpqGITr+PrmuMsQHcWF23BEb42d8/91rAK94oYxnKnQkITP2n7uzbiCSeIGLbWFIrsuakgikQHANCx1RIC2mhC3tozqb5OIzxQ7VGzJiGOhrztWAUGUM60pjUzIXzSjZqFOgLttX/fNJBxnfLBJrQ5rcFAo52slaKvYlBaFSttyCaXbGQk+ilPkUjGDlvkwhR+S4ksQdDljGC6NrYoxIXkkNanvbfkD58pBL2vNTliprRR5ObJmkbsh2QMaBzMjQX+lNx6+FguCvHlfCHSLoCuyZgBfs73cG4msWal4uTn9b4yRxToOoh8ikf+7BkCjCNoBWTQv5rT8DcvseSsoSyvY8x+F4T7Dz++Pa8//BabHDJ44Qf8WAAAAAElFTkSuQmCC'/>" + msg + "</p></div><div style='position: static;border-top: 1px solid #aaa; padding: 15px 20px;text-align: center;'><button class='confirmError' style='display: inline-block;margin: 0;padding:0;border: 1px solid #2E91F6;margin-right:30px;width: 120px; height: 35px;line-height: 35px; color: #2E91F6;background-color: #fff;border-radius:5px;'>" + (btn[1] ? btn[1] : '否') + "</button><button class='confirmSuccess' style='display: inline-block;margin: 0;padding:0;border: 1px solid #2E91F6;width: 120px; height: 35px;line-height: 35px; color: #fff;background-color: #2E91F6;border-radius:5px;'>" + (btn[0] ? btn[0] : '是') + "</button></div></div>";
  // 移动端
  // d.innerHTML="<div style='position: absolute;top: 50%;left: 50%; -webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);transform: translate(-50%,-50%);max-width:280px;width:80%;overflow: hidden;border-radius: 10px;background-color: #fff;'><div style='height:.8rem;line-height:.8rem;text-align:center;font-size:.3rem;background-color: #2E91F6;color:#fff;'><h3>"+tit+"</h3></div><div style='background-color: #fff;padding: .3rem .2rem;line-height: .5rem;overflow:hidden;'><p style='text-align:center;font-size: .3rem;line-height:.5rem;'><img style='display: inline-block;height:.4rem; width: .4rem;margin-right:.2rem;vertical-align: sub;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEKUlEQVRYR72XX2wUVRTGvzPdO1IFSiv40HYWRcvMFhPA0NiIplpJicb470EfNMFUnyAq0cQH/8SI+GBilAhqYiDREB/RGJMCikFMTUwKxljqTqmmMNOipSqRUtS5u/OZWd1muyx0pm12s8kmc8/5zm/u3Xvv+QQxP0PAFbl0TZfAeIhABpRlAJcKEH1/o3BcgKyE4T5jJN/TAvwTR1pmCjqVRv0FqlcBbBKRhSTPC+QbgmMCOQPwSgI3imA1IHWRHslJAfYy1C9mRvH75WpcEoCAMZhWTwLYBshikl+A8sGCVPDxdSfxdyXRobS5KiS7KLgHkE6AEyRfcfzcDgHylXIqAgwsw0KjVn0ikA1RYQGed3x9dKbZKh13LbUOkG0Q3AXwsJrQD1x/Fn+Wa1wE8FMjrFzK/JzgCgN4wvb03iSFy2PdZvMRGNxNigcdbMz8ipOlMdMAhhqwOH+V+R3BJRBszHj62FyKF3OHGtXafAoHALlQi+Cm5R7OFsemAAgo11KHBFhvgJ0r/dzX81F8CqJJtedqEGkeTXn6juIumQJwrdQLEGO7kM/Yvn5rPosXtQYttZki74DY7vjBS9HzAsDP9ajTi5QH4oTj67a4xV1LfQ8BHU+vjZ2TVr0k1iDUy6MtWgBw0+brAJ4ThLfZXq43tlgEAMDx9ZoEOesg0gfwbcfTTwsBcS01DmAg4+uOuEJzicta5kERttuebhA3nVoPGL1CbrF9/e5chOPmus3qcRiyW/LhBilOfyhBY+sp/BJXpLB0zWoHBUsyvn4sSV62CVeLocYh2CnZtPkZCDvjByuTiESxWUt9Ff1mfH170lzXUj9QMBatfx8E5xxP35lUZG4AZg9BS1zLHCH4ZcbXm6oJkE2r90E8GAGMQnjY8fSj1QRwLbWHwP3FJZhwPN1ZXQBzP8HmaAY+JdCa8YOWagJkLdUPyOmpbQgGTY6P00kgZvsnLG5DEeyaOohAbnZ8/V41AFxLdUNkT+EgKjmKjyfdz7OdAdcyD0B4i+3p+mmXkcGwI0kfMBuAQqsm0ifgTtvTTxUA/GY0TBpqGITr+PrmuMsQHcWF23BEb42d8/91rAK94oYxnKnQkITP2n7uzbiCSeIGLbWFIrsuakgikQHANCx1RIC2mhC3tozqb5OIzxQ7VGzJiGOhrztWAUGUM60pjUzIXzSjZqFOgLttX/fNJBxnfLBJrQ5rcFAo52slaKvYlBaFSttyCaXbGQk+ilPkUjGDlvkwhR+S4ksQdDljGC6NrYoxIXkkNanvbfkD58pBL2vNTliprRR5ObJmkbsh2QMaBzMjQX+lNx6+FguCvHlfCHSLoCuyZgBfs73cG4msWal4uTn9b4yRxToOoh8ikf+7BkCjCNoBWTQv5rT8DcvseSsoSyvY8x+F4T7Dz++Pa8//BabHDJ44Qf8WAAAAAElFTkSuQmCC'/>"+msg+"</p></div><div style='position: static;border-top: 0.02rem solid #aaa; padding: .2rem 22%;text-align: center;overflow: hidden;'><button class='confirmError' style='float:left;margin: 0;padding:0;border: 0.01rem solid #2E91F6;width: 1.2rem; height: .7rem;line-height: .7rem; color: #2E91F6;background-color: #fff;border-radius:.1rem;'>"+(btn[1]?btn[1]:'否')+"</button><button class='confirmSuccess' style='float:right;margin: 0;padding:0;border: 0.02rem solid #2E91F6;width: 1.2rem; height: .7rem;line-height: .7rem; color: #fff;background-color: #2E91F6;border-radius:.1rem;'>"+(btn[0]?btn[0]:'是')+"</button></div></div>";

  document.body.append(d);
  document.getElementById('confirmModel').getElementsByClassName('confirmSuccess')[0].focus();
  // 确定
  document.getElementById('confirmModel').getElementsByClassName('confirmSuccess')[0].addEventListener('click', function () {
    console.log('成功');
    // $("#confirmModel").remove();
    var target = document.getElementById('confirmModel');
    target.parentNode.removeChild(target);
    if ( typeof (success) == 'function') {
      // fun();
      success();
    }
  });
  // 取消
  document.getElementById('confirmModel').getElementsByClassName('confirmError')[0].addEventListener('click', function () {
    console.log('失败');
    var target = document.getElementById('confirmModel');
    target.parentNode.removeChild(target);
    // $("#confirmModel").remove();
    if (typeof (error) == 'function') {
      // fun();
      error();
    }
  });

}

// confirmModel("这是标题","这是内容提示",["确定","取消"],function(){console.log("这是成功回调")},function(){console.log("这是失败回调")});

// loading 加载
function loadingFun () {
  var d = document.createElement('div');
  d.id = 'loadingFunAlert';
  d.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:1000;';
  d.innerHTML = "<img style='position: absolute;top: 50%;left: 50%;width: 12%;transform: translate(-50%,-50%);max-width: 50px;' src='data:image/gif;base64,R0lGODlhgACAAPICAN3d3bu7u////5mZmf///wAAAAAAAAAAACH5BAUFAAQAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAgACAAAAD/ki63P4wykmrvTjrzbv/oCaMQmieaEaSaeu66/rOdBezda5P97j/wEWvFCzmhsbkDKlsEgBQwIfZGVgHTk006qFurtfsZbu19argsJhC5nK8mbR6LWm7Reev3Eqf2O8YcBZ7c30Qf1J4N3p7hmx/ijEahFiOfpAqeRiUlo92mYubhJ2enxeCEpSVpHWYFqgRnKyXrhSwD6qzpWSnmhSyurRtr76po8G7ZRW3DcDIraY8xRDOzxGIiRLMCrnWyYAQ2wTV3oeI0qGx5OUP5+g4xo10AfQBIe7a8OryH2Af9fVA4AuxLk6aDgATfqgF4hgafhkSSuzAsB9EgwUpSNzI/mFYCjkcVBXCsJHjBmUt/DESibDkRHbURI7U4NIkTG4yZ3Ko+bJcTp0eeCr09pOPC6EAkRVdNQNpQFJLfzil1ylqkKmOijZBmlXmGp5dMyapGfbivJ6GzDpKChXozbdw48qdS7eu3bt48+rdy7cv36XdfAJ2yGBw4GeGqyU+rGuxM8eEG0MGuWAyZaWWVeLMbBQzZ6bjOAvOjMsyTNJ+U6tezbq169ewY8ueTbv2DM2WcFe9nJZ3H8ZigDth2VsskJxljdfQWtxrEKvJieuAnps5DeqssJ/QLvnnR+tEwXvgHt77ePNzxYtyPsmtxc4YpcdXHlM3wYMr6ZfWvx+/0onI6wE4iIAB2neeb+2pNaCB8zEYEoEFgpaghPk5WJl7myG40m8QXmhhhv7VJVxhCnpY4k3KdQjih6OduCJ89blYnoYOqPgijG/pZ+ONFLKjo4w8ysXfjkHmOCSQPPboGY0xskgiktUReWOETkbJZJMY1iglh1CaWOWTV+7W5ZQNZtlciBds6eWXWYw4gZpJLolmmmOuaWZwddqp5C95GgGnng/N2RabWob5pqDZ3bkPonTiqNqftpEZ6YSETiqppY0yiimWjm4aj6KemhjqqJ4mAAAh+QQFBQAEACwKAAIAVwAwAAAD/ki63P4wPkCBvDjrPSvlYChKnjeeKFdWaet26yu/6zffZ23hPKj3o4AwkPqhBEhBazhEGUfJJIrJzNVO0eiJ2hw9Q1lpkCv0XkVhsYjc9Z1BafWaLfpu4soUm+iOweMueyF2GXgvgipvGoaHiBqEEnh5jWSJfouAM3t8GZAQkjiOGJ4PjKF0nYqRmTyiJKoRpq2oF6QMsrO0EbYKoEAKrjAlGLg9m7WwDb6/wLoQl7GsEAPUA4HOwsTSD9XVS9hH2w3d5HqVMuLj5OVjXDPpDOvy7W3oWRjy83NlPFoZ+fqYCQQYUOAvgusMMkPITiEQht0cHoRITWIPihUt8sCoFPEiw44PCYIMmW/kxIYmSVpLqSEBACH5BAUFAAQALB8AAgBXADAAAAP+SLrc/ivIAKu9OOs25/5gqHWdaJ4i6aFsW6mSK88ETNH4aed8uPeigXDA+p0ASEBrOEQZRckkisnUwY5RqYnaND1BWW2QK/ReoWHkidwFfTVp8ZicOoPjS7bPvokr83RufHB4LmxEH28XfjOHiCODi4yNehuKFZOUlRmXD35/NIeWkZiFOaKcpJ6mp5sXnQ2ZPKivqrGss7QvtgufQAu6ELAKskCOtSqSuMauwiQYxb8EwQ8lymEuAtoCGNQo0SHb292BMssg4ukXzSznGunw5FU42CLw9xnzOVEm9/jS0vz9A9hD4ECCOAzGQ8hDoTqGCR2Og0hD4kSKMyxqw1gV0SLHiAo/5ggpcqTAkgUXoky50UQCACH5BAUFAAQALDwAAgBCAEIAAAP+SDQ8+jDKSaudrd3Ne82ZJ44WqJFoajJpO66OK2/wbH/rrUe1G/yB3aOXAgKFi1zReNwRScym7imKSm/UjvVqy3K2QaH3AkYmTdCteVwpr5VaN5I9kc/hG3D4jY5bzUN4FnZ8IH5RgIF9ZGqJCnQKeo6PgnWNk5CSk5QhjH+bijGDly4ApgA7hCinpzqkq6ysN68isbauTCm2u6lcHru8oBvAwcIVxMXGEsi3yhTMsc4T0LLSEdSt1tfYqNoQ3N7L0OHTyOTPxOfHzerrpu3w8fLz9PX29/j5+voC/f7/AAMCNCawoMF/oA4qNLhpocOBkx5KFNBwosOEFg8SzCgDUEECACH5BAUFAAQALE4ACgAwAFcAAAPsSLq886PJSSuF0Op9cebg5n1hKY2kqaKpWrKRu7KyC9fmjYdwvHO6nygotBCLHRRyqFxWjk5GL5ocUSfTawN65aoC4ICRtguHn82aeV3FqNfsts8Er48fsrqdqt87+35IgHB8g2ZRhod/iWCFjI6GWolaCoOUC4CXDIGalWedoKGio6SlpqeoqaoqAK2ur7CxsDWytbavLre6tqy7vrgmv8IAvcO7uca3tMmyq87P0NHS09TVMgLYAqXZ3KLc39qd4N/i4+SU5uPo6eBa7O3u793x8tj09ev14Vf6+/z4+diVSxeKoLdzo+ZRSAAAIfkEBQUABAAsTgAfADAAVwAAA+lIutz+bsgBq71tTsw70aAnRmA4jmV6iqm6Yq37VrE8k7V207m+4z3KLxOUDIG9IzGoRLaajxwUUpvyTNarMMvter/gsHhMLpvP3IB6zW6727O3fM5e0e/zE34PH/H/AXqAe3aDdHGGb2iLjI2Oj5CRkpMKAJYAZpeaY5qdmGCenaChol2koaannlyqq6ytm6+wlrKzqbOfWbi5EAK+Ai+4Fb+/wbC9xMXGp8jJwDfMD87K0KXS0887scPYYti+3t1h39lf32Pn4+Lq0+Hr5u9e5O7O6PFd6ez1+vtg+f7t6BEj088euCkJAAAh+QQFBQAEACw8ADwAQgBCAAAD+Ui63P5QjUmrvTbqHbH/FSdyYPmN6GOuWepKbPy+sTy7tXnP+bn/wKBwSCwaj8ikcslsOp/QqHRKCFgD1Nd1mx1tv9iuBvwVR8hgswNNVjPYbXcVXpbP6Vf7HR928/N2f1Z6gkYAhwA3f0SIiIp4Q42NO3SRkodAbJaXiZl1EQKhAhycmEFcGqKipKVPqqobpaZMr6uxrU21oay4S7qjvJe5uiOytMQixr7Iyb1Ivyiync/MzZxK0NHKR9na19S1L9tF3d7C3NXmkujh4uNC5SnvQfHy30T16o7k6S7n/O12TGL3So+DfHYQylHohqEahw8LGnwAa2KDBAAh+QQFBQAEACwfAE4AVwAwAAAD/ki63P4wyjfqmDjrzYn9XSiOzWdeZKpKp7m+sNe6cR3Ora1reL7/kN4JSHQIacXkEZQsLi1N5RMVBU41gqzgF+gGRk+MVqvzesHHyXhcM5tJQvU623Z3VTjJnByzn/FIEHt0EwCGABh+dytMEYNbhYeGiYpRj5ARkpITiotFjxiah5R+SZehooicnZ+DGamqq6VAoK+pGqw/taiiuJU7u7yaG7k1pxqwxMUwwcKbyrPMzZG90NEr09TDHMsp2drP3L8q3xLJHd0i5ea3Iekcxx3n6O9YriLz9Ncd9/jtIuNC9AuRT58bb2tSFDToiQQbhf9GvKnibBTFKAsv/sioFFEHx441PoKEIXLki2omiYRLqSABACH5BAUFAAQALAoATgBXADAAAAP+SLrcLlC4Sau9OLfItf/gx41SaJ4hOaJsS6mkK7ewOt9gbeM8pse94OS3EhoXxM5xmYwsj03IE9qcUokngBYgHHgHmWR2q+19vz4dikzGnc+XWou9db+9aSWLXr/d0XFOLnxlFwGHARh/eFYEhFyGiIeKi1aPkBWSkheLjEuPGJqIlH9Pl6GiiZydn4QZqaqrpUagr6karEK1qKK4lUG7vJoeuTinGrDExTPBwpvKs8zNkb3Q0YOuH8kfy3vZ2rcg3WN8Idvcv97l5uHi6SbHIOfo7yDTyO3u1/brJvP6b9b0Y1fNRD1+bVD8A+hJYCGF+QwCakRtGEUrCy8KyagTsQfHjjg+gpwhcqSMgiaNPOORAAAh+QQFBQAEACwCADwAQgBCAAAD9Ugk3P7wqUmrvZjGzV3+4NWNXGiCZCqdrKW+QitPsDrf9Xjv+bb/wKBwSCwaj8ikcslsOp/QqHRKPQGugKoMy9WauOCsNxMGjy/l8JmSLq8Jbfc6rj7TzfY79q3f5/t8gIF3OwGGAUZ6hYeGRXQ/jIxEbUGRh454QJaXmFdDm40gA6MDUqCIoqSjUKeoGaqqT6chsKROrbS1pU2zubW8oCe6u0u9vrBMxsexSrjCusXBLMPNysu2SdbXq0ja28RG3qm/R+LjyOHmH9TpmzvsRdI38ETyM/T1kUD4+aE//G8mAAxIYGBAg28QrlF4hmFDdAQxMEsAACH5BAUFAAQALAIACgAwAGwAAAP+SLrc/ktIAau9bU7Mu9KaJ1bgNp5MaaKnurKiS8GtS4/yjdt6J889TC4oHBItxiOJp4Qkm44nNCKdEqrTnzXKhAC+gB6WAAbrsOX0rctIu2HshXvOKlXmdFTIgs9P+35QgG9/g2VbhodWiWaFjIiPkINbcoCUlXiXbYSam1+doKGio6SlpqeoqToBrK2ur7CvMLG0ta4otrm1J7q9siO+wQG8wr24xbazyLGqzc7P0NHS09TPA9cDo9jboNve2Zff3pTi31bl4lDo6U3r5kru4/Dx2Or01+334PP0U/cs3Cr0Q/HugTsY5SCgu5FQoTwaCwXW0xExXEOLF8ll3LIqrlNFjew0feS48dxIkyFBpiS5EmVBjC9ZxnQ5019JmhM9tlSJT1tOCwkAACH5BAkFAAQALAAAAAABAAEAAAMCSAkAOw=='/>";

  var idObject = document.getElementById('loadingFunAlert');
  if (idObject == null) {
    document.body.append(d);
    document.getElementById('loadingFunAlert').onclick = function () {
      var target = this;
      target.parentNode.removeChild(target);
    }
  }

}

// loading 关闭
function loadingClose () {
  // $("#loadingFunAlert").remove();
  var idObject = document.getElementById('loadingFunAlert');
  if (idObject != null) {
    idObject.parentNode.removeChild(idObject);
  }
}

// 格式化数据  传入数据，保留位数
function numFormat (num, n) {
  var offset = Math.pow(10, n+1);
  // console.log(offset);
  return (Math.round (num * offset) / offset).toFixed(n);
}

// // 说明
// function help(){
//   var help={
//     DateFormat:"格式化时间：yyyy-MM-dd hh:mm:ss,月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)",
//     dataURItoBlob:"传入base64字符串，将base64转成Blob二进制文件",
//     searchArr:"二维对象数组查询，searchArr(objArr,itemKey,val)  传入要查询的数组，查询的对象下标，比对值",
//     loadingFun:"加载时过渡gif",
//     loadingClose:"关闭过渡gif",
//     alertModelMsg:'提示信息，传入提示信息字符串，显示后的回调，显示时间 common.alertModelMsg("123456",function(){console.log(112374)},6000)',
//     confirmModel:'选择提示，传入提示标题，提示信息字符串，按键组名称，确定回调，取消回调 common.confirmModel("这是标题","这是内容提示",["确定","取消"],function(){console.log("这是成功回调")},function(){console.log("这是失败回调")});',
//     numFormat:'格式化数据，传入数据及要保留的位数'
//   }
// }


export default {
  dataURItoBlob: dataURItoBlob,
  searchArr: searchArr,
  getScrollTop: getScrollTop,
  getClientHeight: getClientHeight,
  getScrollHeight: getScrollHeight,
  alertModelMsg: alertModelMsg,
  confirmModel: confirmModel,
  loadingFun: loadingFun,
  loadingClose: loadingClose,
  numFormat: numFormat,
  // 服务器地址
  // serverUrl:"http://192.168.11.116/kangzhisheng/public/v1"
  // serverUrl:"http://192.168.11.39/v1",
  serverUrl: 'http://192.168.3.193:8888/v1',
  // 静态资源服务器协议
  staticHttp: 'http://'

};
