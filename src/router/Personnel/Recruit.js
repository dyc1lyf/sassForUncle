// 知识库片区库相关
const recruitRouterMap = [
    {
        path: '/personnel/recruit',
        component: resolve => require( ['@/views/Personnel/Recruit'],resolve),
        name: 'personnelRecruit',
        meta: {
            title: 'personnelRecruit',
            // icon: 'users',
            roles: ['sysme']
        }
    }
]

export default {
    name:'recruit',
    route: recruitRouterMap
}