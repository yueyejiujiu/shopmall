<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      v-show="isShow"
      class="tab-control"
      ref="tabControl1"
      @tabClick="tabclick"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swipperImageLoad="swipperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        @tabClick="tabclick"
        :titles="['流行', '新款', '精选']"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公用组件
import NavBar from '../../components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

// api
import { getHomeMultidate, getHomeGoods } from 'network/home'
import { debounce } from '../../common/utils'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      taboffsetTop: 0,
      isShow: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局事件的监听
    this.$bus.$off('')
  },
  created() {
    this.getHomeMultidate()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // 监听事件总线 $on
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*
      事件监听相关方法
    */
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
        default:
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 监听首页滚动
    contentScroll(position) {
      // 判断BackTop显示
      this.isShowBackTop = -position.y > 1000 ? true : false
      // 决定tabControl 是否吸顶 (position:fixed)
      this.isShow = -position.y > this.taboffsetTop ? true : false
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    loadMore() {
      // 加载更多
      this.getHomeGoods(this.currentType)
    },
    // 轮播图加载完毕
    swipperImageLoad() {
      // 获取tabControl的offsettop $el获取组件元素
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /*
      网络请求相关方法
    */
    async getHomeMultidate() {
      const { data: res } = await getHomeMultidate()
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    },
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1
      const { data: res } = await getHomeGoods(type, page)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1

      // 完成了上拉加载更多
      this.$refs.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
