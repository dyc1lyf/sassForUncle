import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const CodeKey = 'Admin-Code'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCode() {
  return Cookies.get(CodeKey)
}

export function setCode(Code) {
  return Cookies.set(CodeKey, Code)
}
 
export function removeCode() {
  return Cookies.remove(CodeKey)
}
