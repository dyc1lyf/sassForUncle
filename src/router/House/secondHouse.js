// 知识库片区库相关
const secondHouseRouterMap = [
    {
        path: '/house/secondHouse',
        component: resolve => require( ['@/views/House/secondHouse'],resolve),
        name: 'houseSecondHouse',
        meta: {
            title: 'houseSecondHouse',
            // icon: 'users',
            roles: ['sysme']
        }
    },
    {
      hidden: true,
      path: '/house/secondHouse/update',
      component: resolve => require( ['@/views/House/secondHouse/update'],resolve),
      name: 'houseSecondHouseUpdate',
      // meta: { title: 'secondHouseInfo', icon: 'kinfo', roles: ['house'] }
      meta: { title: 'houseSecondHouseUpdate', roles: ['sysme'] }
    },
    {
        hidden: true,
        path: '/house/secondHouse/details',
        component: resolve => require( ['@/views/House/secondHouse/details'],resolve),
        name: 'houseSecondHouseDetails',
        // meta: { title: 'secondHouseInfo', icon: 'kinfo', roles: ['house'] }
        meta: { title: 'houseSecondHouseDetails', roles: ['sysme'] }
    },
]

export default {
    name:'secondHouse',
    route: secondHouseRouterMap
}