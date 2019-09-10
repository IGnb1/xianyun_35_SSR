<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          class="insurance-item"
          v-for="(item,index) in $store.state.air.infoData.insurances"
          :key="index"
        >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
        <input type="hidden" :value="allPrice" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      //保险id：数组
      insurances: [],
      //联系人名字
      contactName: "",
      //联系人电话
      contactPhone: "",
      //是否需要发票:默认不需要
      invoice: false,
      //座位id
      seat_xid: "",
      //航班id
      air: "",
      //验证码
      captcha: ""
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      // console.log(index)
      this.users.splice(index, 1);
    },

    //保险选中
    handleInsurance(id) {
      let index = this.insurances.indexOf(id);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
      //   console.log(this.insurances);
    //   console.log(this.allPrice)
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //如果手机号不为空，发送验证码
      if (this.contactPhone) {
        this.$axios({
          url: "/captchas",
          method: "POST",
          data: { tel: this.contactPhone }
        }).then(res => {
          this.$alert(`你的验证码是${res.data.code}`, "提示");
        });
      } else {
        this.$message.error("手机号不为空");
      }
    },

    // 提交订单
    handleSubmit() {
      const { id, seat_xid } = this.$route.query;
      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid,
        air: id
      };
      this.$axios({
        url: "/airorders",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: orderData
      }).then(res => {
        console.log(res);
        this.$message.success(res.data.message + `,跳转到支付页面`);
        this.$store.commit('air/setAllPirce',this.allPrice)
        setTimeout(() => {
          this.$router.push({
            path: "/air/pay",
            query: { id: res.data.data.id }
          });
        }, 1000);
      });
    }
  },
  mounted() {
    // setTimeout(() => {
    //   console.log(this.$store.state.air.infoData);
    // }, 10);
  },
  computed: {
    allPrice() {
      if (!this.$store.state.air.infoData.seat_infos) {
        return 0;
      }
      let infoData = this.$store.state.air.infoData;
      let price = 0;
      price += infoData.seat_infos.org_settle_price;
      price += infoData.airport_tax_audlet;
      price += 30 * this.insurances.length;
      price *= this.users.length;

      this.$store.commit('air/setAllPirce',price);
      return price;
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>