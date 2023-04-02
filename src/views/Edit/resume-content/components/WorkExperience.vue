<template>
  <el-collapse @change="onChange" accordion>
    <el-collapse-item class="single-work-box" name="1">
      <template #title>
        Consistency<el-icon class="header-icon">
          <info-filled />
        </el-icon>
      </template>
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
    </el-collapse-item>
    <el-collapse-item class="single-work-box" name="2">
      <template #title>
        Consistency<el-icon class="header-icon">
          <info-filled />
        </el-icon>
      </template>
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such
        as: design style, icons and texts, position of elements, etc.
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>

const onChange = (str) => {
  console.log('str', str);
}
</script>

<style lang="scss"></style>