<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div>----</div>
    <div class="desc">{{detailInfo.desc}}</div>
    <div>----</div>
    <div class="key">{{detailInfo.detailImage[0].key}}</div>
    <div>
      <img
        :key="index"
        v-for="(item,index) in detailInfo.detailImage[0].list"
        :src="item"
        class="detailImage"
        @load="imgLoad"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('detailImageLoad')
    }
  }
}
</script>

<style scoped>
.desc {
  font-size: 14px;
}
.key {
  font-size: 14px;
  color: #f1eded;
  text-align: center;
  background-color: rgb(235, 139, 171);
}
.detailImage {
  width: 100%;
}
</style>
