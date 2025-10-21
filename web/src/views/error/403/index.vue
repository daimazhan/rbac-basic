<template>
  <div class="page-wrapper">
    <el-result sub-title="403">
      <template #icon>
        <el-image :src="img403" />
      </template>
      <template #extra>
        <el-button type="primary" @click="back">返回主页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import img403 from '@/assets/images/403.png'

defineOptions({ name: 'Page403' })

const router = useRouter()

const back = () => {
  router.replace('/')
}
</script>

<style scoped lang="scss">
.el-image {
  width: 512px;
}
</style>