<template>
  <div class="page-wrapper flex-vertical">
    <el-row style="width: 100%;">
      <el-col :span="8">
        <div class="app-container">
          <span>系统公告</span>
          <el-divider></el-divider>
          <div>
            <h3>v1</h3>
            <p>基本功能完成</p>
            <div style="font-size: 12px;">创建时间：2024-01-20</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="app-container">
          <span>更多资源：</span><el-link type="primary" href="https://www.daimazhan.com"
            target="_blank">https://www.daimazhan.com</el-link>
          <el-divider></el-divider>
          <img src="/src/assets/images/dmz.jpg">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="app-container">
          <span>教程博客：</span><el-link type="primary" href="https://blog.daimazhan.com"
            target="_blank">https://blog.daimazhan.com</el-link>
          <el-divider></el-divider>
          <img src="/src/assets/images/qrcode_dmz.jpg">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getMenuTree } from '@/api/auth'
import { onMounted, ref } from 'vue'

defineOptions({ name: 'PageHome' })
const getData = ref([])
const user = ref({})

onMounted(() => {
  getMenu()
})

function getMenu() {
  getMenuTree().then(res => {
    // console.log(`getMenu: ${JSON.stringify(res)}`)
    localStorage.setItem('menu', JSON.stringify(res))
  })
}

</script>
<style lang="scss" scoped>
p {
  margin: 20px 0;
}
</style>
