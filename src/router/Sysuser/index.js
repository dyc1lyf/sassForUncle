import Home from "@/components/Home/index.vue";

// 模块ID
const indexMap = {
  'stores': 1,            // 门店管理
  'role': 2,            // 角色管理
  
}

// 收集子路由依赖
const requireCompinent = require.context('.',true,/\.js/);
const flieArr = requireCompinent.keys();
let sysuserChildRouterList = new Array(flieArr.length - 1).fill(null);
let resRouterList;
flieArr.forEach(fileName=>{
    if(fileName != './index.js'){
        const config = requireCompinent(fileName);
        sysuserChildRouterList[indexMap[config.default.name] - 1] = config.default.route;
    }
})
// 收集数组展平
resRouterList = sysuserChildRouterList.flat();

const sysuserRouterList = {
  path: '/sysuser',
  component: Home,
  meta: {
    title: 'sysuser',
    icon: 'el-icon-lx-settings',
    roles: ['sysme']
  },
  alwaysShow: true,
  children: [
    ...resRouterList
  ]
}

export default {
    name:'sysuser',
    route: sysuserRouterList
}