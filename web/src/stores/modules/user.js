import { setToken, removeToken} from "@/utils/cookie";
import { login, logout } from "@/api/auth";
import { useRouter } from 'vue-router'

const useUserStore = defineStore('user', () => {

  const state = reactive({
    user: ''
  })

  const login = token => {
    // console.log(`Login: ${token}`)
    return new Promise(resolve => {
      setToken(token)
      resolve()
    })
  }

  const logout = () => {
    // console.log(`Login: ${token}`)
    return new Promise(resolve => {
      removeToken()
      useRouter().push('/login')
      // resolve()
    })
  }

  return {
    ...toRefs(state),
    login, logout
  }

})

export default useUserStore