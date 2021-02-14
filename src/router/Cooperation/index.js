import Home from "@/components/Home/index.vue";

// 模块ID
const indexMap = {
  'secondHouse': 1,            // 二手房
  'rent': 2,            // 租房
  
}

// 收集子路由依赖
const requireCompinent = require.context('.',true,/\.js/);
const flieArr = requireCompinent.keys();
let cooperationChildRouterList = new Array(flieArr.length - 1).fill(null);
let resRouterList;
flieArr.forEach(fileName=>{
    if(fileName != './index.js'){
      const config = requireCompinent(fileName);
      cooperationChildRouterList[indexMap[config.default.name] - 1] = config.default.route;
    }
})
// 收集数组展平
resRouterList = cooperationChildRouterList.flat();

const cooperationRouterList = {
  path: '/cooperation',
  component: Home,
  meta: {
    title: 'cooperation',
    icon: 'el-icon-connection',
    roles: ['sysme']
  },
  alwaysShow: true,
  children: [
    ...resRouterList
  ]
}

export default {
    name:'cooperation',
    route: cooperationRouterList
}