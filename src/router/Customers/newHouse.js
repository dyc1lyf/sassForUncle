// 知识库片区库相关
const newHouseRouterMap = [ 
    {
        path: '/customers/newHouse',
        component: resolve => require( ['@/views/Customers/newHouse'],resolve),
        name: 'customersHewHouse',
        meta: {
            title: 'customersHewHouse',
            // icon: 'users',
            roles: ['sysme']
        }
    },
    // {
    //   hidden: true,
    //   path: '/building/newHouseInfo/:id',
    //   component: resolve => require( ['./../../views/building/newHouse/newHouseInfo/newHouseInfo'],resolve),
    //   name: 'newHouseInfo',
    //   // meta: { title: 'newHouseInfo', icon: 'kinfo', roles: ['house'] }
    //   meta: { title: 'newHouseInfo', roles: ['house'] }
    // },
]

export default {
    name:'newHouse',
    route: newHouseRouterMap
}