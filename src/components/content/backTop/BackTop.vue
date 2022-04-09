<template>
  <div id="BackTop">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
#BackTop {
  position: fixed;
  right: 10px;
  bottom: 60px;
  img {
    width: 43px;
    height: 43px;
  }
}
</style>
