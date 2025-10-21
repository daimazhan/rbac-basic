<template>
  <el-scrollbar
    :class="{ 'has-logo': showLogo, 'has-header': showHeader }"
  >
    <!-- unique-opened -->
    <el-menu
      class="app-menu menu-vertical"
      :class="{ 'app-menu__collapsed': collapsed }"
      unique-opened
      :default-active="activeMenu"
      :router="false"
      :collapse="collapsed"
      :collapse-transition="false"
    >
      <sidebar-item :menus="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import useAuthStore from '@/stores/modules/auth'

defineOptions({ name: 'AppLayoutMenu' })

const route = useRoute()
const authStore = useAuthStore()
const menus = computed(() => authStore.getFilterMenuList().filter(menu => !menu.hidden))
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path))

const showLogo = inject('showLogo')
const showHeader = inject('showHeader')
const collapsed = inject('collapsed')
</script>

<style lang="scss" scoped>
@import '@/assets/styles/menu.scss';
</style>
