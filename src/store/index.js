import Vue from 'vue'
import Vuex from 'vuex'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'
import configList from "./modules/configList"
import createPersistedState from "vuex-persistedstate"

const createPersisted = createPersistedState({
  reducer(val) {
    return {
      // errorLog: val.errorLog,
      // recommendSysGuide: val.recommendSysGuide
    }
  }
})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    errorLog,
    permission,
    user,
    configList
  },
  getters,
  plugins: [createPersisted]
})

export default store
