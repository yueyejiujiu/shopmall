<template>
  <div class="account">
    <div>
      <span class="num">0.00</span>
      <span>元</span>
      <p>我的余额</p>
    </div>
    <div>
      <span class="num">0</span>
      <span>个</span>
      <p>我的优惠</p>
    </div>
    <div>
      <span class="num">0</span>
      <span>分</span>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style scoped>
.account {
  display: flex;
  background-color: #ffffff;
  margin-bottom: 30px;
}
.account > div {
  flex: 1;
  text-align: center;
  padding: 20px;
}
.account > div:nth-child(2) {
  border-right: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
}
.num {
  color: #dd6d22;
  font-weight: 700;
  font-size: 20px;
}
</style>
