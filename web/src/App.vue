<template>
  <el-config-provider size="default" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

defineOptions({ name: 'App' })

</script>
