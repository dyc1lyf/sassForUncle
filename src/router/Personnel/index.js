import Home from "@/components/Home/index.vue";

// 模块ID
const indexMap = {
  'agent': 1,            // 经纪人管理
  'recruit': 2,            // 招聘信息
  
}

// 收集子路由依赖
const requireCompinent = require.context('.',true,/\.js/);
const flieArr = requireCompinent.keys();
let personnelChildRouterList = new Array(flieArr.length - 1).fill(null);
let resRouterList;
flieArr.forEach(fileName=>{
    if(fileName != './index.js'){
        const config = requireCompinent(fileName);
        personnelChildRouterList[indexMap[config.default.name] - 1] = config.default.route;
    }
})
// 收集数组展平
resRouterList = personnelChildRouterList.flat();

const personnelRouterList = {
  path: '/personnel',
  component: Home,
  meta: {
    title: 'personnel',
    icon: 'el-icon-lx-people',
    roles: ['sysme']
  },
  alwaysShow: true,
  children: [
    ...resRouterList
  ]
}

export default {
    name:'personnel',
    route: personnelRouterList
}