<template>
  <div class="header">
    <el-row type="flex" class="main" justify="space-between">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="login">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
    .header{
        height: 60px;
        border-bottom: 3px solid #eee;
        box-shadow: 0 2px 2px #eee;
        .main{
            width: 1000px;
            margin:0 auto;
            .logo{
                width: 156px;
                img{
                    width: 100%;
                    margin-top: 9px;
                }
            }
            .navs{
                flex: 1;
                line-height: 60px;
                margin: 0 20px;
                a{
                    padding: 0 20px;
                    box-sizing: border-box;
                    display: block;
                    height:60px;
                    &:hover,&:active{
                        color:#409eff;
                        border-bottom:5px solid #409eff;
                    }
                    &:focus{
                        background-color: #409eff;
                        color:#fff;
                    }
                }
            }
            .login{
                line-height: 60px;
            }
        }
    }
</style>