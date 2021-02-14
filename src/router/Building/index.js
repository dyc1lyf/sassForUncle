import Home from "@/components/Home/index.vue";

// 楼盘管理
const buildingRouterMap = { 
    path: '/building',
    component: Home,
    meta: {
      title: 'building',
      icon: 'el-icon-office-building',
      roles: ['sysme']
    },
    children: [
      {
        path: '/building/newHouse',
        component: resolve => require( ['@/views/Building/index'], resolve),
        name: 'buildingNewHouse',
        meta: { title: 'buildingNewHouse', icon: "el-icon-office-building", roles: ['sysme'] }
      },
      {
        hidden: true,
        path: '/building/newHouseInfo',
        component: resolve => require( ['@/views/Building/newHouseInfo/index'], resolve),
        name: 'buildingNewHouseInfo',
        meta: { title: 'buildingNewHouseInfo', icon: "", roles: ['sysme'] }
      },
      
    ]
}

export default {
    name:'building',
    route: buildingRouterMap
}