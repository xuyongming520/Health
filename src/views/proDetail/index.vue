<template>
  <div id="bookDetail">
    <main>
      <el-card class="cardBox">
        <div class="boxLeft">
          <img :src="`http://localhost:8080/product/images/`+detail.pic">
        </div>
        <div class="boxRight">
          <p style="color:red;font-size:24px;magin:none">￥{{detail.price}}</p>
          <h1>{{detail.name}}</h1>
          <el-tag type="success" class="tag" size="medium">{{detail.className}}</el-tag>
          <p class="introduce">{{detail.introduce}}</p>
          <div class="store">库存：{{detail.storage}}</div>
          <el-input-number
          v-model="num"
          :min="1"
          label="描述文字">
          </el-input-number>
          <el-button
                  type="info"
                  size="medium"
                  style="margin-left:20px"
                  @click="buyToCar()"
                  :disabled="detail.storage<=0"
                  >
                  加入购物车
          </el-button>
          <el-button
                  type="danger"
                  size="medium"
                  @click="buy()"
                  :disabled="detail.storage<=0"
                  >
                  购买
          </el-button>
        </div>
      </el-card>
      <el-card class="bookList">
        <div slot="header">
          商品详情
        </div>
        <el-row :gutter="20">
          <el-col :span="8" v-show="detail.shelfLife">
            <div class="grid-content">保质期：{{detail.shelfLife}}天</div>
          </el-col>
          <el-col :span="8" v-show="detail.manufacturerCon">
            <div class="grid-content">厂家联系方式：{{detail.manufacturerCon}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.proNumber">
            <div class="grid-content">生产许可证编号：{{detail.proNumber}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" v-show="detail.series">
            <div class="grid-content">系列：{{detail.series}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.provinces">
            <div class="grid-content">省份：{{detail.provinces}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.factoryName">
            <div class="grid-content">厂名：{{detail.factoryName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" v-show="detail.netContent">
            <div class="grid-content">净含量：{{detail.netContent}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.storeMethod">
            <div class="grid-content">储藏方法：{{detail.storeMethod}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.brand">
            <div class="grid-content">品牌：{{detail.brand}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" v-show="detail.model">
            <div class="grid-content">型号：{{detail.model}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.color">
            <div class="grid-content">颜色：{{detail.color}}</div>
          </el-col>
          <el-col :span="8" v-show="detail.ingredients">
            <div class="grid-content">配料表：{{detail.ingredients}}</div>
          </el-col>
        </el-row>
      </el-card>
    </main>
  </div>
</template>

<script>
import * as product from '@/api/product';
import * as order from '@/api/order';
import * as car from '@/api/car';
import { mapGetters } from 'vuex';

export default {
  name: 'proDetail',
  data() {
    return {
      detail: [],
      num: 1,
    };
  },
  methods: {
    getProDetail() {
      product.query(this.$route.params.id)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.detail = result.data.data;
              break;
            case 1:
              this.$message.error('加载失败');
              break;
            default:
              break;
          }
        });
    },
    buy() {
      const data = new Date();
      const month = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
      const date = data.getDate() <= 9 ? `0${data.getDate()}` : data.getDate();
      const hour = data.getHours();
      const minutes = data.getMinutes();
      const seconds = data.getSeconds();
      this.value = `${month}${date}${hour}${minutes}${seconds}`;
      const total = this.num * this.detail.price;
      const status = 0;
      order.addOrder(this.value, this.detail.id, this.userId, this.num, total, status)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$router.push({ name: 'mine' });
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
    buyToCar() {
      const total = this.num * this.detail.price;
      car.addCar(this.detail.id, this.userId, this.num, total)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$router.push({ name: 'car' });
              break;
            case 1:
              this.$message.error('下单失败');
              break;
            default:
              break;
          }
        });
    },
  },
  created() {
    this.getProDetail();
  },
  computed: {
    ...mapGetters([
      'userId',
      'phone',
    ]),
  },
};
</script>

<style lang='scss' scoped>
#bookDetail{
  height: 100%;
  main{
    width: $detailWidth;
    margin: 0 auto;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bookList{
      margin-top:40px;
      width: 95%;
      margin-bottom: 40px;
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
      }

      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
    }
    .cardBox{
      margin-top:40px;
      width: 95%;
      height:350px;
      .boxLeft{
        float: left;
        height:100%;
        width:30%;
        padding-left:20px;
        img{
          width: 300px;
          height:300px;
        }
      }
      .boxRight{
        float: left;
        padding:0px 10px 10px 40px;
        height:100%;
        width: 70%;
        p{
          margin: 0 0 0 0;
        }
        h1{
          margin: 5px 0 5px 0;
        }
        p:nth-of-type(2){
          color: #9c9c9c;
        }
        .tag{
          margin: 5px 0 5px 0;
          font-size: 14px;
        }
        .introduce{
          margin-top:10px;
          height:60px;
        }
        .store{
          width: 100%;
          height:50px;
          font-size:14px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
