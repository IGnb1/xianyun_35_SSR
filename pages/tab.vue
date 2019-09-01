<template>
  <div class="tab" style="padding:30px;margin-bottom:20px;">
    <div class="tabs">
      <span
       v-for='(item,index) in ["娱乐","综艺","NBA"]' 
       :key='index' @click="current=index" 
       :class="{active:current===index}">
          {{item}}
      </span>
    
    <ul v-show="current===0">
      <li>曝吴亦凡聊天视频女主另有其人</li>
      <li>周杰伦蔡依林同台领奖</li>
      <li>钟丽缇自曝曾离家出走力挺老公不是吃软饭</li>
    </ul>
    <ul v-show="current===1">
      <li>郭碧婷喜欢向佐吃饭的样子</li>
      <li>爽爸直言郑爽对待感情太专一 害怕其感情受伤</li>
      <li>小G娜大方认整容鼻子花钱最多</li>
    </ul>
    <ul v-show="current===2">
      <li>美国男篮世界杯首秀看点：沃克米切尔谁是老大？</li>
      <li>篮球世界杯次日看点：头号球星首秀 美国男篮亮相</li>
      <li>《美国日记》赛前闭门训练 张卫平点出梦之队最大困难</li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  }
};
</script>

<style lang='less' scoped>
.tabs{
    border:1px solid skyblue;
    span{
        cursor:pointer;
    }
}
.active{
    color:red;
}
</style>