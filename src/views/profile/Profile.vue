<template>
  <div id="Prifile">
    <nav-bar class="prifile-nav">
      <div slot="center" class="title">我的档案</div>
    </nav-bar>
    <user-info></user-info>
    <account></account>
    <content-info :conten-info="contentData"></content-info>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './childComps/UserInfo'
import Account from './childComps/Account'
import ContentInfo from './childComps/ContentInfo'
export default {
  name: 'Prifile',
  components: {
    NavBar,
    UserInfo,
    Account,
    ContentInfo
  },
  data() {
    return {
      contentData: [
        {
          icon: 'el-icon-star-on',
          info: '我的收藏'
        },
        {
          icon: 'el-icon-message-solid',
          info: '我的消息'
        },
        {
          icon: 'el-icon-s-goods',
          info: '积分商城'
        },
        {
          icon: 'el-icon-s-finance',
          info: '会员卡'
        },
        {
          icon: 'el-icon-platform-eleme',
          info: '花呗'
        },
        {
          icon: 'el-icon-s-tools',
          info: '系统设置'
        }
      ]
    }
  }
}
</script>

<style scoped>
#Prifile {
  background-color: #fbf7fb;
}
.prifile-nav {
  background-color: var(--color-tint);
}
.title {
  color: #ffffff;
  font-weight: 700;
}
</style>
