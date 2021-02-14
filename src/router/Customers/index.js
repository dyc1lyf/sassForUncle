import Home from "@/components/Home/index.vue";

// 模块ID
const indexMap = {
  'newHouse': 1,            // 新房
  'secondHouse': 2,            // 二手房
  'rent': 3,            // 租房
  
}

// 收集子路由依赖
const requireCompinent = require.context('.',true,/\.js/);
const flieArr = requireCompinent.keys();
let customersChildRouterList = new Array(flieArr.length - 1).fill(null);
let resRouterList;
flieArr.forEach(fileName=>{
    if(fileName != './index.js'){
        const config = requireCompinent(fileName);
        customersChildRouterList[indexMap[config.default.name] - 1] = config.default.route;
    }
})
// 收集数组展平
resRouterList = customersChildRouterList.flat();

const customersRouterList = {
  path: '/customers',
  component: Home,
  meta: {
    title: 'customers',
    icon: 'el-icon-suitcase',
    roles: ['sysme']
  },
  alwaysShow: true,
  children: [
    ...resRouterList
  ]
}

export default {
    name:'customers',
    route: customersRouterList
}