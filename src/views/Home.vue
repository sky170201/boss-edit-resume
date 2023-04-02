<template>
  <div class="home">
    <el-button type="primary" @click="editResumes">编辑简历</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const editResumes = () => {
  router.push({
    path: '/edit'
  })
}
</script>
<style lang="scss">
.home {
  margin-top: 150px;
  text-align: center;
}
</style>
