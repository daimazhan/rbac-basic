<template>
  <div class="app-container">
    <el-card class="table-wrapper">
      <template #header>
        <el-button type="primary" @click="handleAdd(null)">新增权限</el-button>
      </template>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="permissionList"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="name" label="权限名称" />
        <el-table-column prop="permissionCode" label="权限标识" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 1 ? '' : 'warning'">
              {{ row.type === 1 ? '菜单' : '按钮' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由地址" />
        <el-table-column prop="component" label="组件路径" />
        <el-table-column prop="icon" label="图标" width="100">
          <template #default="{ row }">
            <el-icon v-if="row.icon">
              <component :is="row.icon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleAdd(row)">
              新增子权限
            </el-button>
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 权限表单对话框 -->
    <el-dialog
      :title="dialog.title"
      v-model="dialog.visible"
      width="600px"
      @close="handleDialogClose"
    >
      <el-form
        ref="permissionFormRef"
        :model="permissionForm"
        :rules="permissionRules"
        label-width="100px"
      >
        <el-form-item label="上级权限">
          <el-tree-select
            v-model="permissionForm.parentId"
            :data="permissionOptions"
            :props="{ label: 'name', value: 'id' }"
            placeholder="请选择上级权限"
            clearable
            check-strictly
          />
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="permissionForm.name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-radio-group v-model="permissionForm.type">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限标识" prop="permissionCode">
          <el-input v-model="permissionForm.permissionCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="路由地址" prop="path" v-if="permissionForm.type === 1">
          <el-input v-model="permissionForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component" v-if="permissionForm.type === 1">
          <el-input v-model="permissionForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="permissionForm.type === 1">
          <el-input v-model="permissionForm.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="permissionForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="permissionForm.status">
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPermissionTree, createPermission, updatePermission, deletePermission } from '@/api/permission'

// 数据列表
const permissionList = ref([])
const loading = ref(false)

// 表单对话框
const dialog = reactive({
  visible: false,
  title: '',
  type: ''
})

// 表单数据
const permissionFormRef = ref(null)
const permissionForm = reactive({
  id: undefined,
  parentId: 0,
  name: '',
  type: 1,
  permissionCode: '',
  path: '',
  component: '',
  icon: '',
  sort: 0,
  status: 1
})

// 表单校验规则
const permissionRules = {
  name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择权限类型', trigger: 'change' }
  ],
  permissionCode: [
    { required: true, message: '请输入权限标识', trigger: 'blur' }
  ]
}

// 权限树选项
const permissionOptions = ref([])

// 获取权限列表
const getList = async () => {
  try {
    loading.value = true
    const  data  = await getPermissionTree()
    console.log(data)
    permissionList.value = data
    permissionOptions.value = [{ id: 0, name: '顶级权限', children: data }]
  } catch (error) {
    console.error('获取权限列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 新增权限
const handleAdd = (row) => {
  dialog.type = 'add'
  dialog.title = '新增权限'
  dialog.visible = true
  permissionForm.parentId = row ? row.id : 0
}

// 编辑权限
const handleEdit = (row) => {
  dialog.type = 'edit'
  dialog.title = '编辑权限'
  dialog.visible = true
  Object.assign(permissionForm, row)
}

// 删除权限
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认要删除该权限吗？删除后其子权限也将被删除！', '提示', {
      type: 'warning'
    })
    await deletePermission(row.id)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {
    console.error('删除权限失败:', error)
  }
}

// 提交表单
const handleSubmit = () => {
  permissionFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialog.type === 'add') {
          await createPermission(permissionForm)
          ElMessage.success('新增成功')
        } else {
          await updatePermission(permissionForm)
          ElMessage.success('修改成功')
        }
        dialog.visible = false
        getList()
      } catch (error) {
        console.error('保存权限失败:', error)
      }
    }
  })
}

// 对话框关闭
const handleDialogClose = () => {
  permissionFormRef.value.resetFields()
  Object.assign(permissionForm, {
    id: undefined,
    parentId: 0,
    name: '',
    type: 1,
    permissionCode: '',
    path: '',
    component: '',
    icon: '',
    sort: 0,
    status: 1
  })
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  
  .table-wrapper {
    margin-bottom: 20px;
  }
}
</style> 