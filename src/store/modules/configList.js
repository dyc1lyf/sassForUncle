// 获取配置的接口
import {
  getArea,
  getDemandData
} from '@/api/api.config'
const configList = {
  namespaced: true,
  state:{
    province: [],
    city: [],
    district: [],
    demandData: {}
  },
  mutations:{
    updateArea(state, payload){
      // console.log(payload)
      state[payload.text] = payload.data
    },
    updateDemandData(state, payload){
      state.demandData = null
      state.demandData = payload
    },
  },
  getters: {
    /**
     * @description 返回当前的主题信息
     * @param {Object} state state
     */
    _BackDemandData(state) {
      return state.demandData
    }
  },
  actions:{
    // 获取省市县 @payload { text 修改参数名称， data值 }
    _GetArea ({ commit }, payload) {
      let { text, areaId } = payload
      getArea({ type:areaId }).then(res=>{
        commit('updateArea', {
          text: text,
          data: res.data
        })
      })
    },
    // 获取筛选项 @payload { text 修改参数名称， data值 }
    _GetDemandData ({ commit }, payload,) {
      getDemandData(payload).then(res=>{
          commit('updateDemandData', res.data)
      })
    }
  }
}
export default configList;
