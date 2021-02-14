// 知识库片区库相关
const secondHouseRouterMap = [
    {
        path: '/customers/secondHouse',
        component: resolve => require( ['@/views/Customers/secondHouse'],resolve),
        name: 'customersSecondHouse',
        meta: {
            title: 'customersSecondHouse',
            // icon: 'users',
            roles: ['sysme']
        }
    },
    // {
    //   hidden: true,
    //   path: '/building/secondHouseInfo/:id',
    //   component: resolve => require( ['./../../views/building/secondHouse/secondHouseInfo/secondHouseInfo'],resolve),
    //   name: 'secondHouseInfo',
    //   // meta: { title: 'secondHouseInfo', icon: 'kinfo', roles: ['house'] }
    //   meta: { title: 'secondHouseInfo', roles: ['house'] }
    // },
]

export default {
    name:'secondHouse',
    route: secondHouseRouterMap
}