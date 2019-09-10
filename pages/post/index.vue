<template>
  <div class="post_index">
    <el-row class="post_main">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- tab栏 -->
          <div
            class="menu"
            v-for="(item,index) in content"
            :key="index"
            @mouseover="count = index;countIndex = index;isShow = true;contentList = item"
            @mouseout="isShow = false"
          >
            <span>{{item.type}}</span>
          </div>
        </div>
        <!-- tab栏内容 -->
        <div v-if="content.length">
          <div class="menu_contnent" 
          v-show="count === index"
          v-for="(item,index) in content[count].children"
          :key="index"
          >
            <div class="content">
              <span class="num">{{index}}</span>
              <span class="city">{{item.city}}</span>
              <span class="introduce">{{item.desc}}</span>
            </div>
          </div>
          
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">2</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      count: 0,
      countIndex:-1,
      content: [],
      contentList:[]
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.content = res.data.data;
      console.log(this.content[this.count].children)
    })
  }
};
</script>

<style lang='less'>
.post_index {
  .post_main {
    position: relative;
    padding-top: 20px;
    width: 1000px;
    margin: 0 auto;
    .menu {
      position: relative;
      width: 260px;
      height: 40px;
      font-size: 14px;
      padding: 0 15px;
      border: 1px solid #ccc;
      line-height: 40px;
      &:nth-child(-n + 3) {
        border-bottom: none;
      }
      &:after {
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        position: absolute;
        right: 20px;
        top: 15px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
      }
      &:hover {
        color: rgb(255, 165, 0);
      }
      &:hover::after {
        border-top: 1px solid rgb(255, 165, 0);
        border-right: 1px solid rgb(255, 165, 0);
      }
    }
    .menu_contnent {
      position: absolute;
      width: 350px;
      top: 20px;
      left: 292px;
      border: 1px solid #ccc;
      border-left: none;
      z-index: 99;
      background-color: rgb(255, 255, 255);
      .content {
        height: 40px;
      }
    }
  }
}
</style>