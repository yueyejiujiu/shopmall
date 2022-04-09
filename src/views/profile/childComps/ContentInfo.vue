<template>
  <div>
    <div
      class="content"
      :class="item.icon"
      v-for="(item, index) in contenInfo"
      :key="index"
    >
      <span>{{ item.info }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    contenInfo: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  padding-left: 15px;
  font-size: 16px;
  background-color: #ffffff;
  height: 30px;
  line-height: 30px;
  /* border-bottom: 1px solid #cccccc; */
  margin-bottom: 4px;
}
.content:last-child {
  border: none;
  margin: 0;
}
.content span {
  margin-left: 5px;
}
</style>
