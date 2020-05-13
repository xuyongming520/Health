<template>
  <div class="mine">
    <header>
      <div class="head">
        <img src="@/assets/user.png">
      </div>
      <div class="content">
        <h3 style="font-size:24px">{{userInfo.name}}
          <span class="font" style="margin-left:20px">
            年龄：{{userInfo.age}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            性别：{{sexStatus[userInfo.sex].sex_name}}</span>
        </h3>
        <span class="font">手机号码：{{userInfo.phone}}</span>
        <span class="font">邮箱：{{userInfo.email}}</span>
        <span class="font">地址：{{userInfo.address}}</span>
        <span class="font">余额：{{userInfo.balance}}</span>
      </div>
    </header>
    <main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="我的订单" name="first">
          <el-collapse accordion>
            <el-collapse-item
              v-for ="(item,key) of orderList"
              :key="key">
              <template slot="title" >
                <div  @click="getOrderDetail(item.orderId)" style="width:100%">
                  订单号：{{item.orderId}}
                  <span style="margin-left:50px">金额：￥{{item.total}}</span>
                  <span style="margin-left:50px">下单时间：{{item.createTime}}</span>
                  <span style="margin-left:50px">
                    订单状态：{{orderStatus[item.status].display_name}}
                  </span>
                </div>
              </template>
              <div
              v-for ="(itemDetail,key) of orderDetailList"
              :key="key">
                <template>
                  <img :src="`http://localhost:8080/product/images/`+itemDetail.proPic" style="width:180px;height:180px">
                  <span style="margin-left:50px;top:0px">商品名：{{itemDetail.proName}}</span>
                  <span style="margin-left:50px">商品单价：￥{{itemDetail.proPrice}}</span>
                  <span style="margin-left:50px">评价内容：{{itemDetail.evaluate}}</span>
                  <el-button type="danger"
                    style="float:right;height:30px;padding:0px 20px;margin:10px 10px"
                    plain v-show="item.status === 1 "
                    @click="returnOrder(item.orderId)">
                    退货
                  </el-button>
                  <el-button type="info"
                    style="float:right;height:30px;padding:0px 20px;margin:10px 10px"
                    plain v-show="item.status === 1 || item.status === 3"
                    @click="dialogVisible = true">
                    评价
                  </el-button>
                  <el-dialog
                    title="评价"
                    :visible.sync="dialogVisible"
                    width="30%"
                    append-to-body>
                    <el-form :model="form">
                        <el-form-item label="商品评价" label-width="120px">
                          <el-input v-model="form.content" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false;evaluate(form.content,item.orderId,item.proId)">确 定</el-button>
                      </div>
                  </el-dialog>
                </template>
              </div>
              <div style="width:100%">
              <el-button type="success"
                  style="float:right;height:30px;padding:0px 20px;margin:10px 10px"
                  plain v-show="item.status === 2 "
                  @click="updateStatus(item.orderId)">
                  收货
              </el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="page">
            <el-pagination
              layout="prev, pager, next"
              :current-page="listQuery.page"
              :page-size="listQuery.limit"
              v-show="total>0"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background>
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="余额充值" name="third" style="margin-top:50px">
          <el-form :model="rechargeForm"
            ref="rechargeForm"
            label-width="100px">
            <el-form-item label="充值金额" prop="balance">
              <el-input type="balance"
                v-model.number="rechargeForm.balance"
                placeholder="请输入充值金额"
                style="width:200px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(balance)">支付</el-button>
              <el-button @click="resetForm('rechargeForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import * as user from '@/api/users';
import * as order from '@/api/order';
import { mapGetters } from 'vuex';

export default {
  name: 'car',
  data() {
    return {
      activeName: 'first',
      dialogVisible: false,
      userInfo: [],
      listQuery: {
        limit: 10,
        page: 1,
        userId: null,
      },
      orderStatus: [
        { key: 0, display_name: '未发货' },
        { key: 1, display_name: '已完成' },
        { key: 2, display_name: '发货中' },
        { key: 3, display_name: '已退货' },
      ],
      sexStatus:[
        { key: 0, sex_name: '女生' },
        { key: 1, sex_name: '男生' },
      ],
      total: 0,
      orderList: [],
      orderDetailList: [],
      rechargeForm: {
        balance: '',
      },
      form:{
        content:''
      }
    };
  },
  methods: {
    getUserInfo() {
      user.userInfo(this.phone)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.userInfo = result.data.data;
              break;
            case 1:
              this.$message.error('未查到该用户');
              break;
            default:
              break;
          }
        });
    },
    getOrderList() {
      order.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.orderList = result.data.data.records;
              this.total = result.data.data.total;
              break;
            case 1:
              this.$message.error('载入失败');
              break;
            default:
              break;
          }
        });
    },
    getOrderDetail(orderId) {
      order.orderDetailList(orderId)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.orderDetailList = result.data.data;
              break;
            case 1:
              this.$message.error('载入失败');
              break;
            default:
              break;
          }
        });
    },
    updateStatus(orderId) {
      order.updateStatus(orderId)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.getOrderList();
              break;
            case 1:
              this.$message.error('收货失败');
              break;
            default:
              break;
          }
        });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getOrderList();
    },
    submitForm() {
      user.recharge(this.rechargeForm.balance, this.userId)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.success('充值成功');
              this.getUserInfo();
              this.$router.push({ name: 'mine' });
              break;
            default:
              this.$message.error('充值失败');
              break;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    returnOrder(orderId){
      order.returnGoods(orderId)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.getOrderList();
              break;
            case 1:
              this.$message.error('评价失败');
              break;
            default:
              break;
          }
        });
    },
    evaluate(content,orderId,proId){
      order.evaluateGoods(orderId,proId,this.userId,content)
        .then((result)=>{
          switch (result.data.code) {
            case 0:
              this.getOrderList();
              break;
            case 1:
              this.$message.error('评价失败');
              break;
            default:
              break;
          }
        })
    }
  },
  created() {
    this.listQuery.userId = this.userId;
    this.getUserInfo();
    this.getOrderList();
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
.mine{
  height: 100%;
  padding-top:20px;
  header{
    height: 12.5em;
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    display: flex;
    justify-content: row;
    margin-bottom:20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .head{
      height: 100%;
      padding:32px ;
      img{
        height: 144px;
        width: 144px;
      }
    }
    .content{
      display: flex;
      flex-direction:column;
      .font{
        font-size:14px;
        margin-bottom: 12px;
      }
    }
  }
  main{
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    padding:20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .page{
          text-align:center;
          margin-top:20px;
        }
  }
}
</style>
