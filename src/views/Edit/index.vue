<template>
    <el-config-provider :locale="locale">
        <div id="container" class="resume-container">
            <ResumeContent />
            <RightSide />
        </div>
    </el-config-provider>
</template>
  
<script setup>
import { computed, ref } from 'vue'
// @ is an alias to /src
import { ElConfigProvider } from 'element-plus'
import ResumeContent from './resume-content/index.vue'
import RightSide from './right-side/index.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

</script>

<style lang="scss">
.resume-container {
    position: relative;
}
</style>
  