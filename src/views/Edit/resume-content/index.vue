<template>
    <div class="resume-content">
        <div class="form-nav-header">
            <div class="go-back">
                <img src="@/assets/images/back.png">
                <p>返回草稿列表</p>
            </div>
            <div class="rename-btn-box">
                <h6>张三-前端开发工程师</h6>
                <img src="@/assets/images/edit.png" class="rename-btn">
            </div>
            <el-select class="language-box" v-model="language" placeholder="Select">
                <el-option v-for="item in langOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="list-group">
            <PersonInfo />
            <DragContent />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import PersonInfo from './PersonInfo.vue'
import DragContent from './DragContent.vue'

const langOptions = ref([
    { value: 'zh', label: '中文' }
])

const language = ref('zh')

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
  