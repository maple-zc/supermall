<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"

import { getDetail } from "network/detail"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>
</style>
