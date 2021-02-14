//物业级别 S好，A较好，B、C一般，D、E、F较弱，G弱
const propertyLevelArr = [{
    label: '好',
    value: '好'
  },
  {
    label: '较好',
    value: '较好'
  },
  {
    label: '一般',
    value: '一般'
  },
  {
    label: '较弱',
    value: '较弱'
  },
  {
    label: '弱',
    value: '弱'
  },

];
//户型级别 S好，A较好，B、C一般，D、E、F较弱，G弱
const houseTypeArr = [{
    label: '好',
    value: '好'
  },
  {
    label: '较好',
    value: '较好'
  },
  {
    label: '一般',
    value: '一般'
  },
  {
    label: '较弱',
    value: '较弱'
  },
  {
    label: '弱',
    value: '弱'
  },

];
//环线位置
const loopPositionArr = [{
    value: "二环以内",
    label: "二环以内"
  },
  {
    value: "二环到三环",
    label: "二环到三环"
  },
  {
    value: "三环到四环",
    label: "三环到四环"
  },
  {
    value: "四环到五环",
    label: "四环到五环"
  },
  {
    value: "五环到六环",
    label: "五环到六环"
  },
  {
    value: "六环以外",
    label: "六环以外"
  }
]
//配套
const coefficientArr = [{
    value: "很成熟",
    label: "很成熟"
  },
  {
    value: "成熟",
    label: "成熟"
  },
  {
    value: "完善",
    label: "完善"
  },
  {
    value: "一般",
    label: "一般"
  },
  {
    value: "弱",
    label: "弱"
  },

]
//品质 3)	高、中高、中、中低、低
const qualityArr = [{
    value: "高",
    label: "高"
  },
  {
    value: "中高",
    label: "中高"
  },
  {
    value: "中",
    label: "中"
  },
  {
    value: "中低",
    label: "中低"
  },
  {
    value: "低",
    label: "低"
  },

]
//5)	毛坯、简装、精装
const decorationArr = [{
    value: "毛坯",
    label: "毛坯"
  },
  {
    value: "简装",
    label: "简装"
  },
  {
    value: "精装",
    label: "精装"
  },
]
//3)	封闭、半封闭、开放
const closedFlagArr = [{
    value: "封闭",
    label: "封闭"
  },
  {
    value: "半封闭",
    label: "半封闭"
  },
  {
    value: "开放",
    label: "开放"
  },
]
//带星标比较结果下拉框：优、较优、持平、较弱、弱
const starCompareResultArr = [{
    value: "优",
    label: "优"
  },
  {
    value: "较优",
    label: "较优"
  },
  {
    value: "持平",
    label: "持平"
  },
  {
    value: "较弱",
    label: "较弱"
  },
  {
    value: "弱",
    label: "弱"
  },
]
//楼盘性质
const propertyFormatList=[
  {
    value: 1,
    label: "商品住宅"
  },
  {
    value: 2,
    label: "限竞房"
  },
  {
    value: 3,
    label: "经济适用房"
  },
  {
    value: 4,
    label: "共有产权房"
  },
  {
    value: 5,
    label: "商住房"
  },
  {
    value: 6,
    label: "商业综合体"
  },
]
//税费 ②	不满两年、满两年、满五年、满五唯一
const taxationArr=[
  {
    value: "不满两年",
    label: "不满两年"
  },
  {
    value: "满两年",
    label: "满两年"
  },
  {
    value: "满五年",
    label: "满五年"
  },
  {
    value: "满五唯一",
    label: "满五唯一"
  }
]
//户口
const accountArr=[
  {
    value: "有户口",
    label: "有户口"
  },
  {
    value: "无户口",
    label: "无户口"
  }
]
//物业好坏程度 5：物业很好，4：物业好，3：物业一般，2：物业差，1：物业很差
const propertyQualityArr=[
  {
    value: "物业很好",
    label: "物业很好"
  },
  {
    value: "物业好",
    label: "物业好"
  },
  {
    value: "物业一般",
    label: "物业一般"
  },
  {
    value: "物业差",
    label: "物业差"
  },
  {
    value: "物业很差",
    label: "物业很差"
  }, 
]
//小区好坏程度 5：'环境极佳' ，4：'环境很好' ，3：'环境还不错' ，2：'环境一般' ，1：'环境不好'
const environmentArr=[
  {
    value: "环境极佳",
    label: "环境极佳"
  },
  {
    value: "环境很好",
    label: "环境很好"
  },
  {
    value: "环境还不错",
    label: "环境还不错"
  },
  {
    value: "环境一般",
    label: "环境一般"
  },
  {
    value: "环境不好",
    label: "环境不好"
  }, 
]

export {
  propertyLevelArr,
  loopPositionArr,
  coefficientArr,
  qualityArr,
  decorationArr,
  closedFlagArr,
  starCompareResultArr,
  propertyFormatList,
  taxationArr,
  accountArr,
  houseTypeArr,
  propertyQualityArr,
  environmentArr
};
