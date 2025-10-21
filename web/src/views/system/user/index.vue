<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <el-card class="search-wrapper">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="queryParams.phone"
            placeholder="请输入手机号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="请选择状态" style="width: 150px;" fit-input-width clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮区域 -->
    <el-card class="table-wrapper">
      <template #header>
        <el-button type="primary" @click="handleAdd">新增用户</el-button>
      </template>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="userList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" link @click="handleAssignRole(row)">
              分配角色
            </el-button>
            <el-button type="primary" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 用户表单对话框 -->
    <el-dialog
      :title="dialog.title"
      v-model="dialog.visible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialog.type === 'add'">
          <el-input
            v-model="userForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userForm.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
          确定
        </el-button>
      </template>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      v-model="roleDialog.visible"
      width="500px"
      @close="handleRoleDialogClose"
    >
      <el-form label-width="80px">
        <el-form-item label="角色">
          <el-checkbox-group v-model="roleDialog.selectedRoles">
            <el-checkbox
              v-for="role in roleList"
              :key="role.id"
              :label="role.id"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="roleDialog.visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleRoleSubmit"
          :loading="roleDialog.loading"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, createUser, updateUser, deleteUser, assignUserRoles } from '@/api/user'
import {getRoleList, getRoleOptions} from '@/api/role'

// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  username: '',
  phone: '',
  status: ''
})

// 数据列表
const userList = ref([])
const total = ref(0)
const loading = ref(false)

// 表单对话框
const dialog = reactive({
  visible: false,
  title: '',
  type: ''
})

// 表单数据
const userFormRef = ref(null)
const userForm = reactive({
  id: undefined,
  username: '',
  password: '',
  nickname: '',
  phone: '',
  email: '',
  status: 1
})

// 表单校验规则
const userRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ]
}

// 角色对话框
const roleDialog = reactive({
  visible: false,
  userId: undefined,
  selectedRoles: [],
  loading: false
})

const roleList = ref([])

// 获取用户列表
const getList = async () => {
  try {
    loading.value = true
    const res = await getUserList(queryParams)
    console.log(res)
    userList.value = res.rows
    total.value = res.total
  } catch (error) {
    console.error('获取用户列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 查询操作
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

// 重置查询
const resetQuery = () => {
  queryParams.username = ''
  queryParams.phone = ''
  queryParams.status = ''
  handleQuery()
}

// 新增用户
const handleAdd = () => {
  dialog.type = 'add'
  dialog.title = '新增用户'
  dialog.visible = true
  userForm.id = undefined
}

// 编辑用户
const handleEdit = (row) => {
  dialog.type = 'edit'
  dialog.title = '编辑用户'
  dialog.visible = true
  Object.assign(userForm, row)
}

// 删除用户
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认要删除该用户吗？', '提示', {
      type: 'warning'
    })
    await deleteUser(row.id)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {
    console.error('删除用户失败:', error)
  }
}

// 分配角色
const handleAssignRole = async (row) => {
  roleDialog.userId = row.id
  roleDialog.visible = true
  try {
    const resp  = await getRoleOptions()
    console.log(resp)
    roleList.value = resp
    roleDialog.selectedRoles = row.roleIds || []
  } catch (error) {
    console.error('获取角色列表失败:', error)
  }
}

// 提交角色分配
const handleRoleSubmit = async () => {
  try {
    roleDialog.loading = true
    console.log(roleDialog.selectedRoles)
    const roleIds = [...roleDialog.selectedRoles]
    await assignUserRoles(roleDialog.userId, roleIds)
    ElMessage.success('分配角色成功')
    roleDialog.visible = false
    getList()
  } catch (error) {
    console.error('分配角色失败:', error)
  } finally {
    roleDialog.loading = false
  }
}

// 提交表单
const handleSubmit = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialog.type === 'add') {
          await createUser(userForm)
          ElMessage.success('新增成功')
        } else {
          await updateUser(userForm)
          ElMessage.success('修改成功')
        }
        dialog.visible = false
        getList()
      } catch (error) {
        console.error('保存用户失败:', error)
      }
    }
  })
}

// 对话框关闭
const handleDialogClose = () => {
  userFormRef.value.resetFields()
  Object.assign(userForm, {
    id: undefined,
    username: '',
    password: '',
    nickname: '',
    phone: '',
    email: '',
    status: 1
  })
}

// 角色对话框关闭
const handleRoleDialogClose = () => {
  roleDialog.userId = undefined
  roleDialog.selectedRoles = []
}

// 分页操作
const handleSizeChange = (val) => {
  queryParams.size = val
  getList()
}

const handleCurrentChange = (val) => {
  queryParams.pageNum = val
  getList()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
  
  .search-wrapper {
    margin-bottom: 20px;
  }
  
  .table-wrapper {
    margin-bottom: 20px;
  }
  
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style> 