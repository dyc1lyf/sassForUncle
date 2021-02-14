// 知识库片区库相关
const entrustRouterMap = [
    {
        path: '/service/entrust',
        component: resolve => require( ['@/views/Service/Entrust'],resolve),
        name: 'serviceEntrust',
        meta: {
            title: 'serviceEntrust',
            // icon: 'users',
            roles: ['sysme']
        }
    }
]

export default {
    name:'entrust',
    route: entrustRouterMap
}