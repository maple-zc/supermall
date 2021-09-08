<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content" ref="scroll">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-control :titles="['综合', '新品  ', '销量']" :currentIndex="tabIndex" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showCategoryDetail"></goods-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"

import TabMenu from "./childComps/TabMenu.vue"
import TabContentCategory from "./childComps/TabContentCategory.vue"

import Scroll from "components/common/scroll/Scroll"

import { itemListenerMixin } from "common/mixin"

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category"

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1,
      currentType: "pop",
      tabIndex: 0,
      saveY: 0
    }
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ]
    }
  },
  created() {
    // 1.请求分类数据
    this._getCategory()
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  },
  deactivated() {
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list

        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          }
        }

        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then((res) => {
        console.log(res)
        this.categoryData[index].subcategories = res.data
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail("pop")
        this._getCategoryDetail("sell")
        this._getCategoryDetail("new")
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallKey
      const miniWallKey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求，传入muniWallKey和type
      getCategoryDetail(miniWallKey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
      })
    },
    selectItem(index) {
      this._getSubcategories(index)
    },
    tabClick(index) {
      this.tabIndex = index
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "sell"
          break
        case 2:
          this.currentType = "new"
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
.category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  display: flex;
}

.tab-content {
  height: 100%;
  flex: 1;
  overflow: hidden;
}
</style>
