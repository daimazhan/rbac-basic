import * as Icons from '@element-plus/icons-vue'

const useIcons = app => {
  for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
  }
}

export default useIcons
