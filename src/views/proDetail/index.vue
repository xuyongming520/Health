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
          @change="handleChange"
          :min="1"
          label="描述文字">
          </el-input-number>
          <el-button
                  type="info"
                  size="medium"
                  style="margin-left:20px"
                  @click="lend(scope.row.pkId,scope.row.infoId)"
                  :disabled="detail.storage<=0"
                  >
                  加入购物车
          </el-button>
          <el-button
                  type="danger"
                  size="medium"
                  @click="lend(scope.row.pkId,scope.row.infoId)"
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

        <!-- <template>
          <el-table
            :data="bookList"
            style="width: 100%;"
            :show-header="false">
            <el-table-column
              prop="pkId"
              width="100">
            </el-table-column>
            <el-table-column
              prop="location"
              width="800">
            </el-table-column>
            <el-table-column
              prop="status">
              <template slot-scope="scope">
                <el-tag :type="stateClasses[scope.row.status].type">
                  {{stateClasses[scope.row.status].display_name}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="lend(scope.row.pkId,scope.row.infoId)"
                  :disabled="stateClasses[scope.row.status].state"
                  >
                  借阅
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template> -->
      </el-card>
    </main>
  </div>
</template>

<script>
import * as product from '@/api/product';
import { mapGetters } from 'vuex';

export default {
  name: 'proDetail',
  data() {
    return {
      detail: [],
      num: 1,
      // class: ''
      // stateClasses: [
      //   {
      //     value: 0, display_name: '可借阅', type: 'success', state: false,
      //   },
      //   {
      //     value: 1, display_name: '已借出', type: 'danger', state: true,
      //   },
      //   {
      //     value: 2, display_name: '已借出', type: 'danger', state: true,
      //   },
      // ],
    };
  },
  methods: {
    getProDetail() {
      product.query(this.$route.params.id)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.detail = result.data.data;
              // this.getBookClass(result.data.data.classId);
              break;
            case 1:
              this.$message.error('加载失败');
              break;
            default:
              break;
          }
        });
    },
    // getBookClass(id) {
    //   classes.query(id)
    //     .then((result) => {
    //       switch (result.data.code) {
    //         case 0:
    //           this.$message.error('加载失败');
    //           break;
    //         case 1:
    //           this.class = result.data.data.name;
    //           break;
    //         default:
    //           break;
    //       }
    //     });
    // },
    // lend(id, infoId) {
    //   console.log(infoId);
    //   if (this.isLogin) {
    //     lend.borrow(id, infoId)
    //       .then((result) => {
    //         switch (result.data.code) {
    //           case 0:
    //             this.$message.error('借阅失败');
    //             break;
    //           case 1:
    //             this.$router.push({ name: 'library' });
    //             break;
    //           case 2:
    //             this.$message.info('你已经借过该书');
    //             break;
    //           case 3:
    //             this.$message.warning('余额不足');
    //             break;
    //           case 4:
    //             this.$message.warning('您借阅数量已上限');
    //             break;
    //           default:
    //             break;
    //         }
    //       });
    //   } else {
    //     this.$message.error('请先登陆');
    //     this.$router.push({ name: 'login' });
    //   }
    // },
  },
  created() {
    this.getProDetail();
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'uniqueId',
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
