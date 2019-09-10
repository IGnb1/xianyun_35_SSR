<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="$store.state.air.infoData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
    //   //保险列表
    //   infoData: {
    //     insurances: [], // 初始化保险数据
    //     seat_infos: {}
    //   },
      //计算总数
      allPrice:0
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    //获取保险数据
    this.$axios({
      url: `airs/${id}`,
      params: { seat_xid }
    }).then(res => {
      this.$store.commit('air/setInfoData',res.data)
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>