import vue from '@vitejs/plugin-vue'
import useAutoImport from './use-auto-import'
import useSvgIconsPlugin from './use-svg-icon'
import useComponents from './use-components'

const useVitePlugins = () => {
  return [
    vue(),
    useComponents(),
    useAutoImport(),
    useSvgIconsPlugin()
  ]
}

export default useVitePlugins