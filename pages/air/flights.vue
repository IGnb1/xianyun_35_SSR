<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightsData.total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      flightsData: {}, // 航班总数据
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      //分页
      pageIndex: 1,
      pageSize: 5
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsAside
  },
  mounted() {
    // console.log(this.$route)
    // console.log(this.$route.query)
    this.getData()
  },
  methods: {
    //切换每页条数是触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.dataList = this.flightsData.flights.slice(0, val);
    },
    //切换页数是触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // console.log(this.dataList);
    },
    //获取机票数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        //   console.log(res);
        this.flightsData = res.data;
        this.dataList = this.flightsData.flights.slice(0, this.pageSize);
        // console.log(this.flightsData);
      });
    }
  },
  watch:{
    //侧边栏点击变化url参数，$route监听url参数变化实行筛选
    $route(){
      this.getData()
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>