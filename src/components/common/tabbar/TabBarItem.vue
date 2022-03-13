<template>
  <div class="tab-bar-item" @click="itemaclick">
    <!-- 用插槽来放动态内容 -->
    <slot v-if="!isActive" name="item-icon"></slot>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // this.$route 活跃路由
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemaclick() {
      // console.log(this.$route.path)
      // console.log(this.path)
      if (this.$route.path == this.path) {
        return false
      }
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* 移动端tab栏常用高度 49px */
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 21px;
  height: 24px;
  margin-top: 3px;
  /* 去掉图片底部3px */
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
