<template>
  <div id="LeftNav">
    <ul>
      <li
        @click="leftClick(item.maitKey, index)"
        :class="{ click: index === currentIndex }"
        v-for="(item, index) in goodsDate"
        :key="item.maitKey"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  props: {
    goodsDate: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    leftClick(maitKey, index) {
      this.currentIndex = index
      // console.log(maitKey)
      this.$emit('sendMainKey', maitKey)
    }
  }
}
</script>

<style scoped>
#LeftNav {
  background-color: rgba(241, 171, 208, 0.5);
}
li {
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-sizing: border-box;
}
.click {
  background-color: #ffffff;
  color: var(--color-high-text);
  font-weight: 700;
  border-left: 5px solid var(--color-tint);
}
</style>
