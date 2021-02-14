// 知识库片区库相关
const secondHouseRouterMap = [
    {
        path: '/cooperation/secondHouse',
        component: resolve => require( ['@/views/Cooperation/secondHouse'],resolve),
        name: 'cooperationSecondHouse',
        meta: {
            title: 'cooperationSecondHouse',
            // icon: 'users',
            roles: ['sysme']
        }
    },
    {
        hidden: true,
        path: '/cooperation/secondHouse/details',
        component: resolve => require( ['@/views/Cooperation/secondHouse/details'],resolve),
        name: 'cooperationSecondHouseDetails',
        // meta: { title: 'secondHouseInfo', icon: 'kinfo', roles: ['house'] }
        meta: { title: 'cooperationSecondHouseDetails', roles: ['sysme'] }
    },
]

export default {
    name:'secondHouse',
    route: secondHouseRouterMap
}