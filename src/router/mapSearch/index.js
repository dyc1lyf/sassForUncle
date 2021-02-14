import Home from "@/views/mapSearch/index";

// 会员管理
const mapSearchRouterMap = {
    path: '/mapSearch',
    component: Home,
    meta: {
      title: 'mapSearch',
      icon: '',
      roles: ['sysme']
    },
    children: [
      {
        path: '/mapSearch',
        component: Home,
        name: 'mapSearch',
        meta: { title: 'mapSearch', icon: "el-icon-lx-profile", roles: ['sysme'] }
      }
    ]
}

export default {
    name:'mapSearch',
    route: mapSearchRouterMap
}