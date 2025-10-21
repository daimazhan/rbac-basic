<template>
  <div class="page-wrapper">
    <div class="login-wrapper">
      <div class="form-wrapper">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first"><Login/></el-tab-pane>
        <el-tab-pane label="注册" name="second"><Register @updateMessage="updateMessage"/></el-tab-pane>
      </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import Login from './loginPage.vue'
import Register from './registerPage.vue'
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab,event ) 

}
const updateMessage=(val)=>{
   activeName.value=val 
}
</script>


<style lang="scss" scoped>
.page-wrapper {
  background-color: #fce5af;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper {
    width: 1069px;
    height: 550px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: url(../../../bookshelf.png) no-repeat;
    background-size: contain;

    .form-wrapper {
      background-color: var(--el-bg-color);
      width: 390px;
      padding: 20px 30px;
    }
  }
  }
  .translate {
    position: fixed;
    right: 50px;
    top: 30px;
  }
</style>
