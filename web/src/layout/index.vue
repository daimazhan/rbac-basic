<template>
  <div class="app-wrapper app-vertical">
    <el-container>
      <el-aside :class="{ 'aside-collapsed': collapsed }">
<!--        <Aside />-->
        <Menu />
      </el-aside>

      <el-container>
        <el-header v-if="showHeader" :class="{ 'has-tags-view': showTagsView }">
          <Header />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive :include="keepAliveStore.keepAliveName">
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
        <el-footer v-if="showFooter">{{ config.FooterStr }}</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import config from "../../public/config"
import useLayoutStore from '@/stores/modules/layout'
import useAppStore from '@/stores/modules/app'
import Header from './components/Header/index.vue'
import Menu from "@/layout/components/Menu/index.vue";
import useKeepAliveStore from '@/stores/modules/keep-alive'

const keepAliveStore = useKeepAliveStore()
defineOptions({ name: 'AppLayoutWrapper'})

const layoutStore = useLayoutStore()
const showHeader = computed(() => layoutStore.showHeader)
const showFooter = computed(() => layoutStore.showFooter)
const showLogo = computed(() => layoutStore.showLogo)
const showTagsView = computed(() => layoutStore.showTagsView)

const appStore = useAppStore()
const collapsed = computed(() => appStore.collapsed)

//provide子组件里将会使用到的数据，为了能更好的追踪数据流向，不要在非layout目录inject这些数据
provide('showLogo', showLogo)
provide('showHeader', showHeader)
provide('showTagsView', showTagsView)
provide('collapsed', collapsed)
</script>

<style lang="scss" scoped>
@import '@/assets/styles/layout.scss';
</style>
