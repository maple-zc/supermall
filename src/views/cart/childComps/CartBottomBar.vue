<template>
  <div class="bottom-menu">
    <check-button class="select-all" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue"
import { mapGetters } from "vuex"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)
        .toFixed(2)
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked
      }).length
    },
    isSelectAll() {
      if (this.cartLength === 0) return false
      return !this.cartList.find((item) => item.checked === false)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false))
      } else {
        this.cartList.forEach((item) => (item.checked = true))
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 40px;
  background-color: #eee;
  font-size: 14px;
  color: #888;
  padding-left: 10px;
  display: flex;
  align-items: center;
}

.select-all {
  margin-right: 5px;
}

.total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
  flex: 1;
}

.buy-product {
  background-color: orangered;
  width: 100px;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>
