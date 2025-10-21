<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <el-card class="search-wrapper">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="queryParams.roleName"
            placeholder="请输入角色名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input
            v-model="queryParams.roleCode"
            placeholder="请输入角色编码"
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
        <el-button type="primary" @click="handleAdd">新增角色</el-button>
      </template>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="roleList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleCode" label="角色编码" />
        <el-table-column prop="description" label="角色描述" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" link @click="handleAssignPermission(row)">
              分配权限
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
          v-model:current-page="queryParams.pageNUm"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 角色表单对话框 -->
    <el-dialog
      :title="dialog.title"
      v-model="dialog.visible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="roleFormRef"
        :model="roleForm"
        :rules="roleRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="roleForm.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="roleForm.status">
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

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      v-model="permissionDialog.visible"
      width="500px"
      @close="handlePermissionDialogClose"
    >
      <el-tree
        ref="permissionTreeRef"
        :data="permissionTree"
        :props="{ label: 'name' }"
        show-checkbox
        node-key="id"
        :default-checked-keys="permissionDialog.selectedPermissions"
      />
      <template #footer>
        <el-button @click="permissionDialog.visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handlePermissionSubmit"
          :loading="permissionDialog.loading"
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
import { getRoleList, createRole, updateRole, deleteRole, getRolePermissions, assignRolePermissions } from '@/api/role'
import { getPermissionTree } from '@/api/permission'

// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: '',
  roleCode: '',
  status: ''
})

// 数据列表
const roleList = ref([])
const total = ref(0)
const loading = ref(false)

// 表单对话框
const dialog = reactive({
  visible: false,
  title: '',
  type: ''
})

// 表单数据
const roleFormRef = ref(null)
const roleForm = reactive({
  id: undefined,
  roleName: '',
  roleCode: '',
  description: '',
  status: 1
})

// 表单校验规则
const roleRules = {
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
  roleCode: [
    { required: true, message: '请输入角色编码', trigger: 'blur' }
  ]
}

// 权限对话框
const permissionDialog = reactive({
  visible: false,
  roleId: undefined,
  selectedPermissions: [],
  loading: false
})

const permissionTreeRef = ref(null)
const permissionTree = ref([])

// 获取角色列表
const getList = async () => {
  try {
    loading.value = true
    const data = await getRoleList(queryParams)
    console.log(data)
    roleList.value = data.rows
    total.value = data.total
  } catch (error) {
    console.error('获取角色列表失败:', error)
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
  queryParams.roleName = ''
  queryParams.roleCode = ''
  queryParams.status = ''
  handleQuery()
}

// 新增角色
const handleAdd = () => {
  dialog.type = 'add'
  dialog.title = '新增角色'
  dialog.visible = true
  roleForm.id = undefined
}

// 编辑角色
const handleEdit = (row) => {
  dialog.type = 'edit'
  dialog.title = '编辑角色'
  dialog.visible = true
  Object.assign(roleForm, row)
}

// 删除角色
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认要删除该角色吗？', '提示', {
      type: 'warning'
    })
    await deleteRole(row.id)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {
    console.error('删除角色失败:', error)
  }
}

// 分配权限
const handleAssignPermission = async (row) => {
  permissionDialog.roleId = row.id
  permissionDialog.visible = true
  try {
    // 获取权限树
    const treeData = await getPermissionTree()
    permissionTree.value = treeData
    // 获取角色已有权限
    const permissionData = await getRolePermissions(row.id)
    console.log(permissionData)
    permissionDialog.selectedPermissions = permissionData.map(item => item.id)
  } catch (error) {
    console.error('获取权限数据失败:', error)
  }
}

// 提交权限分配
const handlePermissionSubmit = async () => {
  try {
    permissionDialog.loading = true
    const checkedKeys = permissionTreeRef.value.getCheckedKeys()
    const halfCheckedKeys = permissionTreeRef.value.getHalfCheckedKeys()
    const permissionIds = [...checkedKeys, ...halfCheckedKeys]
    await assignRolePermissions(permissionDialog.roleId, permissionIds)
    ElMessage.success('分配权限成功')
    permissionDialog.visible = false
  } catch (error) {
    console.error('分配权限失败:', error)
  } finally {
    permissionDialog.loading = false
  }
}

// 提交表单
const handleSubmit = () => {
  roleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialog.type === 'add') {
          await createRole(roleForm)
          ElMessage.success('新增成功')
        } else {
          await updateRole(roleForm)
          ElMessage.success('修改成功')
        }
        dialog.visible = false
        getList()
      } catch (error) {
        console.error('保存角色失败:', error)
      }
    }
  })
}

// 对话框关闭
const handleDialogClose = () => {
  roleFormRef.value.resetFields()
  Object.assign(roleForm, {
    id: undefined,
    roleName: '',
    roleCode: '',
    description: '',
    status: 1
  })
}

// 权限对话框关闭
const handlePermissionDialogClose = () => {
  permissionDialog.roleId = undefined
  permissionDialog.selectedPermissions = []
}

// 分页操作
const handleSizeChange = (val) => {
  queryParams.pageSize = val
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
.app-container {
  padding: 20px;
  
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
}
</style> 