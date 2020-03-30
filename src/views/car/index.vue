<template>
  <div class="shoppingCar">
    <header>
      <h3>购物车</h3>
    </header>
    <main>
      <el-table
        ref="multipleTable"
        :data="tableData"
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
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="商品介绍"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="单价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="数量"
          width="150">
          <el-input-number v-model="num" @change="handleChange" :min="1" size="mini">
          </el-input-number>
        </el-table-column>
        <el-table-column
          prop="address"
          label="金额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="80">
          <span @click="handleUpdate(scope.row.id)">删除</span>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <div class="count">合计：</div>
      <el-button type="success" style="width:100px;height:50px">结算</el-button>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'car',
  data() {
    return {
      num: 1,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange(value) {
      console.log(value);
    },
  },
  created() {
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
