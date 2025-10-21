<template>
  <template v-for="subItem in props.menus" :key="subItem.path">
    <el-sub-menu   default-opened
     v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span class="is-truncated">{{ subItem.meta.title }}</span>
      </template>
      <sidebar-item :menus="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="subItem.meta.icon">
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span class="is-truncated">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
defineOptions({ name: 'AppMenuItem' })

const props = defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

const handleClickMenu = subItem => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
  router.push(subItem.path)
}
</script>
