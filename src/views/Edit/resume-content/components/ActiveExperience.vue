<template>
  <div class="activeExperience">
    <el-form :model="form" :rules="rules" label-position="top" label-width="120px">
      <el-row>
        <el-col :span="11">
          <el-form-item prop="projectName" label="社团名称">
            <el-input @blur="onFormBlur" v-model="form.projectName" placeholder="例如：校学生会" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="担任角色">
            <el-input @blur="onFormBlur" v-model="form.role" placeholder="例如：外联部部长" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="项目开始时间">
            <el-date-picker @blur="onFormBlur" v-model="form.start" type="month" placeholder="选择年月" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="项目结束时间">
            <el-date-picker @blur="onFormBlur" v-model="form.end" type="month" placeholder="选择年月" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="项目描述">
          <!--  @change="(event) => onChange(event, key)" -->
          <!--  v-model="form.workContent" -->
          <vue3-tinymce v-model="form.workContent" @change="(e) => onChange(e, 'workContent', name)"
            :setting="tinymceSetting" />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { tinymceSetting } from '../common';

const emit = defineEmits(['onVulesChange'])

// 对外暴露的方法
defineExpose({
  getCurrentForm() {
    return workLis.value
  }
})

const form = reactive({
  projectName: '',
  role: '',
  start: '',
  end: '',
  workContent: '123',
})

const rules = reactive({
  projectName: [
    { required: true, message: '请输入社团名称', trigger: 'blur' },
  ]
})

// 富文本编辑器监听onChange事件，先修改值，再触发对外暴露的方法
const onChange = (str, key, name) => {
  workList.value.forEach(item => {
    if (item.name === name) {
      item[key] = str
    }
  })
  onFormBlur()
}

// 监听表单失焦事件
const onFormBlur = (e) => {
  console.log('e', e);
  console.log(workList.value);
  emit('onVulesChange', {
    data: workList.value,
    blockType: 'workExperienceRef'
  })
}

</script>

<style lang="scss">
.activeExperience {
  border: 1px solid #e9eaeb;
  padding: 20px;

  .el-form-item,
  .tox-tinymce {
    width: 100%;
  }
}
</style>