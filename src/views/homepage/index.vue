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
            <img src="@/assets/banner.jpg">
          </div>
          <div class="content">
            <h2>121211</h2>
            <p>1212</p>
            <p>1222222222222222</p>
          </div>
        </main>
      </div>
      <div class="newPro">
        <h2>新品推荐</h2>
        <p>We have the latest products, it must be exciting for you</p>
        <el-row :gutter="20" >
          <el-col :span="6">
            <div class="grid-content bg-purple">
            <div class="proImg">
              <a href="#"><img src="@/assets/user.png"></a>
            </div>
            <p>12</p>
            <h6>12</h6>
          </div></el-col>
        </el-row>
        <footer>
          <el-button type="success" style="margin:0 auto">进入商城</el-button>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data() {
    return {
      key: 4,
    };
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
          padding: 20px;
          img{

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
