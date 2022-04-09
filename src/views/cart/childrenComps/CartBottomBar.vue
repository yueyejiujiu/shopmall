<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :isChecked="isSelectAll"
        class="check-button"
        @click.native="checkedClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        '￥' +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !this.$store.state.cartList.filter(item => !item.checked).length
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkedClick() {
      // 全部选中
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        // 部分或全部不选中
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        })
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #fbfbfb;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 70px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 20px;
  margin: 5px;
}
.totalPrice {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  color: #ffffff;
  text-align: center;
  background-color: #d43729;
}
</style>
