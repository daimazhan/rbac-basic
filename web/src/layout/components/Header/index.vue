<template>
  <div class="header-wrapper">
    <div class="tool-wrapper__left">
      <div class="widget-wrapper mr20" @click="appStore.collapsedChange">
        <SvgIcon color="var(--el-text-color-regular)" :icon="iconC" size="24px" />
      </div>
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator-icon="ArrowRight">
          <TransitionGroup name="breadcrumb" mode="out-in" tag="el-breadcrumb-item">
            <template v-if="breadcrumbList">
              <el-breadcrumb-item to="/" v-if="breadcrumbList[0].meta.title !== '主页'">
                <el-text size="default" tag="b">主页</el-text>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
                <el-text size="default">{{ item.meta.title }}</el-text>
              </el-breadcrumb-item>
            </template>
          </TransitionGroup>
        </el-breadcrumb>
      </div>
    </div>
    <div class="tool-wrapper__right">
      <router-link class="btn" to="/profile">{{nickname}}</router-link>
      <el-divider direction="vertical"></el-divider>
      <div class="widget-wrapper mr15" @click="toggleDark()">
    <SvgIcon color="var(--el-text-color-regular)" :icon="icon" size="24px" />
  </div>
      <el-divider direction="vertical"></el-divider>
      <div class="widget-wrapper" @click="handleLogout">
        <SvgIcon color="var(--el-text-color-regular)" icon="logout" size="24px" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'
import useAppStore from '@/stores/modules/app'
import useAuthStore from '@/stores/modules/auth'
import { removeToken } from '@/utils/cookie'
import { logout } from "@/api/auth"
import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";
const router = useRouter()
const handleLogout = () => {
  ElMessageBox.confirm(
    '您确认要退出系统吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      buttonSize: 'default'
    }
  )
  .then(() => {
    logout().then(res=>{
    localStorage.removeItem('keep-alive')
    localStorage.removeItem('tags-view')
    localStorage.removeItem('user')
    localStorage.removeItem('layout')
    localStorage.removeItem('app')
    removeToken()
    location.reload()
    router.replace('/login')
    })

  })
  .catch(() => {})
}
const route = useRoute()
const authStore = useAuthStore()
const breadcrumbList = computed(() => authStore.getBreadcrumbList()[route.matched[route.matched.length - 1].path])
const collapsed = inject('collapsed')
const appStore = useAppStore()
const iconC = computed(() => collapsed.value ? 'collapse-off' : 'collapse-on')
const isDark = useDark()
const toggleDark = useToggle(isDark)
const icon = computed(() => (isDark.value ? 'night-mode' : 'daytime-mode'))
const nickname = ref(JSON.parse(localStorage.getItem("user"))? JSON.parse(localStorage.getItem("user")).nickname : "" || "");
defineOptions({ name: 'AppLayoutHeader '})
</script>

<style lang="scss" scoped>
.tool-wrapper__left, .tool-wrapper__right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.el-divider {
  margin: 0 15px;
}

</style>
