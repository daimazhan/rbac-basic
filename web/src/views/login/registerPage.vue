<template>
  <div>
    <el-form
      :model="form"
      size="large"
      :rules="rules"
      :show-message="true"
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
      <el-form-item label="确认密码" prop="password2">
        <el-input
          v-model="form.password2"
          placeholder="请再次输入密码"
          prefix-icon="Lock"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="reg">注册</el-button>
        <el-button plain type="warning" auto-insert-space @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script setup>
import { reactive, ref, defineEmits, onMounted } from 'vue'
import { register } from '@/api/auth'
const emit = defineEmits(['updateMessage'])
const loginRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  password2: '',
  tel: '',
  verify: ''
})
const rules = reactive({
  username: [
    { required: true, trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: '用户名长度应在 6 到 20 个字符之间',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 20,
      message: '密码长度应在 6 到 20 个字符之间',
      trigger: 'blur'
    }
  ],
  password2: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      validator: validateConfirmPassword,
      trigger: 'blur'
    }
  ],
  tel: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号',
      trigger: 'blur'
    }
  ],
  verify: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
})
onMounted(() => {
})

// 自定义确认密码验证
function validateConfirmPassword(rule, value, callback) {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const reset = () => {
  loginRef.value.resetFields()
}

const sendMessage = () => {
  emit('updateMessage', 'first')
}
//注册
const reg = () => {
  loginRef.value.validate(valid => {
    if (valid) {
      register({ username: form.username, password: form.password })
        .then(res => {
          ElMessage({
            message: '注册成功！',
            type: 'success'
          })
          sendMessage()
          
        })
        .catch(err => {
          ElMessage({
            message: '注册失败！',
            type: 'error'
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
  