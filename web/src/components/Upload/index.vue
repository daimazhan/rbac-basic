<template>
  <div class="app-upload">
    <el-button type="primary" @click="open">选择文件</el-button>
    <div class="mt10">
      <el-text :class="{ download: props.download }" type="danger" size="small">{{props.tips}}</el-text>
      <el-text
        v-if="props.download"
        class="pointer"
        type="primary"
        size="small"
        @click="handleDownload"
        >下载模板</el-text
      >
    </div>

    <div class="file-list mt10" v-if="file">
      <el-alert :title="file?.name" type="info" :closable="false" />
    </div>

    <input ref="uploadRef" type="file" accept=".xls" class="input-file" @change="uploadChange" />
  </div>
</template>

<script setup>
/** 原生导入组件，兼容低版本浏览器所准备 */

const uploadRef = ref(null)
const file = ref(undefined)

const props = defineProps({
  tips: {
    type: String,
    default: '提示信息'
  },
  // 是否显示下载模板
  download: {
    type: Boolean,
    default: false
  }
})

const uploadChange = e => {
  file.value = e.target.files[0]
  emits('on-change', file.value)
}

const handleDownload = () => {
  emits('on-download')
}

const clearFiles = () => {
  file.value = undefined
  uploadRef.value.value = ''
  emits('on-change', file.value)
}

const open = () => {
  uploadRef.value.click()
}

defineExpose({
  clearFiles
})
</script>

<style lang="scss" scoped>
.app-upload {
  .input-file {
    display: none;
  }
}

.download {
  &::after {
    content: '，请先';
  }
}
</style>
