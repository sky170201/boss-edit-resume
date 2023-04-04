<template>
    <div class="right-side">
        right-side
    </div>
</template>
<script setup>
import mitt from '@/utils/mitt'
import { onUnmounted } from 'vue';

const handleChange = () => {
    console.log('handleChange');
}
mitt.on('handleChange', handleChange)
onUnmounted(() => {
    mitt.off('handleChange', handleChange)
})

</script>

<style lang="scss">
.right-side {
    background: #f2f5fa;
    bottom: 0;
    color: #fff;
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    z-index: 2;
}
</style>
  