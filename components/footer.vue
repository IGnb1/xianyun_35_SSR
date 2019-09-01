<template>
  <div class="footer">
    <el-row type="flex" class="foot" justify="space-between">
      <el-col :span="6">
        <dl>
          <dt>闲云旅游旅游网</dt>
          <dd>上亿旅行者共同打造的"旅行神器"</dd>
          <dd>
            <span>60,000</span> 多个全球旅游目的地
          </dd>
          <dd>
            <span>600,000</span> 个细分目的地新玩法
          </dd>
          <dd>
            <span>760,000,000</span> 次攻略下载
          </dd>
          <dd>
            <span>38,000</span> 家旅游产品供应商
          </dd>
        </dl>
      </el-col>
      <el-col :span="5">
        <dl>
          <dt>关于我们</dt>
          <dd>隐私政策 商标声明</dd>
          <dd>服务协议 游记协议</dd>
          <dd>商城平台服务协议</dd>
          <dd>网络信息侵权通知指引</dd>
          <dd>闲云旅游旅游网服务监督员</dd>
          <dd>网站地图加入闲云旅游</dd>
        </dl>
      </el-col>
      <el-col :span="5">
        <dl>
          <dt>旅行服务</dt>
          <dd>旅游攻略 酒店预订</dd>
          <dd>旅游特价 国际租车</dd>
          <dd>旅游问答 旅游保险</dd>
          <dd>旅游指南 订火车票</dd>
          <dd>旅游资讯 APP下载</dd>
        </dl>
      </el-col>
      <el-col :span="8">
        <div class="erweima">
          <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
          <span>关注我们</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="copy" justify="center">
        <span>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</span>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.footer {
  background-color: rgb(51, 51, 51);
  color: #ccc;
  .foot {
    width: 1000px;
    margin: 0 auto;
    padding: 30px 0 30px 50px;
    border-bottom: 1px solid #ccc;
    dd {
      font-size: 12px;
      margin-top: 10px;
      span {
        color: rgb(242, 154, 33);
      }
    }
    .erweima {
      width: 140px;
      text-align: center;
      padding-left: 50px;
      img{
          width: 100%;
      }
      span{
          font-size: 12px;
          
      }
    }
  }
  .copy{
      padding: 50px 0;
      span{
          font-size: 12px;
      }
  }
}
</style>