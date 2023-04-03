<template>
  <el-collapse accordion>
    <draggable v-model="workList" group="work" handle=".single-work-box" @start="drag = true" @end="drag = false" item-key="key">
        <template #item="{ element }">
          <el-collapse-item class="single-work-box" :name="element.name">
            <template #title>
              <div class="rough-info">
                <div class="title-one">{{ element.form.companyName ? element.form.companyName : '未填写公司名称'}}</div>
                <div class="title-two">
                  <span>{{ element.form.position ? element.form.position : '职位类型' }}</span>
                  <span class="divide-line"></span>
                  <span>{{ (element.form.start && element.form.end) ? `${element.form.start}-${element.form.end}` : '工作时间'}}</span>
                </div>
                <div class="right-icon">
                  <el-tooltip effect="dark" content="拖拽调整顺序" placement="top">
                      <img class="icon" src="@/assets/images/drag-inner.png">
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除" placement="top">
                      <img class="icon" src="@/assets/images/del.png">
                  </el-tooltip>
                </div>
              </div>
            </template>
            <el-form :model="element.form" label-position="top" label-width="120px">
              <el-row>
                <el-col :span="11">
                    <el-form-item label="公司">
                        <el-input v-model="element.form.companyName" />
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                  <el-form-item label="时间">
                    <el-row>
                      <el-col :span="11">
                        <el-date-picker v-model="element.form.start" type="month" placeholder="开始时间" style="width: 100%" />
                      </el-col>
                      <el-col :span="2" style="text-align: center;">
                          <span class="text-gray-500">至</span>
                      </el-col>
                      <el-col :span="11">
                        <el-date-picker v-model="element.form.end" type="month" placeholder="结束时间" style="width: 100%" />
                      </el-col>
                    </el-row>
                    </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="11">
                    <el-form-item label="职位类型">
                        <el-select v-model="element.form.position" placeholder="请选择">
                            <el-option label="前端开发工程师" value="F" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="工作内容">
                  <vue3-tinymce @change="(event) => onChange(event, element.key)" v-model="element.form.workContent"
                            :setting="tinymceSetting" />
                  
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="工作成绩">
                  <vue3-tinymce @change="(event) => onChange(event, element.key)" v-model="element.form.achievement"
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
import { ref } from "vue";
import draggable from 'vuedraggable'
import { tinymceSetting } from '../common';

const onChange = (str) => {
  console.log('str', str);
}

const workList = ref([{
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
  console.log('workList', workList);
}
</script>

<style lang="scss"></style>