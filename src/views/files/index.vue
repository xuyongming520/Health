<template>
  <div class="mine">
    <main>
          <el-calendar>
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
              </p>
            </template>
          </el-calendar>
    </main>
    <footer>
      <header>
        今日推荐
      </header>
      <div class="proList">
            <div class="proBox"
                v-for="(item,key) of proList"
                :key="key"
                @click="handletoDetail(item.id)">
                <img :src="`http://localhost:8080/product/images/`+item.pic">
                <h6>{{item.name}}</h6>
            </div>
          </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'files',
  data() {
    return {
      activeName: 'first',
      numberValidateForm: {
        age: '',
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message.warring('submit');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
  },
};
</script>

<style lang='scss' scoped>
.mine{
  height: 100%;
  padding-top:20px;
  main{
    width: $detailWidth;
    background-color: white;
    margin: 0 auto;
    padding:20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  footer{
    height: 15em;
    width: $detailWidth;
    background-color: white;
    margin: 20px auto;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    header{
      padding:18px 20px;
      border-bottom: 1px solid #ebeef5;
    }
    .proList{
      display: flex;
      justify-content: flex-start;
      .proBox{
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
      }
    }
  }
}
</style>
