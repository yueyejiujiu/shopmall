<template>
  <div id="Rightnav">
    <!-- 分类商品 -->
    <ul class="content">
      <li :key="index" v-for="(item, index) in rightData">
        <img :src="item.image" alt="" @load="imgLoad" />
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RightNav',
  props: {
    rightData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('imgLoad')
    }
  }
}
</script>

<style scoped>
#Rightnav {
  padding: 5px 5px;
  background-color: #ffffff;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
.content li {
  width: 33.333%;
}
.content li img {
  width: 100%;
}
.content li p {
  font-size: 14px;
  text-align: center;
}
</style>
