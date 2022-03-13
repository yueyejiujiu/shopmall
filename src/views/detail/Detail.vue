<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <deatil-boottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childrenComp/DetailNavBar'
import DetailSwiper from './childrenComp/DetailSwiper'
import DetailBaseInfo from './childrenComp/DetailBaseInfo'
import DetailShopInfo from './childrenComp/DetailShopInfo'
import DetailGoodsInfo from './childrenComp/DetailGoodsInfo'
import DetailParamInfo from './childrenComp/DetailParamInfo'
import DetailCommentInfo from './childrenComp/DetailCommentInfo'
import DeatilBoottomBar from './childrenComp/DeatilBoottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'

import { debounce } from 'common/utils'
import Toast from 'components/common/toast/Toast'
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecomment
} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themTypYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      message: '',
      show: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DeatilBoottomBar,
    BackTop,
    Toast
  },
  created() {
    // 保存id
    this.iid = this.$route.params.id
    // 根据id请求数据
    getDetail(this.iid).then(res => {
      const data = res.data.result
      this.topImages = data.itemInfo.topImages
      // 创建商品信息的对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 保存商品的详情图片等数据
      this.detailInfo = data.detailInfo

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 获取推荐数据
    getRecomment().then(res => {
      // console.log(res.data)
      this.recommends = res.data.data.list
    })
    // 防抖操作
    this.getThemeTopY = debounce(() => {
      this.themTypYs = []
      this.themTypYs.push(0)
      this.themTypYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themTypYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themTypYs.push(this.$refs.recommend.$el.offsetTop - 44)
      // console.log(this.themTypYs)
    })
  },
  mounted() {
    // 监听详情图片是否加载完毕
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      refresh()
      this.getThemeTopY()
    }
    this.$bus.$on('detailImageLoad', this.itemImgListener)
  },
  destroyed() {
    this.$bus.$off('detailImageLoad', this.itemImgListener)
  },
  methods: {
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themTypYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themTypYs.length
      //[0, 5475, 6278, 6494] 判断在二者之间
      for (let i = 0; i < this.themTypYs.length; i++) {
        if (
          (this.currentIndex !== i &&
            i < length - 1 &&
            positionY >= this.themTypYs[i] &&
            positionY < this.themTypYs[i + 1]) ||
          (i === length - 1 && positionY >= this.themTypYs[i])
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000 ? true : false
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 添加进购物车
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      this.$store.dispatch('addCart', product).then(res => {
        // 显示添加购物车成功
        // console.log(res)
        this.show = true
        this.message = res
        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: #ffffff;
  z-index: 1111;
}
.content {
  height: calc(100% - 44px - 55px);
}
</style>
