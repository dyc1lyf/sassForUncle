// 角色管理
const roleRouterMap = [
    {
        path: '/sysuser/role',
        component: resolve => require( ['@/views/Sysuser/Role'],resolve),
        name: 'sysuserRole',
        meta: {
            title: 'sysuserRole',
            // icon: 'users',
            roles: ['sysme']
        }
    }
]

export default {
    name:'role',
    route: roleRouterMap
}