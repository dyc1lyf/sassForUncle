import util from '@/saaslib/util'
import md5 from 'js-md5'
// 登录
export function loginByUsername(username, password) {
  return util.ajax.post('/api/Login',{
    username: username,
    // password: md5(password)
    password: password
  })
}
// 退出登录
export function logout() {
  return util.ajax.get('/api/Login/logout')
}
// 获取权限
export function getUserInfo(code) {
  return util.ajax.get('/api/Getstorecode/gbind_code?bind_code=' + code)
}


