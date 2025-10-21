<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ width: props.size, height: props.size }">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>
<script setup>
defineOptions({ name: 'AppSvgIcon' })

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String
  },
  color: {
    type: String,
    default: '#303133'
  },
  size: {
    type: String,
    default: '1rem'
  }
})

const iconName = computed(() => `#icon-${props.icon}`)
const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'))
</script>

<style scoped lang="scss">
.svg-icon {
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
