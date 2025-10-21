<template>
  <div>
    <el-form
      :model="form"
      size="large"
      :rules="rules"
      :show-message="false"
      ref="loginRef"
      label-width="auto"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          prefix-icon="Lock"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="handleLogin" :loading="false">登录</el-button>
        <el-button plain type="warning" auto-insert-space @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import useUserStore from '@/stores/modules/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, getUserInfo } from '@/api/auth'
const router = useRouter()
const userStore = useUserStore()
const loginRef = ref(null)

const form = reactive({
  username: 'admin',
  password: '123123'
})

const rules = reactive({
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }]
})

onMounted(() => {

})

function handleLogin() {
  loginRef.value.validate(valid => {
    if (valid) {
      login(form).then(res => {
        console.log(`login:${res}`)
        userStore.login(res).then(() => {
          getUserInfo().then(res => {
            console.log(`getUserInfo:${JSON.stringify(res)}`)
            localStorage.setItem('user', JSON.stringify(res))
            router.push('/')
          })
        })
      })
    }
  })
}

</script>
<style lang="scss" scoped>
::v-deep(.el-input__wrapper) {
  padding: 1px 1px 1px 15px; /* 去掉默认的内边距 */
}
/* 确保图片的尺寸和位置正确 */
.captcha-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

</style>
