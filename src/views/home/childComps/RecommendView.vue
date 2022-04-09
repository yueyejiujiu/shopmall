<template>
  <div id="RecommendView">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      defaule() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
#RecommendView {
  display: flex;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 20px;
  border-bottom: 8px solid #eeeeee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 65;
  height: 65px;
  margin-bottom: 10px;
}
</style>
