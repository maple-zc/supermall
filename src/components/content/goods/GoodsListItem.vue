<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      )
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad")
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  flex-basis: 50%;
  position: relative;
  padding: 0px 5px 40px 5px;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
}

.goods-info {
  position: absolute;
  font-size: 12px;
  padding: 0px 5px;
  right: 0;
  left: 0;
  bottom: 10px;
  text-align: center;
}

.goods-info p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
