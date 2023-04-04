<template>
    <!-- drag = false -->
    <!-- drag = true -->
    <draggable v-model="list" class="dragContent" group="people" handle=".drag" @choose="($event) => choose($event)"
        @unchoose="unchoose" item-key="key">
        <template #item="{ element }">
            <div class="block" :data-key="element.key">
                <div class="titleContainer">
                    <div class="blockTitle">{{ element.name }}</div>
                    <ul class="hover-icon">
                        <el-tooltip effect="dark" content="拖拽调整顺序" placement="top">
                            <!--  @mousedown="hiddenContent(element.key)" @mouseup="showContent(element.key)" -->
                            <li class="drag">
                                <img class="icon info" src="@/assets/images/drag-menu.png">
                                <img class="icon hover" src="@/assets/images/drag-menu-hover.png">
                            </li>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top">
                            <li @click="deleteBlock(element.key)" class="del">
                                <img class="icon info" src="@/assets/images/del.png">
                                <img class="icon hover" src="@/assets/images/del-hover.png">
                            </li>
                        </el-tooltip>
                    </ul>
                </div>
                <main v-if="element.isShow">
                    <!-- 个人优势 -->
                    <div v-if="element.key === 'B'">
                        <vue3-tinymce @change="(event) => onChange(event, element.key)" v-model="state.perAdvContent"
                            :setting="tinymceSetting" />
                    </div>
                    <!-- 教育经历 -->
                    <div v-if="element.key === 'C'">
                        <EducationExperience @onVulesChange="onVulesChange" ref="educationExperienceRef" />
                    </div>
                    <!-- 工作经历 -->
                    <div v-if="element.key === 'D'">
                        <WorkExperience @onVulesChange="onVulesChange" ref="workExperienceRef" />
                    </div>
                    <!-- 实习经历 -->
                    <div v-if="element.key === 'E'">
                        <InternShipExperience @onVulesChange="onVulesChange" ref="internShipExperienceRef" />
                    </div>
                    <!-- 项目经历 -->
                    <div v-if="element.key === 'F'">
                        <ProjectExperience @onVulesChange="onVulesChange" ref="projectExperienceRef" />
                    </div>
                    <!-- 志愿者经历 -->
                    <div v-if="element.key === 'I'">
                        <VolunteerExperience @onVulesChange="onVulesChange" ref="volunteerExperienceRef" />
                    </div>
                    <!-- 社团经历 -->
                    <div v-if="element.key === 'K'">
                        <ActiveExperience @onVulesChange="onVulesChange" ref="activeExperienceRef" />
                    </div>
                    <!-- 资格证书 -->
                    <div v-if="element.key === 'G'">
                        <div class="list-container">
                            <p>点击添加资格证书，如英语四、六级</p>
                        </div>
                    </div>
                    <!-- 社交主页 -->
                    <div v-if="element.key === 'H'">
                        <el-form class="mainPage" :label-width="20" ref="formRef" :model="socialPageForm">
                            <el-form-item v-for="(domain, index) in socialPageForm.domains" :key="domain.key" label=""
                                :prop="'domains.' + index + '.value'" :rules="{
                                    required: true,
                                    message: '请输入社交主页',
                                    trigger: 'blur',
                                }">
                                <el-input @blur="onChange" placeholder="例如：github.com/erik" v-model="domain.value" />
                                <img @click.prevent="removeDomain(domain)" class="pointer delPage"
                                    src="@/assets/images/del.png">
                            </el-form-item>
                        </el-form>
                        <div @click="addDomain" style="color: #00bebd;" class="add-box">
                            <el-icon>
                                <Plus />
                            </el-icon>
                            <span style="margin-left: 10px;">增加新的社交主页</span>
                        </div>
                    </div>
                    <!-- 专业技能 -->
                    <div v-if="element.key === 'J'">
                        <vue3-tinymce @change="(event) => onChange(event, element.key)" v-model="state.proSkiContent"
                            :setting="tinymceSetting" />
                    </div>
                    <!-- 兴趣爱好 -->
                    <div class="padding-rl-20" v-if="element.key === 'L'">
                        <el-input v-model="state.hobby" @change="(event) => onChange(event, element.key)" rows="5"
                            maxlength="1000" placeholder="输入兴趣爱好" show-word-limit type="textarea" />
                    </div>
                    <!-- 荣誉奖项 -->
                    <div class="padding-rl-20" v-if="element.key === 'M'">
                        <vue3-tinymce @change="(event) => onChange(event, element.key)" v-model="state.award"
                            :setting="tinymceSetting" />
                    </div>
                </main>
            </div>
        </template>
    </draggable>
    <div class="addModule">
        <div class="blockTitle">增加模块</div>
        <ul class="padding-rl-20 module-list">
            <li @click="addModule(item.key)" v-for="item in moduleTitleList" :key="item.key
            ">
                <el-icon style="margin-left: 50px; font-weight: 700;">
                    <Plus />
                </el-icon>
                <p>{{ item.name }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import draggable from 'vuedraggable'
// https://www.itxst.com/vue-draggable/vnqb7fey.html
import { ElMessageBox } from 'element-plus'
import { tinymceSetting } from './common';
import WorkExperience from './components/WorkExperience.vue'
import InternShipExperience from './components/InternShipExperience.vue'
import ProjectExperience from './components/ProjectExperience.vue'
import EducationExperience from './components/EducationExperience.vue'
import VolunteerExperience from './components/VolunteerExperience.vue'
import ActiveExperience from './components/ActiveExperience.vue'

const emit = defineEmits(['handleChange'])

defineExpose({
    getCurrentData() {
        return collectData()
    }
})

const onVulesChange = () => {
    emit('handleChange')
}

// 各模块引用
const workExperienceRef = ref(null) // 工作经历
const internShipExperienceRef = ref(null) // 实习经历
const projectExperienceRef = ref(null) // 项目经历
const educationExperienceRef = ref(null) // 教育经历
const volunteerExperienceRef = ref(null) // 志愿者经历
const activeExperienceRef = ref(null) // 社团经历

// 收集所有数据
const collectData = () => {
    const workExperience = workExperienceRef.value?.getCurrentForm()
    const internShipExperience = internShipExperienceRef.value?.getCurrentForm()
    const projectExperience = projectExperienceRef.value?.getCurrentForm()
    const educationExperience = educationExperienceRef.value?.getCurrentForm()
    const volunteerExperience = volunteerExperienceRef.value?.getCurrentForm()
    const activeExperience = activeExperienceRef.value?.getCurrentForm()
    
    return {
        workExperience,
        internShipExperience,
        projectExperience,
        educationExperience,
        volunteerExperience,
        activeExperience,
        ...state,
        social: socialPageForm.domains
    }
}

const moduleTitleList = ref([
    { id: 1, name: '自定义模块', key: 'A', isShow: true },
    { id: 2, name: '个人优势', key: 'B', isShow: true },
    { id: 3, name: '教育经验', key: 'C', isShow: true },
    // { id: 4, name: '工作经历', key: 'D', isShow: true },
    { id: 5, name: '实习经历', key: 'E', isShow: true },
    { id: 6, name: '项目经历', key: 'F', isShow: true },
    { id: 7, name: '资格证书', key: 'G', isShow: true },
    { id: 8, name: '社交主页', key: 'H', isShow: true },
    { id: 9, name: '志愿者经历', key: 'I', isShow: true },
    { id: 10, name: '专业技能', key: 'J', isShow: true },
    { id: 11, name: '社团经历', key: 'K', isShow: true },
    { id: 12, name: '兴趣爱好', key: 'L', isShow: true },
    { id: 13, name: '荣誉奖项', key: 'M', isShow: true },
])

const list = ref([
    // { name: '个人优势', key: 'B', isShow: true },
    // { name: '社交主页', key: 'H', isShow: true },
    // { name: '资格证书', key: 'G', isShow: true },
    // { name: '专业技能', key: 'J', isShow: true },
    // { id: 12, name: '兴趣爱好', key: 'L', isShow: true },
    // { id: 13, name: '荣誉奖项', key: 'M', isShow: true },
    { id: 4, name: '工作经历', key: 'D', isShow: true },
    // { id: 5, name: '实习经历', key: 'E', isShow: true },
    // { id: 6, name: '项目经历', key: 'F', isShow: true },
    // { id: 3, name: '教育经验', key: 'C', isShow: true },
    // { id: 9, name: '志愿者经历', key: 'I', isShow: true },
    // { id: 11, name: '社团经历', key: 'K', isShow: true },
])

// 删除某一块区域
const deleteBlock = (key) => {
    if (list.value.length === 1) {
        ElMessageBox.confirm(
            '至少保留一个模块哦~',
            '温馨提示',
            {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'error',
            }
        )
            .then(() => {

            })
        return
    }
    ElMessageBox.confirm(
        '确认删除该模块吗？',
        '温馨提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            const index = list.value.findIndex(_ => _.key === key)
            const item = list.value.splice(index, 1)
            moduleTitleList.value.push(...item)
        })
}

