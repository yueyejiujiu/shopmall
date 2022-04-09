<template>
  <div id="GoodList">
    <goods-list-item :key="index" v-for="(item,index) in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodListItem'
export default {
  name: 'GoodList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
#GoodList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* padding: 2px; */
}
</style>
