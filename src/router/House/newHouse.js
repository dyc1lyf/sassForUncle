// 知识库片区库相关
const newHouseRouterMap = [
    {
        path: '/house/newHouse',
        component: resolve => require( ['@/views/House/newHouse'],resolve),
        name: 'houseNewHouse',
        meta: {
            title: 'houseNewHouse',
            // icon: 'users',
            roles: ['sysme']
        }
    }
]

export default {
    name:'newHouse',
    route: newHouseRouterMap
}