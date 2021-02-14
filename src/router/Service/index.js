import Home from "@/components/Home/index.vue";

// 模块ID
const indexMap = {
  'entrust': 1,            // 委托
  'transfer': 2,            // 过户
  
}

// 收集子路由依赖
const requireCompinent = require.context('.',true,/\.js/);
const flieArr = requireCompinent.keys();
let serviceChildRouterList = new Array(flieArr.length - 1).fill(null);
let resRouterList;
flieArr.forEach(fileName=>{
    if(fileName != './index.js'){
        const config = requireCompinent(fileName);
        serviceChildRouterList[indexMap[config.default.name] - 1] = config.default.route;
    }
})
// 收集数组展平
resRouterList = serviceChildRouterList.flat();

const serviceRouterList = {
  path: '/service',
  component: Home,
  meta: {
    title: 'service',
    icon: 'el-icon-service',
    roles: ['sysme']
  },
  alwaysShow: true,
  children: [
    ...resRouterList
  ]
}

export default {
    name:'service',
    route: serviceRouterList
}