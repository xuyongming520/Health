<template>
  <div id="homepage">
    <header>
      <main>
        <h6>WELCOME TO</h6>
        <h1>OUR LIBRARY</h1>
      </main>
    </header>
  </div>
</template>

<script>
export default {
  name: 'homepage',
};
</script>

<style lang='scss' scoped>
#homepage{
  height:667px;
  header{
    height: 100%;
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
      h6{
        font-size: 2.3em;
        color: #fff;
        margin-bottom: 1em;
        padding: 0 0em 0.5em 0;
        margin-top:0;
        font-weight: 600;
        letter-spacing: 2px;
        border-bottom: 1px solid #01edc9;
        display: inline-block;
        width:7.5em;
      }
      h1{
        font-size: 5em;
        color: #fff;
        margin-bottom: 0.5em;
        margin-top:0;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
