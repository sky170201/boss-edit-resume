<template>
    <div class="resume-content">
        <div class="form-nav-header">
            <div @click="back" class="go-back">
                <img src="@/assets/images/back.png">
                <p>返回草稿列表</p>
            </div>
            <div class="rename-btn-box">
                <h6>{{ resumeName }}</h6>
                <img @click="open" src="@/assets/images/edit.png" class="rename-btn">
            </div>
            <el-select class="language-box" v-model="language" placeholder="Select">
                <el-option v-for="item in langOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="list-group">
            <PersonInfo @handleChange="handleChange" />
            <DragContent @handleChange="handleChange" />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="重命名简历">
        <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="name" label=" " :label-width="formLabelWidth">
                <el-input v-model="form.name" maxlength="30" show-word-limit />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submitForm(formRef)">
                    确认修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import PersonInfo from './PersonInfo.vue'
import DragContent from './DragContent.vue'
import mitt from '@/utils/mitt'

const handleChange = (data) => {
    mitt.emit('handleChange')
}

const router = useRouter()

const langOptions = ref([
    { value: 'zh', label: '中文' }
])

const back = () => {
    router.push({
        path: '/'
    })
}

const language = ref('zh')

const resumeName = ref('张三-前端开发工程师')

const open = () => {
    form.name = resumeName.value
    dialogFormVisible.value = true
}

const formRef = ref(null)
const dialogFormVisible = ref(false)
const formLabelWidth = '0px'

const form = reactive({
    name: '',
})
const rules = reactive({
    name: [
        { required: true, message: '请输入简历名', trigger: 'blur' },
    ]
})

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            resumeName.value = form.name
            dialogFormVisible.value = false
        }
    })
}


</script>

<style lang="scss">
.form-nav-header,
.rename-btn-box {
    align-items: center;
    display: flex;
}

.resume-content {
    background: #fff;
    box-shadow: 0 5px 20px 0 rgba(17, 30, 54, .08);
    margin-bottom: 50px;
    min-height: 100vh;
    position: relative;
    width: 50%;

    .form-nav-header {
        background: #fff;
        box-shadow: inset 0 -1px 0 0 rgba(230, 232, 235, .5);
        height: 50px;
        left: 0;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 2;

        .go-back {
            display: flex;
            align-items: center;
            color: #24272e;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            margin-left: 34px;
            position: absolute;
            z-index: 10;

            img {
                height: 20px;
                width: 20px;
            }
        }

        .rename-btn-box {
            justify-content: center;
            position: absolute;
            width: 100%;

            h6 {
                color: #24272e;
                font-size: 16px;
                font-weight: 500;
                line-height: 22px;
            }

            .rename-btn {
                cursor: pointer;
                height: 18px;
                margin-left: 10px;
                width: 18px;
            }
        }

        .language-box {
            position: absolute;
            right: 40px;
            width: 92px;
        }
    }

    .list-group {
        padding: 20px;
    }
}
</style>
  