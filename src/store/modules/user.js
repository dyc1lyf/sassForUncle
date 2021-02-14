import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getCode, setCode, removeCode } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: getCode(),
    token: getToken(),
    userId: 0,
    name: '',
    avatar: '',
    introduction: '',
    userInfo: {},
    storeInfo: {},
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_STOREINFO: (state, storeInfo) => {
      state.storeInfo = storeInfo
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_UserId: (state, id) => {
      state.userId = id
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          commit('SET_CODE', data.AccessCode)
          commit('SET_USERINFO', data)
          setToken(response.data.token)
          setCode(response.data.AccessCode)
          // 储存用户信息
          localStorage.setItem('userInfo', JSON.stringify(data));
          
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.code).then(response => {
          const data = response.data
          data.roles = ['sysme']
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          // 储存门店
          localStorage.setItem('storeInfo', JSON.stringify(data));

          
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          // commit('SET_UserId', data.userId)
          resolve(response)
        }).catch(error => {
          reject(error)
        }) 
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_CODE', '')
          commit('SET_ROLES', [])
          commit('SET_UserId', 0)
          removeToken()
          removeCode()
          // 清除本地存储信息
          localStorage.removeItem('userInfo');
          localStorage.removeItem('storeInfo');
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_CODE', '')
        commit('SET_ROLES', [])
        commit('SET_UserId', 0)
        removeToken()
        removeCode()
        // 清除本地存储信息
        localStorage.removeItem('userInfo');
        localStorage.removeItem('storeInfo');
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_UserId', data.userId)
          resolve()
        })
      })
    }
  }
}

export default user
