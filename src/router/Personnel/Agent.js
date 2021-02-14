// 知识库片区库相关
const agentRouterMap = [
    {
        path: '/personnel/agent',
        component: resolve => require( ['@/views/Personnel/Agent'],resolve),
        name: 'personnelAgent',
        meta: {
            title: 'personnelAgent',
            // icon: 'users',
            roles: ['sysme']
        }
    }
]

export default {
    name:'agent',
    route: agentRouterMap
}