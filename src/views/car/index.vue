<template>
  <div class="shoppingCar">
    <header>
      <h3>购物车</h3>
    </header>
    <main>
      <el-table
        ref="multipleTable"
        :data="carList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="商品图片"
          width="120">
          <template slot-scope="scope">
          <img
            :src="imgUrl+scope.row.proPic"
            width="100px"
            height="100px"
            />
        </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名"
          width="120">
          <template slot-scope="scope">{{ scope.row.proName }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="商品介绍"
          show-overflow-tooltip>
           <template slot-scope="scope">{{ scope.row.proIntroduce }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="单价"
          width="120">
            <template slot-scope="scope">{{ scope.row.proPrice }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="数量"
          width="150">
            <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="金额"
          width="120">
          <template slot-scope="scope">{{ scope.row.total}}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="80">
          <template slot-scope="scope">
          <span @click="deletedCar(scope.row.id)" style="cursor:pointer;color:blue">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <div class="count">合计：{{money}}</div>
      <el-button type="success" style="width:100px;height:50px" @click="addOrder()">结算</el-button>
    </footer>
  </div>
</template>

<script>
import * as car from '@/api/car';
import * as order from '@/api/order';
import { mapGetters } from 'vuex';

export default {
  name: 'car',
  data() {
    return {
      num: 1,
      carList: [],
      multipleSelection: [],
      imgUrl: 'http://localhost:8080/product/images/',
      money: 0,
      orderList: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.money = 0;
      for (let i = 0; i < this.multipleSelection.length; i += 1) {
        this.money = this.money + this.multipleSelection[i].total;
      }
    },
    getCarList() {
      car.carList(this.userId)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.carList = result.data.data;
              this.money = 0;
              break;
            default:
              this.$message.error('载入失败');
              break;
          }
        });
    },
    deletedCar(carId) {
      this.$confirm('是否从购物车删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        car.deleteCar(carId)
          .then((result) => {
            switch (result.data.code) {
              case 0:
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.getCarList();
                break;
              default:
                this.$message.error('载入失败');
                break;
            }
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    addOrder() {
      const data = new Date();
      const month = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
      const date = data.getDate() <= 9 ? `0${data.getDate()}` : data.getDate();
      const hour = data.getHours();
      const minutes = data.getMinutes();
      const seconds = data.getSeconds();
      this.value = `${month}${date}${hour}${minutes}${seconds}`;
      const orderList = [];
      for (let i = 0; i < this.multipleSelection.length; i += 1) {
        orderList.push({
          orderId: this.value,
          proId: this.multipleSelection[i].proId,
          userId: this.userId,
          number: this.multipleSelection[i].number,
          total: this.money,
          status: 0,
        });
      }
      order.addOrderByCar(orderList)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$router.push({ name: 'mine' });
              for (let i = 0; i < this.multipleSelection.length; i += 1) {
                car.deleteCar(this.multipleSelection[i].id);
              }
              break;
            case 1:
              this.$router.push({ name: 'mine' });
              this.$message.error('余额不足，请前往充值');
              break;
            default:
              this.$message.error('下单失败');
              break;
          }
        });
    },
  },
  created() {
    this.getCarList();
  },
  computed: {
    ...mapGetters([
      'phone',
      'userId',
    ]),
  },
};
</script>

<style lang='scss' scoped>
.shoppingCar{
  height: 100%;
  padding-top:10px;
  margin: 0 auto;
  header{
    width:$detailWidth;
    margin: 0 auto;
    height: 100%;
  }
  main{
    width:$detailWidth;
    margin: 0 auto;
    height: 100%;
    min-height: 58vh;
  }
  footer{
    width:$detailWidth;
    height: 50px;
    background: $white;
    margin-top:50px;
    margin: 0 auto;
    display:flex;
    flex-direction:row;
    justify-content: flex-end;
    .count{
      margin: 10px 50px;
    }
  }
}
</style>
