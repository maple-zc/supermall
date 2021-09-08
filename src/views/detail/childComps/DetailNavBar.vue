<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" v-for="(item, index) in titles" :key="index" :class="{active: currentIndex === index}" @click="titleClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  props: {
    currentIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      // currentIndex: 0
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.$emit('titleClick', index)
    }
  }
}
</script>

<style scoped>
.back {
  margin-top: 5px;
}

.title {
  margin: 0 20px;
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 13px;
}

.active {
  color: var(--color-high-text);
}
</style>
