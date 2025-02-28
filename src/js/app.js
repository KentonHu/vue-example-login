// 修复后的入口配置
import { createApp } from "vue";
import App from "../component/App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createStore } from "vuex";
import Login from "../component/Login.vue";
import UserInfo from "../component/UserInfo.vue";

// 先创建应用实例 ✅
const app = createApp(App);

// 后配置路由和状态管理 ✅
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/user_info",
      component: UserInfo,
    },
  ],
});
const store = createStore({
  /*...*/
});

// 正确挂载插件 ✅
app.use(router).mount("#app");

