<template>
  <el-collapse accordion>
    <draggable v-model="workList" group="work" handle=".dragIcon" @start="drag = true" @end="drag = false" item-key="key">
      <template #item="{ element }">
        <el-collapse-item class="single-work-box" :name="element.name">
          <template #title>
            <div class="rough-info">
              <div class="title-one">{{ formatCompany(element) }}</div>
              <div class="title-two">
                <span>{{ formatPosition(element) }}</span>
                <span class="divide-line"></span>
                <span>{{ formatWorkDate(element) }}</span>
              </div>
              <div class="right-icon">
                <el-tooltip effect="dark" content="拖拽调整顺序" placement="top">
                  <img class="dragIcon icon" src="@/assets/images/drag-inner.png">
                </el-tooltip>
                <el-tooltip effect="dark" content="删除" placement="top">
                  <img @click.stop="deleteItem(element.name)" class="icon" src="@/assets/images/del.png">
                </el-tooltip>
              </div>
            </div>
          </template>
          <el-form :model="element.form" :rules="element.rules" label-position="top" label-width="120px">
            <el-row>
              <el-col :span="11">
                <el-form-item prop="companyName" label="公司">
                  <el-input @blur="onFormBlur" v-model="element.form.companyName" />
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item label="时间">
                  <el-row>
                    <el-col :span="11">
                      <el-date-picker @blur="onFormBlur" v-model="element.form.start" type="month" placeholder="开始时间"
                        style="width: 100%" />
                    </el-col>
                    <el-col :span="2" style="text-align: center;">
                      <span class="text-gray-500">至</span>
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker @blur="onFormBlur" v-model="element.form.end" type="month" placeholder="结束时间"
                        style="width: 100%" />
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="职位类型">
                  <el-select @blur="onFormBlur" v-model="element.form.position" placeholder="请选择">
                    <el-option v-for="item in positionList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="工作内容">
                <!--  @change="(event) => onChange(event, element.key)" -->
                <vue3-tinymce v-model="element.form.workContent" @change="(e) => onChange(e, 'workContent', element.name)"
                  :setting="tinymceSetting" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="工作成绩">
                <!--  @change="(event) => onChange(event, element.key)" -->
                <vue3-tinymce v-model="element.form.achievement" @change="(e) => onChange(e, 'achievement', element.name)"
                  :setting="tinymceSetting" />
              </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
      </template>
    </draggable>
  </el-collapse>
  <div @click="add" style="color: #00bebd;" class="add-box">
    <el-icon>
      <Plus />
    </el-icon>
    <span style="margin-left: 10px;">增加新的工作经历</span>
  </div>
</template>

<script setup>
import moment from "moment"
import { ref } from "vue";
import draggable from 'vuedraggable'
import { tinymceSetting, positionList } from '../common';
import { isValidDate, getMap } from '@/utils'

const emit = defineEmits(['onVulesChange'])

// 对外暴露的方法
defineExpose({
  getCurrentForm() {
    return workList.value
  }
})

const workList = ref([{
  name: 1233332133,
  form: {
    companyName: '',
    start: '',
    end: '',
    position: '',
    workContent: '',
    achievement: ''
  },
  rules: {
    companyName: [
      { required: true, message: '请填写所在公司', trigger: 'blur' },
    ]
  }
}])

const add = () => {
  workList.value.push({
    name: new Date().getTime(),
    form: {
      companyName: '',
      start: '',
      end: '',
      position: '',
      workContent: '',
      achievement: ''
    },
    rules: [

    ]
  })
}

// 删除某一条数据
const deleteItem = (name) => {
  console.log('name', name);
  ElMessageBox.confirm(
    '删除后不可恢复，确认删除吗？',
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  )
    .then(() => {
      const index = workList.value.findIndex(_ => _.name === name)
      const item = workList.value.splice(index, 1)
    })
}

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
  emit('onVulesChange')
}

// 格式化方法
const formatCompany = (element) => {
  return element.form.companyName ? element.form.companyName : '未填写公司名称'
}
const formatPosition = (element) => {
  return element.form.position ? getMap(positionList)[element.form.position] : '职位类型'
}
const formatWorkDate = (element) => {
  let start = element.form.start
  let end = element.form.end
  if (start && end) {
    if (isValidDate(element.form.start)) {
      start = moment(start).format('YYYY-MM')
      end = moment(start).format('YYYY-MM')
    }
    return `${start}-${end}`
  } else {
    return '工作时间'
  }
}

</script>

<style lang="scss"></style>