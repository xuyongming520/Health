<template>
  <div id="homepage">
    <header>
      <main>
        <h2>LIVE ORGANIC FOR LIVE</h2>
        <h1>HEALTH</h1>
      </main>
    </header>
    <section>
      <div class="news">
        <main>
          <div class="newsImg">
            <img src="@/assets/virus.jpg">
          </div>
          <div class="content">
            <h2>新型冠状病毒肺炎</h2>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新型冠状病毒肺炎
              （Corona Virus Disease 2019，COVID-19），
              简称“新冠肺炎”，世界卫生组织命名为“2019冠状病毒病” ，是指2019新型冠状病毒感染导致的肺炎。
              2019年12月以来，湖北省武汉市部分医院陆续发现了多例有华南海鲜市场暴露史
              的不明原因肺炎病例，现已证实为2019新型冠状病毒感染引起的急性呼吸道传染病。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新冠肺炎传播途径主要为直接传播、
              气溶胶传播和接触传播。直接传播是指患者喷嚏、咳嗽、说话的飞沫，呼出的气体近距离直接吸入导致的感染；
              气溶胶传播是指飞沫混合在空气中，形成气溶胶，吸入后导致感染；接触传播是指飞沫沉积在物品表面，接触污染手后，
              再接触口腔、鼻腔、眼睛等粘膜，导致感染。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;治疗方式：病患预防检测及确诊检测技术、
              超敏定量PCR试剂盒技术、抗体药物及疫苗、室内及楼宇空气杀毒技术、基于蛋白的病毒传播阻断剂、
              干细胞炎症治疗药物、流行病学研究和心理康复系统。</p>

          </div>
        </main>
      </div>
      <div class="newPro">
        <h2>新品推荐</h2>
        <p>We have the latest products, it must be exciting for you</p>
        <el-row :gutter="20" >
          <el-col :span="6" v-for="(item,key) of proList"
                :key="key">
            <div class="grid-content bg-purple">
              <div class="proImg">
                <a href="#"><img :src="`http://localhost:8080/product/images/`+item.pic"></a>
              </div>
              <p>{{item.name}}</p>
              <h6>￥{{item.price}}</h6>
            </div>
          </el-col>
        </el-row>
        <footer>
          <el-button type="success" style="margin:0 auto" @click="mall">进入商城</el-button>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import * as product from '@/api/product';

export default {
  name: 'homepage',
  data() {
    return {
      proList: [],
      listQuery: {
        limit: 4,
        page: 1,
        name: null,
        classId: null,
      },
    };
  },
  methods: {
    mall() {
      this.$router.push({ name: 'mall' });
    },
    getProList() {
      product.queryList(this.listQuery)
        .then((result) => {
          switch (result.data.code) {
            case 0:
              this.proList = result.data.data.records;
              console.log(this.proList);
              break;
            case 1:
              this.$message.error('载入失败');
              break;
            default:
              break;
          }
        });
    },
  },
  created() {
    this.getProList();
  },
};
</script>

<style lang='scss' scoped>
#homepage{
  height:100%;
  header{
    height: 41.6em;
    background: url('../../assets/banner.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
    main{
      width: $detailWidth;
      margin: 0 auto;
      height: 100%;
      display:flex;
      padding:0 20px;
      flex-direction: column;
      justify-content: center;
      h2{
        font-size: 2.3em;
        color: #fff;
        margin-bottom: 1em;
        padding: 0 0em 0.5em 0;
        margin-top:0;
        font-weight: 400;
        letter-spacing: 2px;
        border-bottom: 1px solid #01edc9;
        display: inline-block;
        width:14.5em;
      }
      h1{
        font-size: 5em;
        color: #fff;
        margin-bottom: 0.5em;
        margin-top:0;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
    }
  }
  section{
    height:100%;
    position: relative;
    .newPro{
      height: 41.6em;
      padding:50px 0 70px 0;
      margin: 0 auto;
      width: $detailWidth;
      h2{
        font-size: 30px;
        text-transform: uppercase;
        margin-bottom: 0;
        text-align: center;
        font-family: inherit;
      }
      p{
        font-size: 16px;
        color: #707070;
        margin-bottom: 0;
        text-align: center;
      }
      .el-row {
          margin-bottom: 20px;
          margin-top:50px ;
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
        display:flex;
        flex-direction: column;
        .proImg{
          background-color: white;
          width:100%;
          height: 300px;
          padding: 30px;
          img{
              width: 100%;
              height:100%;
          }
        }
        p{
          text-align: center;
          color: #707070;
          font-size: 16px;
          line-height: 1.7;
          font-weight: 400;
        }
        h6{
          color: #303030;
          line-height: 1.3;
          font-weight: 500;
          margin: 0px;
          font-size: 18px;
          text-align: center;
        }
      }
      footer{
        width:100%;
        margin: 0 auto;
        text-align: center;
      }
    }
    .news{
      padding:130px 0 70px 0;
      background-color: white;
      height: 41.6em;
      main{
        width: $detailWidth;
        margin: 0 auto;
        display: flex;
        .newsImg{
          img{
            width: 540px;
            height: 360px;
          }
        }
        .content{
          margin-left:50px
        }
      }
    }
  }
}
</style>