const hiddenContent = (key) => {
    console.log('hiddenContent key', key);
    list.value.forEach(_ => (_.key === key) && (_.isShow = false))
}

const showContent = (key) => {
    console.log('showContent key', key);
    list.value.forEach(_ => (_.key === key) && (_.isShow = true))
}

const unchoose = (e) => {
    const key = e.item.dataset.key
    list.value.forEach(_ => _.isShow = true)
}

const choose = (e) => {
    const key = e.item.dataset.key
    hiddenContent(key)
}

// 添加模块
const addModule = (key) => {
    const index = moduleTitleList.value.findIndex(_ => _.key === key)
    const item = moduleTitleList.value.splice(index, 1)
    list.value.push(...item)
}

// 各模块状态
const state = reactive({
    perAdvContent: '请输入个人优势',
    proSkiContent: '请输入专业技能',
    hobby: '请输入兴趣爱好',
    award: '请输入荣誉奖项',
});

const onChange = (text, key) => {
    switch (key) {
        case 'B':
            state.perAdvContent = text
            break;
        case 'J':
            state.proSkiContent = text
            break;
        case 'L':
            state.hobby = text
            break;
        case 'M':
            state.proSkiContent = text
            break;
        default:
            break;
    }
    onVulesChange()
}

// 社交主页
const formRef = ref()
const socialPageForm = reactive({
    domains: [
        {
            key: 1,
            value: '',
        },
    ],
})
const removeDomain = (item) => {
    const index = socialPageForm.domains.indexOf(item)
    if (index !== -1) {
        socialPageForm.domains.splice(index, 1)
    }
}

