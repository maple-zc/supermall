<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item, index) in slideCount" :key="index" class="indi-item" :class="{active: index==currentIndex - 1}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      // 定时器延时
      type: Number,
      default: 3000
    },
    animDuration: {
      // 过渡时间设置
      type: Number,
      default: 300
    },
    moveRatio: {
      // 划过屏幕一定比例，自动滑到下一页
      type: Number,
      default: 0.25
    },
    showIndicator: {
      // 是否显示指示器(下面的小点)
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0, // 图片个数
      totalWidth: 0, // swiper的宽度，即可见宽度
      swiperStyle: {}, // swiper的样式
      currentIndex: 1, // 当前的index
      scrolling: false // 是否正在滚动
    }
  },
  mounted() {
    setTimeout(() => {
      // 操作DOM，在前后添加Slide
      this.handleDom()
      // 开启定时器
      this.startTimer()
    }, 100)
  },
  methods: {
    // 设置定时器
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer() {
      window.clearInterval(this.playTimer)
    },

    // 滚动到正确的位置
    scrollContent(currentPosition) {
      this.scrolling = true // 将图片置为滚动状态

      // 增加平滑的过渡效果
      this.swiperStyle.transition = "transform " + this.animDuration + "ms"
      this.setTransform(currentPosition)

      this.checkPosition()

      this.scrolling = false
    },
    // 校验正确的位置
    checkPosition() {
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms"
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }

        this.$emit("transitionEnd", this.currentIndex - 1)
      }, this.animDuration)
    },
    // 设置滚动的位置
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
    },
    // 操作DOM，在DOM前后添加Slide
    // 目的：为了让图片平滑的从最后一张到第一张，或者从第一张到最后一张
    handleDom() {
      let swiperEl = document.querySelector(".swiper")
      let slidesEls = swiperEl.getElementsByClassName("slide")

      this.slideCount = slidesEls.length

      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
      }

      // 让swiper显示第一张图
      this.setTransform(-this.totalWidth)
    },

    // 拖动事件的处理
    touchStart(e) {
      if (this.scrolling) return

      this.stopTimer()

      this.startX = e.touches[0].pageX
    },
    touchMove(e) {
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      let currentPosition = -this.currentIndex * this.totalWidth
      let moveDistance = this.distance + currentPosition

      this.setTransform(moveDistance)
    },
    touchEnd(e) {
      let currentMove = Math.abs(this.distance)

      if (this.distance == 0) {
        return
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex++
      }

      this.scrollContent(-this.currentIndex * this.totalWidth)

      this.startTimer()
    },

    previous() {
      this.changeItem(-1)
    },
    next() {
      this.changeItem(1)
    },
    changeItem(num) {
      this.stopTimer()

      this.currentIndex += num
      this.scrollContent(-this.currentIndex * this.totalWidth)

      this.startTimer()
    }
  }
}
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
