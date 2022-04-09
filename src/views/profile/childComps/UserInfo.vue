<template>
  <div class="avatar-box">
    <span class="avatar el-icon-user-solid"></span>
    <span class="info">
      <p>登录/注册</p>
      <p class="el-icon-mobile-phone">暂无绑定手机</p>
    </span>
    <span class="el-icon-arrow-right right"></span>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style scoped>
.avatar-box {
  height: 60px;
  background-color: var(--color-tint);
  display: flex;
  align-items: center;
}
.avatar {
  display: inline-block;
  background-color: #e9e6e6;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  margin: 0 20px;
  font-size: 30px;
}
.info {
  display: inline-block;
  color: #ffffff;
}
.info p:nth-child(2) {
  font-size: 12px;
}
.right {
  display: inline-block;
  width: 20px;
  position: relative;
  left: 110px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}
</style>
