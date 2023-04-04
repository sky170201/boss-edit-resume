<template>
    <div class="resume-userinfo">
        <div class="blockTitle" style="padding-left: unset;">个人信息</div>
        <el-form :model="form" label-position="top" label-width="120px">
            <!-- <el-form-item label="姓名">
                <el-input v-model="form.name" />
            </el-form-item>
            <div class="el-form-item">
                <el-upload class="header-upload" action=" " :auto-upload="false" :show-file-list="false"
                    v-model="form.avatar" :on-change="onChangeUpload">
                    <div class="header-box">
                        <div class="header-mask"></div>
                        <img v-if="imageUrl" :src="imageUrl" class="header-img" />
                        <img v-else src="@/assets/images/header-img.png" class="header-img" />
                    </div>
                    <div class="header-upload-text">
                        <el-link :underline="false" v-if="!imageUrl" type="primary">上传新头像</el-link>
                        <el-link style="margin-bottom: 10px;" :underline="false" v-if="imageUrl"
                            type="primary">编辑</el-link>
                        <el-link @click.stop="deleteAvatar" :underline="false" v-if="imageUrl" type="info">删除</el-link>
                    </div>
                </el-upload>
            </div>
            <el-form-item label="期望职位">
                <el-select v-model="form.position" placeholder="请选择">
                    <el-option label="前端开发工程师" value="F" />
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择">
                    <el-option label="男" value="male" />
                    <el-option label="女" value="female" />
                </el-select>
            </el-form-item>
            <el-form-item label="参加工作时间">
                <el-date-picker v-model="form.workDate" type="month" placeholder="请选择" style="width: 100%" />
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker v-model="form.birthday" type="month" placeholder="请选择" style="width: 100%" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="微信号">
                <el-input v-model="form.wxNo" />
            </el-form-item>
            <el-form-item label="期望城市">
                <el-cascader v-model="form.forwardCity" :options="cityList" :show-all-levels="false" />
            </el-form-item>
            <el-form-item label="薪资要求">
                <el-col :span="11">
                    <el-select v-model="form.salaryStart" placeholder="请选择">
                        <el-option v-for="item in salaryStartList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
                <el-col :span="2" style="text-align: center;">
                    <span class="text-gray-500">至</span>
                </el-col>
                <el-col :span="11">
                    <el-select v-model="form.salaryEnd" placeholder="请选择">
                        <el-option v-for="item in salaryEndList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="籍贯">
                <el-cascader v-model="form.native" :options="cityList" :show-all-levels="false" />
            </el-form-item>
            <el-form-item label="政治面貌">
                <el-select v-model="form.polityStatus" placeholder="请选择">
                    <el-option label="非党员" value="NP" />
                    <el-option label="共产党员" value="YP" />
                </el-select>
            </el-form-item> -->
            <template v-for="item in showFormConfig.filter(_ => _.isShow)">
                <el-form-item :key="item.name" v-if="!item.ele" :label="item.label">
                    <el-input v-if="item.type === 'input'" v-model="form[item.name]" />
                    <el-select v-if="item.type === 'select'" v-model="form[item.name]" placeholder="请选择">
                        <el-option v-for="itey in item.options" :key="itey.value" :label="itey.label"
                            :value="itey.value" />
                    </el-select>
                    <el-date-picker v-if="item.type === 'date'" v-model="form[item.name]" :type="item.dateType" placeholder="请选择" style="width: 100%" />
                    <el-cascader v-if="item.type === 'cascader'" v-model="form[item.name]" :options="item.options" :show-all-levels="false" />
                    <template v-if="item.name === 'salary'">
                        <el-col :span="11">
                            <el-select v-model="form[item['key'][0]]" placeholder="请选择">
                                <el-option v-for="itey in item.options[0]" :key="itey.value" :label="itey.label"
                                    :value="itey.value" />
                            </el-select>
                        </el-col>
                        <el-col :span="2" style="text-align: center;">
                            <span class="text-gray-500">至</span>
                        </el-col>
                        <el-col :span="11">
                            <el-select v-model="form[item['key'][1]]" placeholder="请选择">
                                <el-option v-for="itey in item.options[1]" :key="itey.value" :label="itey.label"
                                    :value="itey.value" />
                            </el-select>
                        </el-col>
                    </template>
                </el-form-item>
                <div v-else :key="item.name" class="el-form-item">
                    <el-upload class="header-upload" action=" " :auto-upload="false" :show-file-list="false"
                        v-model="form.avatar" :on-change="onChangeUpload">
                        <!-- :before-upload="beforeAvatarUpload" -->
                        <!-- <span>上传新头像</span> -->
                        <div class="header-box">
                            <div class="header-mask"></div>
                            <img v-if="imageUrl" :src="imageUrl" class="header-img" />
                            <img v-else src="@/assets/images/header-img.png" class="header-img" />
                        </div>
                        <div class="header-upload-text">
                            <el-link :underline="false" v-if="!imageUrl" type="primary">上传新头像</el-link>
                            <el-link style="margin-bottom: 10px;" :underline="false" v-if="imageUrl"
                                type="primary">编辑</el-link>
                            <el-link @click.stop="deleteAvatar" :underline="false" v-if="imageUrl" type="info">删除</el-link>
                        </div>
                    </el-upload>
                </div>
            </template>
        </el-form>
        <div @click="openSetting" class="setting">
            <el-link :underline="false" type="primary">信息管理</el-link>
            <el-icon color="#00bebd">
                <Setting />
            </el-icon>
        </div>
        <el-dialog
            v-model="dialogVisible"
            title="信息管理"
            width="504px"
        >
        <template #header>
            <div style="color: #12141a; font-weight: 600; font-size: 20px;">
                信息管理
            </div>
        </template>
        <!-- :before-close="handleClose" -->
            <div class="infoManage">
                <div class="content-block">
                    <span class="block-label">已隐藏</span>
                    <div class="block-box">
                        <div @click="addItem(item.name)" v-for="item in dialogShowFormConfig.filter(_ => !_.isShow)" :key="item.name" class="block-item">
                            <div class="img add-img"></div>
                            <span>{{ item.label }}</span>
                        </div>
                    </div>
                </div>
                <div class="content-block">
                    <span class="block-label">已展示</span>
                    <div class="block-box">
                        <div @click="removeItem(item.name)" v-for="item in dialogShowFormConfig.filter(_ => _.isShow)" :key="item.name" class="block-item">
                            <div :class="item.name === 'name' ? 'img' : 'img remove-img'"></div>
                            <span>{{ item.label }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { cityList, salaryStartList, salaryEndList } from './common'

const form = reactive({
    name: '',
    avatar: '',
    position: '',
    gender: '',
    workDate: '',
    birthday: '',
    email: '',
    phone: '',
    wxNo: '',
    forwardCity: '',
    salaryStart: '',
    salaryEnd: '',
    native: '',
    polityStatus: '',
})

const imageUrl = ref('')

const onChangeUpload = (
    uploadFile,
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

// 删除头像
const deleteAvatar = () => {
    form.avatar = ''
    imageUrl.value = ''
}

const showFormConfig = ref([
    {name: 'name', label: '姓名', type: 'input', ele: false, isShow: true},
    {name: 'avatar', label: '头像', type: '', ele: true, isShow: true},
    {name: 'position', label: '期望职位', type: 'select', ele: false, isShow: true, options: [{value: 'F', label: '前端开发工程师'}]},
    {name: 'gender', label: '性别', type: 'select', ele: false, isShow: true, options: [{value: 'male', label: '男'}, {value: 'female', label: '女'}]},
    {name: 'workDate', label: '参加工作时间', type: 'date', dateType: 'month', ele: false, isShow: true},
    {name: 'birthday', label: '生日', type: 'date', dateType: 'month', ele: false, isShow: true},
    {name: 'email', label: '邮箱', type: 'input', ele: false, isShow: true},
    {name: 'phone', label: '电话', type: 'input', ele: false, isShow: true},
    {name: 'wxNo', label: '微信号', type: 'input', ele: false, isShow: true},
    {name: 'forwardCity', label: '期望城市', type: 'cascader', ele: false, isShow: true, options: cityList},
    {name: 'salary', key: ['salaryStart', 'salaryEnd'], label: '薪资要求', type: '', ele: false, isShow: true, options: [salaryStartList, salaryEndList]},
    {name: 'native', label: '籍贯', type: 'cascader', ele: false, isShow: true, options: cityList},
    {name: 'polityStatus', label: '政治面貌', type: 'select', ele: false, isShow: true, options: [{value: 'NP', label: '非党员'}, {value: 'YP', label: '共产党员'}]},
])

const dialogVisible = ref(false)
const dialogShowFormConfig = ref([])

// 打开配置弹窗
const openSetting = () => {
    dialogShowFormConfig.value = JSON.parse(JSON.stringify(showFormConfig.value))
    dialogVisible.value = true
}

// 添加
const addItem = (name) => {
    dialogShowFormConfig.value.forEach(_ => {
        if (_.name === name) {
            _.isShow = true
        }
    })
}
// 删除
const removeItem = (name) => {
    if (name === 'name') return
    dialogShowFormConfig.value.forEach(_ => {
        if (_.name === name) {
            _.isShow = false
        }
    })
}
// 保存
const save = () => {
    showFormConfig.value = JSON.parse(JSON.stringify(dialogShowFormConfig.value))
    dialogVisible.value = false
}

</script>

<style lang="scss" scoped>
.resume-userinfo {
    margin-bottom: 0;
    padding: 20px;

    .setting {
        display: flex;
        align-items: center;

        .el-link {
            margin-right: 5px;
        }
    }
}
</style>
<style lang="scss">
.resume-userinfo {
    .el-form {
        display: grid;
        grid-template-columns: 45% 45%;
        grid-column-gap: 50px;
    }
}
.header-upload {
    display: flex;
    position: relative;
    height: 100%;

    .el-upload {
        width: 150px;
        display: flex;

        .header-box {
            width: 100%;
            height: 100%;
            flex: 1;
            position: relative;

            .header-mask {
                background-color: hsla(0, 0%, 51%, .8);
                background-image: url('../../../assets/images/sprite.png');
                background-position: center -774px;
                background-repeat: no-repeat;
                cursor: pointer;
                display: none;
                height: 70px;
                left: 0;
                position: absolute;
                top: 0;
                width: 70px;
            }

            .header-img {
                border-radius: 3px;
                display: block;
                height: 70px;
                margin-right: 10px;
                width: 70px;
            }

            &:hover {
                .header-mask {
                    display: block;
                }
            }
        }

        .header-upload-text {
            flex: 1;
            color: red !important;
            align-items: flex-start;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }


}

.infoManage {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
    .content-block {
        display: flex;
        flex-direction: column;
        width: 220px;
        .block-label {
            color: #747680;
            font-size: 12px;
            line-height: 17px;
            margin-bottom: 8px;
        }

        .block-box {
            border: 1px solid #f3f4f5;
            border-radius: 2px;
            flex: 1;
            min-height: 385px;
            padding-bottom: 40px;
            .block-item {
                align-items: center;
                border-bottom: 1px solid #f3f4f5;
                display: flex;
                height: 40px;
                padding-left: 10px;
                .img {
                    background-repeat: no-repeat;
                    background-size: 13px;
                    height: 13px;
                    margin-right: 10px;
                    width: 13px;
                }
                .remove-img {
                    background-image: url('../../../assets/images/remove-icon.png');
                }
                .add-img {
                    background-image: url('../../../assets/images/add-icon.png');
                }
                &:hover {
                    background: #f5f7fa;
                    cursor: pointer;
                    .remove-img {
                        background-image: url('../../../assets/images/remove-icon-hover.png');
                    }
                    .add-img {
                        background-image: url('../../../assets/images/add-icon-hover.png');
                    }
                }
            }
        }
    }
}
</style>