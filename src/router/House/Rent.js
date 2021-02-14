// 知识库片区库相关
const rentRouterMap = [
    {
        path: '/house/rent',
        component: resolve => require( ['@/views/House/Rent'],resolve),
        name: 'houseRent',
        meta: {
            title: 'houseRent',
            // icon: 'users',
            roles: ['sysme']
        }
    },
    {
      hidden: true,
      path: '/house/rent/update',
      component: resolve => require( ['@/views/House/Rent/update'],resolve),
      name: 'houseRentUpdate',
      meta: { title: 'houseRentUpdate', roles: ['sysme'] }
    },
    {
        hidden: true,
        path: '/house/rent/details',
        component: resolve => require( ['@/views/House/Rent/details'],resolve),
        name: 'houseRentDetails',
        meta: { title: 'houseRentDetails', roles: ['sysme'] }
    }
]

export default {
    name:'rent',
    route: rentRouterMap
}