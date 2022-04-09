export default {
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      // 查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })

      // 添加count属性
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        reslove('当前的商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        reslove('添加了新的商品')
      }
    })
  }
}
