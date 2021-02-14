// 知识库片区库相关
const transferRouterMap = [
    {
        path: '/service/transfer',
        component: resolve => require( ['@/views/Service/Transfer'],resolve),
        name: 'serviceTransfer',
        meta: {
            title: 'serviceTransfer',
            // icon: 'users',
            roles: ['sysme']
        }
    }
]

export default {
    name:'transfer',
    route: transferRouterMap
}