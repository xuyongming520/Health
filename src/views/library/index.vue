<template>
  <div id="library">
    <header>

    </header>
    <main>
        <div v-if='!isLogin' class="tips">您还未登录，请先登陆</div>
        <el-table
          :data="borrowList"
          style="width: 100%"
          :default-sort = "{prop: 'isReturn', order: 'ascending'}"
          v-else>
          <el-table-column
            prop="pkId"
            label="编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="书名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="借阅时间"
            width="220">
          </el-table-column>
          <el-table-column
            prop="gmtReturn"
            label="到期时间"
            width="220">
          </el-table-column>
          <el-table-column
            prop="fine"
            label="罚款"
            width="110">
          </el-table-column>
          <el-table-column
            prop="isReturn"
            label="状态"
            width="110">
            <template slot-scope="scope">
              {{ isReturnState[scope.row.isReturn].display_name }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template slot-scope="scope" >
              <el-button
              size="mini"
              type="primary"
              @click="renew(scope.row.pkId)" v-if="scope.row.isReturn===0">续借</el-button>
               <el-button
              size="mini"
              type="primary"
              @click="revert(scope.row.pkId)" v-if="scope.row.isReturn!==1">归还</el-button>
            </template>
          </el-table-column>
        </el-table>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as borrow from '@/api/borrow';

export default {
  name: 'library',
  data() {
    return {
      borrowList: [],
      listQuery: {
        limit: 10,
        page: 1,
        userId: null,
      },
      isReturnState: [
        { value: 0, display_name: '在借阅' },
        { value: 1, display_name: '已归还' },
        { value: 2, display_name: '续借中' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'uniqueId',
    ]),
  },
  methods: {
    getList() {
      borrow.queryList(this.listQuery)
        .then((result) => {
          if (result.code === 0) {
            this.borrowList = [];
          } else {
            this.borrowList = result.data.data.list;
          }
        });
    },
    renew(id) {
      borrow.reLend(id)
        .then((result) => {
          switch (result.code) {
            case 0:
              this.$message.error('续借失败');
              break;
            case 1:
              this.$message.success('续借成功');
              break;
            default:
              break;
          }
        });
    },
    revert(id) {
      console.log(1);
      borrow.sendBack(id)
        .then((result) => {
          console.log(result);
          switch (result.data.code) {
            case 0:
              this.$message.error('归还失败');
              break;
            case 1:
              this.$message.success('归还成功');
              this.getList();
              break;
            default:
              break;
          }
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang='scss' scoped>
#library{
  height: 100%;
  header{
    height: 15em;
    background: url('../../assets/testimonialsbg.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
  }
  main{
    width: $detailWidth;
    margin: 0 auto;
    height: 100%;
    margin-top:20px;
    padding:20px;
    text-align: center;
    .tips{
      margin-top:100px;
      font-size: 2em;
      color:#C0C4CC
    }
  }
}
</style>
