import util from '@/saaslib/util'

//获取省市县列表列表
export function getArea(params) {
  return util.ajax.post(`/api/AppBasis/linkage`, params)
}
//获取筛选项列表
export function getDemandData(params) {
  return util.ajax.post(`/api/Newsapi/filter_more`, {value: params})
}