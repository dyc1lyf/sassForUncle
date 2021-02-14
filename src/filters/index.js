// 时间戳串转时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
// 户型处理
export function roomType(data) {
  if(data && data!=''){
    let rooms = data.split(',')
    let size = ''
    rooms.forEach((item,index) => {
      if(index==0){
        size+=item + '室'
      }
      if(index==1){
        size+=item + '厅'
      }
      if(index==2){
        size+=item + '卫'
      }
    });
    return size
  }else{
    return '暂无数据'
  } 
}
// 处理视频问号
export function isPic(data){
  if(data){
      let array = data.split(",")
      for(let i = 0; i < array.length; i ++) {
          array[i] = array[i].split("?")[0]
      }
      return array
  }else{
      return []
  }
}