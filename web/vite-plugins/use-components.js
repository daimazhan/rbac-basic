import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const useComponents = () => {
  return Components({
    resolvers: [ElementPlusResolver({
      importStyle: 'sass'
    })]
  })
}

export default useComponents