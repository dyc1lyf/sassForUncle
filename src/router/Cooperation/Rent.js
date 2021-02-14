// 知识库片区库相关
const rentRouterMap = [ 
    {
        path: '/cooperation/rent',
        component: resolve => require( ['@/views/Cooperation/Rent'],resolve),
        name: 'cooperationRent',
        meta: {
            title: 'cooperationRent',
            // icon: 'users',
            roles: ['sysme']
        }
    },
    {
        hidden: true,
        path: '/cooperation/rent/details',
        component: resolve => require( ['@/views/Cooperation/Rent/details'],resolve),
        name: 'cooperationRentDetails',
        meta: { title: 'cooperationRentDetails', roles: ['sysme'] }
    }
]

export default {
    name:'rent',
    route: rentRouterMap
}