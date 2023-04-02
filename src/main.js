import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./element/index.scss";
import "./element/global.scss";

// 初始化css
import "normalize.css/normalize.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Vue3Tinymce from "@jsdawn/vue3-tinymce";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(store).use(router).use(ElementPlus).use(Vue3Tinymce).mount("#app");
