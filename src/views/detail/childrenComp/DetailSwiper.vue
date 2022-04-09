<template>
  <swiper>
    <swiper-item :key="item" class="swiper-item" v-for="item in topImages">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'
export default {
  name: 'detailswiper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>
