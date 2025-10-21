<template>
  <div class="page-wrapper flex-vertical app-container">
      <div>
        <p>个人资料</p>
        <el-divider></el-divider>
        <p>用户名：{{ user.username }}</p>
        <p>昵称：{{ user.nickname }}<el-link :icon="Edit" type="primary" @click="changeNickname"></el-link></p>
      </div>

      <div>
        <p>修改密码</p>
        <el-divider></el-divider>
        <el-form
            :model="form"
            size="large"
            :rules="rules"
            :show-message="true"
            ref="loginRef"
            label-width="auto"
        >
          <el-form-item label="旧密码" prop="currentPassword">
            <el-input
                v-model="form.currentPassword"
                placeholder="请输入旧的密码"
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
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
                v-model="form.confirmPassword"
                placeholder="请再次输入密码"
                prefix-icon="Lock"
                type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" auto-insert-space @click="changePwd">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import {  getUserInfo, updateProfile, changePassword } from '@/api/auth'
import {Edit} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from 'element-plus'

const loginRef = ref(null)
const user = ref({})
const form = reactive({
  currentPassword: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive({
  username: [{ required: true, trigger: 'blur' }],
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
  confirmPassword: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      validator: validateConfirmPassword,
      trigger: 'blur'
    }
  ]
})

onMounted(() => {
  getInfo()
})

// 修改密码
function changePwd(){
  changePassword(form).then(res=>{
    console.log(res)
    ElMessage({
      type: 'success',
      message: '操作成功'
    })
  })
}

// 获取用户信息
const getInfo = () => {
  getUserInfo().then(res => {
    user.value = res
  })
}

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

// 修改昵称
const changeNickname = () => {
  ElMessageBox.prompt('请输入新的昵称', '修改昵称', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern:
        /^[a-zA-Z0-9\u4e00-\u9fa5]{1,16}$/,
    inputErrorMessage: '非法的昵称内容',
  })
    .then(({ value }) => {
      updateProfile({nickname: value}).then(() => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作取消',
      })
    })
}

</script>
<style lang="scss" scoped>
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  margin: 20px 0;
}
.el-input {
  width: 300px;
}

.el-input-number {
  width: 200px;
}
</style>
