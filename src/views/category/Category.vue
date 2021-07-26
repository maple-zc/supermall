<template>
  <div class="wrapper">
    <ul class="content">
      <li>第1行</li>
      <li>第2行</li>
      <li>第3行</li>
      <li>第4行</li>
      <li>第5行</li>
      <li>第6行</li>
      <li>第7行</li>
      <li>第8行</li>
      <li>第9行</li>
      <li>第10行</li>
      <li>第11行</li>
      <li>第12行</li>
      <li>第13行</li>
      <li>第14行</li>
      <li>第15行</li>
      <li>第16行</li>
      <li>第17行</li>
      <li>第18行</li>
      <li>第19行</li>
      <li>第20行</li>
      <li>第21行</li>
      <li>第22行</li>
      <li>第23行</li>
      <li>第24行</li>
      <li>第25行</li>
      <li>第26行</li>
      <li>第27行</li>
      <li>第28行</li>
      <li>第29行</li>
      <li>第30行</li>
      <li>第31行</li>
      <li>第32行</li>
      <li>第33行</li>
      <li>第34行</li>
      <li>第35行</li>
      <li>第36行</li>
      <li>第37行</li>
      <li>第38行</li>
      <li>第39行</li>
      <li>第40行</li>
      <li>第41行</li>
      <li>第42行</li>
      <li>第43行</li>
      <li>第44行</li>
      <li>第45行</li>
      <li>第46行</li>
      <li>第47行</li>
      <li>第48行</li>
      <li>第49行</li>
      <li>第50行</li>
      <li>第51行</li>
      <li>第52行</li>
      <li>第53行</li>
      <li>第54行</li>
      <li>第55行</li>
      <li>第56行</li>
      <li>第57行</li>
      <li>第58行</li>
      <li>第59行</li>
      <li>第60行</li>
      <li>第61行</li>
      <li>第62行</li>
      <li>第63行</li>
      <li>第64行</li>
      <li>第65行</li>
      <li>第66行</li>
      <li>第67行</li>
      <li>第68行</li>
      <li>第69行</li>
      <li>第70行</li>
      <li>第71行</li>
      <li>第72行</li>
      <li>第73行</li>
      <li>第74行</li>
      <li>第75行</li>
      <li>第76行</li>
      <li>第77行</li>
      <li>第78行</li>
      <li>第79行</li>
      <li>第80行</li>
      <li>第81行</li>
      <li>第82行</li>
      <li>第83行</li>
      <li>第84行</li>
      <li>第85行</li>
      <li>第86行</li>
      <li>第87行</li>
      <li>第88行</li>
      <li>第89行</li>
      <li>第90行</li>
      <li>第91行</li>
      <li>第92行</li>
      <li>第93行</li>
      <li>第94行</li>
      <li>第95行</li>
      <li>第96行</li>
      <li>第97行</li>
      <li>第98行</li>
      <li>第99行</li>
      <li>第100行</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3
    })
    this.scroll.on("scroll", (position) => {
      console.log(position)
    })
  },
  methods: {}
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  background-color: blanchedalmond;
  overflow: hidden;
}
</style>
