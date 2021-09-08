<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem.vue"

import { mapGetters } from "vuex"

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  overflow: hidden;
}

.content {
  height: calc(100vh - 44px - 49px - 40px);
}
</style>
