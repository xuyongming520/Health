<template>
  <div id="classify">
    <header>
      <main>
        <div class="asearch">
          <el-input placeholder="关键字搜索"
            v-model="input"
            style="width:450px;">
            <el-button slot="append" icon="el-icon-search" @click="handletoSearch"></el-button>
          </el-input>
        </div>
      </main>
    </header>
    <section>
      <main>
        <el-card class="box-card">
          <div slot="header">
            <span>商品类别</span>
          </div>
          <div class="classList">
            <el-tag class="tag"
              v-for="(item,key) of proClassList"
              :key="key"
              @click="handleClass(item.id)">
              {{item.name}}
            </el-tag>
          </div>
        </el-card>
        <el-card class="bookCard">
          <div slot="header">
            <span>健康商城</span>
          </div>
          <div class="bookList">
            <div class="bookBox"
                v-for="(item,key) of proList"
                :key="key"
                @click="handletoDetail(item.id)">
                <img :src="`http://localhost:8080/product/images/`+item.pic">
                <span>￥{{item.price}}</span>
                <h6>{{item.name}}</h6>

            </div>
          </div>
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
        </el-card>
      </main>
    </section>
  </div>
</template>

<script>
import * as proClass from '@/api/proClass';
import * as product from '@/api/product';

export default {
  name: 'mall',
  data() {
    return {
      proClassList: [],
      proList: [],
      total: 0,
      listQuery: {
        limit: 9,
        page: 1,
        name: null,
        classId: null,
      },
      input: null,
    };
  },
  methods: {
    handletoSearch() {
      this.listQuery.name = this.input;
      this.getProList();
    },
    getClassList() {
      proClass.queryList()
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.proClassList = result.data.data;
              break;
            case 1:
              this.$message.error('载入失败');
              break;
            default:
              break;
          }
        });
    },
    getProList() {
      product.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.proList = result.data.data.records;
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
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getProList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getProList();
    },
    handleClass(id) {
      this.listQuery.classId = id;
      product.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.proList = result.data.data.records;
              this.total = result.data.data.total;
              break;
            case 1:
              this.$message.warning('未查询到该类型的书籍');
              this.proList = [];
              this.total = 0;
              break;
            default:
              break;
          }
        });
    },
    handletoDetail(id) {
      this.$router.push({ name: 'proDetail', params: { id } });
    },
  },
  created() {
    this.getClassList();
    this.getProList();
  },
};
</script>

<style lang='scss' scoped>
#classify{
  height:100%;
  header{
    height: 10em;
    background: url('../../assets/leigh-cooper-YGETh6y8MDI-unsplash.jpg') no-repeat center left;
    background-size: cover;
    position: relative;
    main{
      width: $detailWidth;
      margin: 0 auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  section{
    margin-top:40px;
    margin-bottom:40px;
    main{
      width: $detailWidth;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items:flex-start;
      .box-card{
        width:30%;
        .classList{
          display: flex;
          justify-content: flex-start;
          align-items:flex-start;
          flex-wrap: wrap;
          .tag:nth-child(odd)
          {
            flex:0 1;
            text-align: center;
            margin-right:20px;
            margin-top:10px;
            min-width: 150px;
          }
          .tag:nth-child(even){
            flex:0 1;
            text-align: center;
            margin-top:10px;
            min-width: 150px;
          }
        }
      }
      .bookCard{
        width:68%;
        height:100%;
        .bookList{
          display: flex;
          justify-content: flex-start;
          align-items:flex-start;
          flex-wrap: wrap;
          .bookBox{
            width: 200px;
            height: 270px;
            margin:10px 30px;
            color:rgb(59, 89, 152);
            img{
              width: 180px;
              height:180px;
            }
            h6{

              font-weight: 500;
              font-size: 16px;
              line-height: 1.4;
              margin:0 auto;
              margin-top:10px;
            }
            span{
              display: block;
              color: red;
              font-size: 18px;
            }
          }
        }
        .page{
          text-align:center;
          margin-top:20px;
        }
      }
    }
  }
}
</style>
