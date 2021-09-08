<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      {{message}}
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ""
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: true
  //   }
  // }
  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 5px;
  z-index: 99;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
