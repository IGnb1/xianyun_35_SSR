<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          v-model="form.departDate"
          style="width: 100%;"
          @change="handleDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
//引入时间插件
import moment from "moment";
export default {
  data() {
    return {
      //设置日期
      pickerOptions: {
        //设置禁用日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      //往返城市列表
      form: {
        //出发城市和城市代码
        departCity: "",
        departCode: "",
        //目标城市和城市代码
        destCity: "",
        destCode: "",
        //出发日期
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      JsonObj:[]
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("往返功能暂未开通", "提示");
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      //如果没输入，在cb回调函数传入空数组，这样就不会出现下拉框
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const { data } = res.data;
        let newData = [];
        //将返回的数据带有的市字去掉
        data.forEach(e => {
          e.value = e.name.replace("市", "");
          newData.push(e);
        });
        //默认选择下拉菜单的第一个城市
        this.form.departCity = newData[0].value;
        this.form.departCode = newData[0].sort;

        // cb调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
        cb(newData);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      //如果没输入，在cb回调函数传入空数组，这样就不会出现下拉框
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const { data } = res.data;
        let newData = [];
        //将返回的数据带有的市字去掉
        data.forEach(e => {
          e.value = e.name.replace("市", "");
          newData.push(e);
        });
        //默认选择下拉菜单的第一个城市
        this.form.destCity = newData[0].value;
        this.form.destCode = newData[0].sort;

        // cb调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item)
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // console.log(item)
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // console.log(moment(value).format('YYYY-MM-DD'))
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      let { departCity, departCode, destCity, destCode } = this.form;
      //切换原理：交叉赋值
      //出发城市
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      //目标城市
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      if (!this.form.departCity) {
        this.$alert("请输入出发城市", "提示");
        return;
      }
      if (!this.form.destCity) {
        this.$alert("请输入目标城市", "提示");
        return;
      }
      if (!this.form.departDate) {
        this.$alert("请选择出发时间", "提示");
        return;
      }
      //   console.log(this.form);
      //跳转到机票页面
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
      // 保存搜索机票
      this.JsonObj = JSON.parse(localStorage.getItem('airs') || "[]")
      this.JsonObj.push(this.form)
      localStorage.setItem('airs',JSON.stringify(this.JsonObj))
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>