<template>
  <div id="bookDetail">
    <main>
      <el-card class="cardBox">
        <div class="boxLeft">
          <img :src="detail.image">
        </div>
        <div class="boxRight">
          <p>{{detail.publishers}}</p>
          <h1>{{detail.name}}</h1>
          <p>{{detail.author}}</p>
          <el-tag type="success" class="tag" size="medium">{{this.class}}</el-tag>
          <p class="introduce">{{detail.introduce}}</p>
          <div class="store">
            {{detail.count}}/{{detail.num}}
          </div>
        </div>
      </el-card>
      <el-card class="bookList">
        <div slot="header">
          图书列表
        </div>
        <template>
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
        </template>
      </el-card>
    </main>
  </div>
</template>

<script>
import * as book from '@/api/bookInfo';
import * as classes from '@/api/bookClass';
import * as lend from '@/api/borrow';
import * as books from '@/api/books';
import { mapGetters } from 'vuex';

export default {
  name: 'bookDetail',
  data() {
    return {
      detail: [],
      class: '',
      bookList: [],
      listQuery: {
        limit: 10,
        page: 1,
        status: null,
        infoId: this.$route.params.id,
      },
      stateClasses: [
        {
          value: 0, display_name: '可借阅', type: 'success', state: false,
        },
        {
          value: 1, display_name: '已借出', type: 'danger', state: true,
        },
        {
          value: 2, display_name: '已借出', type: 'danger', state: true,
        },
      ],
    };
  },
  methods: {
    getBookList() {
      books.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              break;
            case 1:
              this.bookList = result.data.data.list;
              break;
            default:
              break;
          }
        });
    },
    getBookDetail() {
      book.query(this.$route.params.id)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('加载失败');
              break;
            case 1:
              this.detail = result.data.data;
              this.getBookClass(result.data.data.classId);
              break;
            default:
              break;
          }
        });
    },
    getBookClass(id) {
      classes.query(id)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.$message.error('加载失败');
              break;
            case 1:
              this.class = result.data.data.name;
              break;
            default:
              break;
          }
        });
    },
    lend(id, infoId) {
      console.log(infoId);
      if (this.isLogin) {
        lend.borrow(id, infoId)
          .then((result) => {
            switch (result.data.code) {
              case 0:
                this.$message.error('借阅失败');
                break;
              case 1:
                this.$router.push({ name: 'library' });
                break;
              case 2:
                this.$message.info('你已经借过该书');
                break;
              case 3:
                this.$message.warning('余额不足');
                break;
              case 4:
                this.$message.warning('您借阅数量已上限');
                break;
              default:
                break;
            }
          });
      } else {
        this.$message.error('请先登陆');
        this.$router.push({ name: 'login' });
      }
    },
  },
  created() {
    this.getBookDetail();
    this.getBookList();
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
        p:nth-of-type(2){
          color: #9c9c9c;
        }
        .tag{
          font-size: 14px;
        }
        .introduce{
          margin-top:10px;
          height:60px;
        }
        .store{
          width: 100%;
          height:50px;
          font-size:24px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
