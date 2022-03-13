<template>
  <div id="Category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="classify-views">
      <!-- 左侧导航 -->
      <left-nav
        class="left"
        :goodsDate="leftData"
        @sendMainKey="recMainKey($event)"
        @click.native="getSubcategoryData()"
      ></left-nav>
      <!-- 右侧导航 -->
      <scroll class="content right" ref="scroll">
        <right-nav class="rightimg" :right-data="rightData"></right-nav>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import NavBar from 'components/common/navbar/NavBar'
import LeftNav from './childComps/LeftNav'
import RightNav from './childComps/RightNav'

import { getCategory, getSubcategory } from '../../network/category'
import { debounce } from 'common/utils'
export default {
  name: 'Category',
  components: {
    NavBar,
    LeftNav,
    RightNav,
    Scroll
  },
  data() {
    return {
      leftData: [],
      maitKey: '',
      rightData: []
    }
  },
  async created() {
    await this.getCategoryData()
    await this.getSubcategoryData()
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('imgLoad', refresh)
  },
  methods: {
    async getCategoryData() {
      const { data: res } = await getCategory()
      this.leftData = res.data.category.list
      this.maitKey = this.leftData[0].maitKey
    },
    recMainKey(key) {
      this.maitKey = key
    },
    async getSubcategoryData() {
      const { data: res } = await getSubcategory(this.maitKey)
      // console.log(res.data.list)
      this.rightData = res.data.list
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
.content {
  overflow: hidden;
  width: 75%;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 25%;
  right: 0;
}
.left {
  width: 25%;
}
.rightimg {
  width: 100%;
}
</style>
