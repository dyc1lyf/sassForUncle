// 门店管理
const storesRouterMap = [
    {
        path: '/sysuser/stores',
        component: resolve => require( ['@/views/Sysuser/Stores'], resolve),
        name: 'sysuserStores',
        meta: { title: 'sysuserStores', icon: "", roles: ['sysme'] }
    }
]

export default {
    name:'stores',
    route: storesRouterMap
}