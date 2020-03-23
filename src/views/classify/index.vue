<template>
  <div id="classify">
    <header />
    <section>
      <main>
        <el-card class="box-card">
          <div slot="header">
            <span>图书分类</span>
          </div>
          <div class="classList">
            <el-tag class="tag"
              v-for="(item,key) of bookClassList"
              :key="key"
              @click="handleClass(item.pkId)">
              {{item.name}}
            </el-tag>
          </div>
        </el-card>
        <el-card class="bookCard">
          <div slot="header">
            <span>全部图书</span>
          </div>
          <div class="bookList">
            <div class="bookBox"
                v-for="(item,key) of bookList"
                :key="key"
                @click="handletoDetail(item.pkId)">
                <img :src="item.image">
                <h6>{{item.name}}</h6>
                <span>{{item.author}}</span>
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
import * as bookClass from '@/api/bookClass';
import * as bookInfo from '@/api/bookInfo';

export default {
  name: 'classify',
  data() {
    return {
      bookClassList: [],
      bookList: [],
      total: 0,
      listQuery: {
        limit: 8,
        page: 1,
        name: null,
        author: null,
        publishers: null,
        classId: null,
      },
    };
  },
  methods: {
    getClassList() {
      bookClass.queryList()
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('载入失败');
              break;
            case 1:
              this.bookClassList = result.data.data.list;
              break;
            default:
              break;
          }
        });
    },
    getBookList() {
      bookInfo.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('载入失败');
              break;
            case 1:
              this.bookList = result.data.data.list;
              this.total = result.data.data.totalCount;
              break;
            default:
              break;
          }
        });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getBookList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getBookList();
    },
    handleClass(id) {
      this.listQuery.classId = id;
      bookInfo.queryList(this.listQuery)
        .then((result) => {
          console.log(result);
          switch (result.data.code) {
            case 0:
              this.$message.warning('未查询到该类型的书籍');
              this.bookList = [];
              this.total = 0;
              break;
            case 1:
              this.bookList = result.data.data.list;
              this.total = result.data.data.totalCount;
              break;
            default:
              break;
          }
        });
    },
    handletoDetail(id) {
      this.$router.push({ name: 'bookDetail', params: { id } });
    },
  },
  created() {
    this.getClassList();
    this.getBookList();
  },
};
</script>

<style lang='scss' scoped>
#classify{
  height:100%;
  header{
    height: 15em;
    background: url('../../assets/testimonialsbg.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
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
          .tag{
            flex:0 1;
            text-align: center;
            margin-right:20px;
            margin-top:10px;
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
            width: 130px;
            margin:10px 40px;
            text-align: center;
            color:rgb(59, 89, 152);
            img{
              width: 116px;
              height:160px;
            }
            h6{
              width:116px;
              font-weight: 500;
              font-size: 16px;
              line-height: 1.4;
              margin:0;
              margin-top:10px;
            }
            span{
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #767676;
              font-size: 14px;
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
