<template>
    <div class="resume-userinfo">
        <div class="blockTitle" style="padding-left: unset;">个人信息</div>
        <el-form :model="form" label-position="top" label-width="120px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <!-- <el-form-item label=""> -->
                    <el-upload class="header-upload" action=" " :auto-upload="false" :show-file-list="false"
                        v-model="form.avatar" :on-change="onChangeUpload">
                        <!-- :before-upload="beforeAvatarUpload" -->
                        <!-- <span>上传新头像</span> -->
                        <div class="header-box">
                            <div class="header-mask"></div>
                            <img v-if="imageUrl" :src="imageUrl" class="header-img" />
                            <img v-else="imageUrl" src="@/assets/images/header-img.png" class="header-img" />
                        </div>
                        <div class="header-upload-text">
                            <el-link :underline="false" v-if="!imageUrl" type="primary">上传新头像</el-link>
                            <el-link style="margin-bottom: 10px;" :underline="false" v-if="imageUrl"
                                type="primary">编辑</el-link>
                            <el-link @click.stop="deleteAvatar" :underline="false" v-if="imageUrl" type="info">删除</el-link>
                        </div>
                    </el-upload>
                    <!-- </el-form-item> -->
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="期望职位">
                        <el-select v-model="form.position" placeholder="请选择">
                            <el-option label="前端开发工程师" value="F" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-form-item label="性别">
                        <el-select v-model="form.gender" placeholder="请选择">
                            <el-option label="男" value="male" />
                            <el-option label="女" value="female" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="参加工作时间">
                        <el-date-picker v-model="form.workDate" type="month" placeholder="请选择" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-form-item label="生日">
                        <el-date-picker v-model="form.birthday" type="month" placeholder="请选择" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" />
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-form-item label="电话">
                        <el-input v-model="form.phone" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="微信号">
                        <el-input v-model="form.wxNo" />
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-form-item label="期望城市">
                        <el-cascader v-model="form.forwardCity" :options="cityList" :show-all-levels="false" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
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
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-form-item label="籍贯">
                        <el-cascader v-model="form.native" :options="cityList" :show-all-levels="false" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="政治面貌">
                        <el-select v-model="form.polityStatus" placeholder="请选择">
                            <el-option label="非党员" value="NP" />
                            <el-option label="共产党员" value="YP" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11"></el-col>
            </el-row>
        </el-form>
        <div class="setting">
            <el-link type="primary">信息管理</el-link>
            <el-icon color="#00bebd">
                <Setting />
            </el-icon>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { cityList, salaryStartList, salaryEndList } from './common'

// do not use same name with ref
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
</style>