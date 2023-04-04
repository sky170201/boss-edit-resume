<template>
    <div class="right-side">
        <div class="top">
            <div class="left">
                <img class="save-img routeAround" v-if="isLoading" src="@/assets/images/loading.png">
                <img class="save-img" v-else src="@/assets/images/success.png">
                <p v-if="isLoading">草稿保存中...</p>
                <p v-else>草稿保存成功</p>
            </div>
        </div>
        <div class="preview-add-padding">
            <div class="pdf-container">
                <VuePdf ref="vuePdfRef" v-for="i in numPages" :key="i" :page="i" :src="showUrl" />
            </div>
        </div>
    </div>
</template>
<script setup>
import mitt from '@/utils/mitt'
import { onMounted, onUnmounted, ref } from 'vue';
import VuePdf from 'vue3-pdf'
import axios from 'axios'

const isLoading = ref(false)

const handleChange = (data) => {
    console.log('handleChange', data);
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
}
mitt.on('handleChange', handleChange)
onUnmounted(() => {
    mitt.off('handleChange', handleChange)
})

const vuePdfRef = ref()
const showUrl = ref()
const numPages = ref(1)

onMounted(() => {
    axios({
        url: 'http://localhost:8080/test-resume.pdf',
        method: 'get',
        responseType: 'blob'
    }).then(res => {
        console.log('data', res.data);
        const src = window.URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}))
        showUrl.value = src
        const loadingTask = VuePdf.createLoadingTask(src)
        loadingTask.promise
            .then(p => {
                numPages.value = p.numPages
            })
            .catch(err => {
                console.error('err', err);
            })
    })

})

</script>

<style lang="scss" scoped>
.right-side {
    background: #f2f5fa;
    bottom: 0;
    /* color: #fff; */
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    z-index: 2;

    .top {
        background: #f5f7fa;
        box-shadow: inset 0 -1px 0 0 rgba(230,232,235,.5);
        height: 50px;
        line-height: 50px;
        justify-content: space-between;
        padding: 0 20px;
        .left {
            height: 100%;
            display: flex;
            align-items: center;
            @keyframes rotateLoading {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
            .routeAround {
                animation: rotateLoading 1s ease infinite;
            }
            .save-img {
                height: 14px;
                width: 14px;
            }
            p {
                color: #747680;
                font-family: PingFangSC-Regular,PingFang SC;
                font-size: 12px;
                font-weight: 400;
                line-height: 17px;
                margin-left: 5px;
            }
        }
    }
    .preview-add-padding {
        height: 100%;
        margin: 0 auto;
        padding: 10px 0;
        overflow-y: auto;
        .pdf-container {
            margin: 0 auto;
            overflow-y: auto;
            transform: translateY(0);
            width: 80%;
        }
    }
}
</style>
  