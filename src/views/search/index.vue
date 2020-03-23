<template>
  <div id="search">
    <header>
      <main>
        <div class="search">
          <el-input placeholder="关键字搜索"
            v-model="input"
            style="width:450px;">
            <el-select slot="prepend" placeholder="请选择" v-model="select" style="width:100px;">
              <el-option label="书名" value="1"></el-option>
              <el-option label="作者" value="2"></el-option>
              <el-option label="出版社" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handletoSearch"></el-button>
          </el-input>
        </div>
      </main>
    </header>
    <section>
      <main>
        <div class="bookList">
          <div class="bookBox"
              v-for="(item,key) of bookList"
              :key="key"
              @click="handletoDetail(item.pkId)">
            <div class="boxLeft">
              <img :src="item.image">
            </div>
            <div class="boxRight">
              <h4>{{item.name}}</h4>
              <p>{{item.introduce}}</p>
              <span>{{item.author}}</span>
              <br>
              <span>{{item.publishers}}</span>
            </div>
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
      </main>
    </section>
  </div>
</template>

<script>
import * as book from '@/api/bookInfo';

export default {
  name: 'search',
  data() {
    return {
      listQuery: {
        limit: 8,
        page: 1,
        name: null,
        author: null,
        publishers: null,
      },
      select: null,
      input: null,
      bookList: [],
      total: 0,
    };
  },
  methods: {
    getBookList() {
      book.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.bookList = [];
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
    handletoSearch() {
      this.listQuery.page = 1;
      switch (this.select) {
        case null:
          this.listQuery.name = this.input;
          this.input = null;
          break;
        case '1':
          this.listQuery.name = this.input;
          this.input = null;
          break;
        case '2':
          this.listQuery.author = this.input;
          this.input = null;
          break;
        case '3':
          this.listQuery.publishers = this.input;
          this.input = null;
          break;
        default:
          this.listQuery.name = this.input;
          this.input = null;
          break;
      }
      this.getBookList();
    },
    handletoDetail(id) {
      this.$router.push({ name: 'bookDetail', params: { id } });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getBookList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getBookList();
    },
  },
  created() {
    this.getBookList();
  },
};
</script>

<style lang='scss' scoped>
#search{
  height:100%;
  header{
    height: 15em;
    background: url('../../assets/testimonialsbg.jpg') no-repeat center center;
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
    main{
      width: $detailWidth;
      margin: 0 auto;
      height: 100%;
      .bookList{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap:wrap;
        margin:0 0 40px 0;
        .bookBox{
        margin-top:40px;
        width: 600px;
        box-shadow: 1px 2px 6px 0px #ccc;
        background: #fff;
          .boxLeft{
            float: left;
            width: 39%;
            padding:1em 1em;
            img{
              width:200px;
              height:200px;
            }
          }
          .boxRight{
            float: right;
            width: 60%;
            height:244px;
            padding: 2.6em 2em;
            h4{
              font-size: 1.5em;
              color:#333;
              margin: 0;
              font-family: 'Raleway', sans-serif;
            }
            p{
              white-space: nowrap;
              overflow: hidden;
              text-overflow:ellipsis;
              font-size: 1em;
              color: #999;
              line-height: 1.8em;
            }
          }
        }
      }
      .page{
        text-align:center;
        margin-bottom:20px;
      }
    }
  }
}
</style>
