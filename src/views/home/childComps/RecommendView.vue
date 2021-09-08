<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imageLoad() {
      this.$emit('imageLoad')
    }
  }
}
</script>

<style scoped>
.recommend {
  width: 100%;
  max-width: 100%;
  display: flex;
  border-bottom: 10px solid #eee;
}

.recommend-item {
  flex: 0 0 25%;
  padding: 10px 5px 20px;
  text-align: center;
  font-size: 14px;
}

.recommend-item img {
  margin-bottom: 10px;
  width: 80%;
}
</style>
