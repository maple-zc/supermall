<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" :currentIndex="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"

import { itemListenerMixin, backTopMixin } from "common/mixin"
import { debounce } from "common/utils"
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail"
import { mapActions } from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    this.iid = this.$route.params.iid

    this._getDetail(this.iid)

    getRecommend().then((res) => {
      this.goodsList = res.data.list
    })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    })
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  },
  methods: {
    ...mapActions(["addToCart"]),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.currentIndex = index
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0)
    },
    _getDetail(iid) {
      getDetail(this.iid).then((res) => {
        const data = res.result
        console.log(data)
        // 获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品的详情数据
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )

        // 获取评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length

      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i
        }
      }

      this.isShowBackTop = -position.y > 1000
    },
    addCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.dispatch("addToCart", product).then((res) => {
      //   console.log(res)
      // })
      this.addToCart(product).then((res) => {
        console.log(this.$toast)
        console.log(res)
        this.$toast.show(res, 2000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