const addDomain = () => {
    socialPageForm.domains.push({
        key: Date.now(),
        value: '',
    })
}

</script>
<style lang="scss" scoped>
.titleContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;

    .hover-icon {
        display: flex;
    }

    .icon {
        width: 20px;
    }

    .info {
        display: block;
    }

    .hover {
        display: none;
    }

    .del {
        margin-left: 10px;
    }

    .drag:hover,
    .del:hover {
        .info {
            display: none;
        }

        .hover {
            display: block;
        }
    }
}

.mainPage {
    :deep(.el-form-item__content) {
        display: flex;
        justify-content: space-between;

        .el-input {
            width: 95%;
        }

        .delPage {
            width: 20px;
        }
    }
}

.list-container {
    line-height: 40px;
    margin-bottom: 20px;
    margin-left: 20px;
}

.module-list {
    display: flex;
    flex-wrap: wrap;

    li {
        display: flex;
        align-items: center;
        border: 1px dashed #c1c6cc;
        border-radius: 1px;
        height: 65px;
        line-height: 65px;
        margin: 0 13px 14px 0;
        opacity: .9;
        text-align: center;
        width: 190px;

        p {
            margin-left: 8px;
        }

        &:hover {
            background: rgba(93, 213, 200, .05);
            border: 1px dashed #5dd5c8;
            color: #5dd5c8;
            cursor: pointer;
        }
    }
}
</style>

<style lang="scss">
.dragContent {

    // &>.sortable-ghost {
    &>.sortable-chosen {
        background: hsla(0, 0%, 100%, .9);
        border-radius: 8px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .08);
    }
}
</style>