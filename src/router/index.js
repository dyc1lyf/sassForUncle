import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 其他路由
const otherComponents = [
    {
        path: '/404',
        name: "404",
        component: resolve => require(['../components/404/index'], resolve),
        meta: { title: '404' }
    },
    {
        path: '/403',
        name: "403",
        component: resolve => require(['../components/403/index'], resolve),
        meta: { title: '403' }
    }
];
// 模块ID
const indexMap = {
    'mapSearch': 1,                     // 地图找房
    'house': 2,                     // 房源管理
    'cooperation': 3,                     // 门店合作
    'customers': 4,                     // 客源管理
    'service': 5,                     // 业主服务
    'personnel': 6,                     // 人员管理
    'building': 7,                     // 楼盘管理
    'sysuser': 8,                   // 权限管理
}
const requireComponent = require.context('.', true, /index\.js/);
const flieArr = requireComponent.keys();
let asyncRouterList = new Array(flieArr.length - 1).fill({});
flieArr.forEach(fileName => {
    if (fileName != './index.js') {
        const config = requireComponent(fileName);
        asyncRouterList[indexMap[config.default.name] - 1] = config.default.route;
    }
})
asyncRouterList = asyncRouterList.concat(otherComponents);

export const asyncRouterMap = asyncRouterList;

export const constantRouterMap = [
    // 登录
    {
        path: "/login",
        component: resolve => require(['../views/Login/index'], resolve),
        hidden: true
    },
    {
        path: '/',
        component: resolve => require(['../components/Home/index.vue'], resolve),
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/Dashboard/index.vue'),
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: "el-icon-lx-apps", noCache: true}
            }
        ]
    },
    {
        path: "/tabs",
        component: resolve => require(['@/components/page/Tabs.vue'], resolve),
        hidden: true
    },
    
]


export default new Router({
    routes: constantRouterMap
});
