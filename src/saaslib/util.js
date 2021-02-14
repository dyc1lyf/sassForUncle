import axios from 'axios'
import request from '@/utils/request'

let env = process.env.NODE_ENV
let util = {}
util.ajax = {}
util.pageTimer={}; //定义计时器全局变量，便于以后计时器的清除 赋值模拟：pageTimer["timer"] = setInterval(function(){},2000);

let siteDomain = env == 'development' ? '' : window.location.protocol + '//' + window.location.hostname + '/'
util.vars = {
  ajaxUrl: siteDomain
}

util.ajax.get = function (url) {
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url,
      baseURL: util.vars.ajaxUrl,
      withCredentials: true
    }).then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
      // reject(err.response.status+' '+err.response.statusText);
    })
  });

};
util.ajax.post = function (url, params, config) {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url,
      /* data: util.jsonStringify(params),*/
      data: params,
      config,
      baseURL: util.vars.ajaxUrl,
      withCredentials: true

    }).then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
      // reject(err.response.status+' '+err.response.statusText);
    })
  });
};

util.ajax.put = function (url, params, config) {

  return new Promise((resolve, reject) => {
    request({
      method: 'put',
      url,
      /* data: util.jsonStringify(params),*/
      data: params,
      config,
      baseURL: util.vars.ajaxUrl,
      withCredentials: true

    }).then(res => {
      resolve(res)
    })
      .catch(err => {
        reject(err)
        // reject(err.response.status+' '+err.response.statusText);
      })
  });

};


util.ajax.postUpload = function (url, params, callback) {

  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url,
      data: params,
      onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
        if (progressEvent.lengthComputable) {
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          callback(progressEvent);
        }
      },
      baseURL: util.vars.ajaxUrl,
      withCredentials: true

    }).then(res => {
      resolve(res)
    })
  });


};


util.GetParameterUrl = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let urlLink = window.location.href;
  let hrefLink = urlLink.indexOf('?') > -1 ? urlLink.indexOf('#') > -1 ? urlLink.split('?')[1].split('#')[0] : urlLink.split('?')[1] : '';
  let r = hrefLink.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

util.formatTimeNoRightNow = function (timestamp) {

  let nowD = new Date();
  let time = new Date(timestamp);
  let o = {
    "YY": time.getFullYear(),//年份
    "MM": time.getMonth() + 1, //月份
    "dd": time.getDate(), //日
    "hh": time.getHours() % 12 == 0 ? 12 : time.getHours() % 12, //小时
    "HH": time.getHours(), //小时
    "mm": time.getMinutes(), //分
  };
  let nowO = {
    "YY": nowD.getFullYear(),//年份
    "MM": nowD.getMonth() + 1, //月份
    "dd": nowD.getDate(), //日
    "hh": nowD.getHours() % 12 == 0 ? 12 : nowD.getHours() % 12, //小时
    "HH": nowD.getHours(), //小时
    "mm": nowD.getMinutes(), //分
  };
  return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)} ${('0' + o.HH).slice(-2)}:${('0' + o.mm).slice(-2)}`;
};
util.formatTimeNoRightNow2 = function (timestamp) {

  let nowD = new Date();
  let time = new Date(timestamp);
  let o = {
    "YY": time.getFullYear(),//年份
    "MM": time.getMonth() + 1, //月份
    "dd": time.getDate(), //日
    "hh": time.getHours() % 12 == 0 ? 12 : time.getHours() % 12, //小时
    "HH": time.getHours(), //小时
    "mm": time.getMinutes(), //分
    "ss": time.getSeconds(), //秒
  };
  let nowO = {
    "YY": nowD.getFullYear(),//年份
    "MM": nowD.getMonth() + 1, //月份
    "dd": nowD.getDate(), //日
    "hh": nowD.getHours() % 12 == 0 ? 12 : nowD.getHours() % 12, //小时
    "HH": nowD.getHours(), //小时
    "mm": nowD.getMinutes(), //分
    "ss": nowD.getSeconds(), //秒
  };
  return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)} ${('0' + o.HH).slice(-2)}:${('0' + o.mm).slice(-2)}:${('0' + o.ss).slice(-2)}`;
};

util.formatTime = function (timestamp) {

  let nowD = new Date();
  let time = new Date(timestamp);
  let o = {
    "YY": time.getFullYear(),//年份
    "MM": time.getMonth() + 1, //月份
    "dd": time.getDate(), //日
    "hh": time.getHours() % 12 == 0 ? 12 : time.getHours() % 12, //小时
    "HH": time.getHours(), //小时
    "mm": time.getMinutes(), //分
  };
  let nowO = {
    "YY": nowD.getFullYear(),//年份
    "MM": nowD.getMonth() + 1, //月份
    "dd": nowD.getDate(), //日
    "hh": nowD.getHours() % 12 == 0 ? 12 : nowD.getHours() % 12, //小时
    "HH": nowD.getHours(), //小时
    "mm": nowD.getMinutes(), //分
  };
  if (o.YY == nowO.YY && o.MM == nowO.MM && o.dd == nowO.dd && o.HH == nowO.HH) {
    if ((parseInt(nowO.mm) - parseInt(o.mm)) < 10) {
      return '刚刚';
    } else {
      return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)} ${('0' + o.HH).slice(-2)}:${('0' + o.mm).slice(-2)}`;
    }
  }
  else {
    return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)} ${('0' + o.HH).slice(-2)}:${('0' + o.mm).slice(-2)}`;
  }
};

util.isToday=function(date) {
  let time = new Date();
  if (typeof (date) === 'number') {
    time = new Date(date);
  } else {
    let dateFor = date.toString().replace(/\-/g, "/");
    time = new Date(dateFor);
  }

  return new Date().getTime() - time.getTime() < 86400000;
}

util.formatDate = function (date) {

  let dateFor = date.replace(/\-/g, "/");

  let time = new Date(dateFor);
  let nowD = new Date();
  let o = {
    "YY": time.getFullYear(),//年份
    "MM": time.getMonth() + 1, //月份
    "dd": time.getDate(), //日
    "hh": time.getHours() % 12 == 0 ? 12 : time.getHours() % 12, //小时
    "HH": time.getHours(), //小时
    "mm": time.getMinutes(), //分
  };
  let nowO = {
    "YY": nowD.getFullYear(),//年份
    "MM": nowD.getMonth() + 1, //月份
    "dd": nowD.getDate(), //日
    "hh": nowD.getHours() % 12 == 0 ? 12 : nowD.getHours() % 12, //小时
    "HH": nowD.getHours(), //小时
    "mm": nowD.getMinutes(), //分
  };


  if (o.YY == nowO.YY) {

    if (o.MM == nowO.MM) {

      let hTotal = (nowO.dd - o.dd) * 24 + Math.abs(nowO.HH - o.HH);


      if (hTotal > 72 && hTotal < 96) {

        return '三天前';

      } else if (hTotal < 72 && hTotal > 48) {

        return '两天前';

      } else if (hTotal > 24 && hTotal < 48) {

        return '昨天';

      } else if (hTotal < 24 && hTotal > 3) {

        return '今天';

      } else if (hTotal <= 3 && hTotal > 2) {

        return '2小时前';

      } else if (hTotal <= 2 && hTotal > 1) {

        return '1小时前';

      } else if (hTotal == 0 && (parseInt(nowO.mm) - parseInt(o.mm)) > 10) {

        return (parseInt(nowO.mm) - parseInt(o.mm)) + '分钟前'

      } else if ((parseInt(nowO.mm) - parseInt(o.mm)) < 10) {

        return '刚刚';

      } else {

        return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)}`;

      }


    } else {

      return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)}`;


    }

  } else {

    return `${o.YY}-${('0' + o.MM).slice(-2)}-${('0' + o.dd).slice(-2)}`;

  }


};

//格式化日期为：yyyyMMdd HH:mm:ss 
// var crtTime = new Date(value); let formatdata=util.dateFtt("yyyy-MM-dd hh:mm:ss",crtTime);//直接调用公共JS里面的时间类处理的办法    
util.dateFtt = function (fmt, date) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
util.jsonStringify = function (arg) {
  let qsArr = [];
  for (let k in arg) {
    let v = arg[k];
    qsArr.push({
      name: k,
      value: ("" + v).toString()
    })
  }
  for (let i = 0; i < qsArr.length; i++) {
    qsArr[i] = [qsArr[i].name, qsArr[i].value].join('=')
  }
  return qsArr.join('&');
};

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
}

util.getBase64 = function (imgUrl) {
  var image = new Image();
  image.crossOrigin = '';
  image.src = imgUrl;
  image.onload = function () {
    var base64 = getBase64Image(image);
    // console.log(base64)
  }

};

/**
* 节流函数：每隔某个时间段去执行某个函数，防止函数的过多执行
* leading：（Boolean）是否立即执行
* trailing： （Boolean）wait期间如果有再次调用，是否会在“周期后边缘（wait结束）”再次执行
* leading= true；trailing：true：调用立即执行一次，wait期间如果有再次调用，在周期后边缘再次执行
* leading= true；trailing：false：调用立即执行一次，wait期间如果有再次调用，在周期后边缘不会执行
* leading= false；trailing：true：调用需要等待wait时间，wait期间如果再次调用，在周期后边缘再次执行
* leading= false；trailing：false：调用需要等待wait时间，wait期间如果再次调用，在周期后边缘不会执行
*/
util.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var now = new Date();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};

/**
 * 防抖函数：当一个函数在一定间隔内没有被调用时，才允许执行被调用方法。
 * func：要执行的函数； wait：执行函数之间的间隔； immediate：首次触发是否立即执行一次；
*/
const restArguments = function (func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};
const delay = restArguments(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

util.debounce = function (func, wait, immediate) {
  var timeout, result;
  var later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

/**
 * 去除输入字符串中特殊字符
 */
// const filterSpecialReg =/\W/gi;
const filterSpecialReg = new RegExp("[`~!@#$^&%_\\+\\=\\-\\*\\.&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", "g");
const filterLetter = /[a-zA-Z\u4E00-\u9FA5]/gi;
util.filterSpecialWord = function (nowWordStr, saveLetter) {
  if (saveLetter) {
    let noLetterStr = nowWordStr.replace(filterLetter, "")
    return noLetterStr.replace(filterSpecialReg, "")
  } else {
    return nowWordStr.replace(filterSpecialReg, "")
  }

}
/**
 * 计算2个日期字符串之间的天数
 * 例如计算2018-09-09至2018-10-10相差的天数：util.dateDiff('2018-09-09','2018-10-10')
 */
util.dateDiff = function (startDate, endDate) {
  var aDate, oDate1, oDate2, iDays;
  aDate = startDate.split('-');
  oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
  aDate = endDate.split('-');
  oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
  return iDays;
}
// 比较2个日期的大小 util.dateCompare('2015-10-12','2015-10-11'); 
util.dateCompare = function (date1, date2) {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if (oDate1.getTime() >= oDate2.getTime()) {//转换成毫秒进行比较
    //      console.log('第一个大');
    return false;
  } else {
    //      console.log('第二个大');
    return true;
  }
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
使用方法:
生成3-32位随机串：randomWord(true, 3, 32)
生成43位随机串：randomWord(false, 43)
*/
util.randomWord = function (randomFlag, min, max) {
  let rstr = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    rstr += arr[pos];
  }
  return rstr;
};
//增加特定天数
util.getNewData=function(dateTemp, days) {  
  var dateTemp = dateTemp.split("-");  
  var nDate = new Date(dateTemp[0] + '-' + dateTemp[1] + '-' + dateTemp[2]); //转换为MM-DD-YYYY格式    
  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);  
  var rDate = new Date(millSeconds);  
  var year = rDate.getFullYear();  
  var month = rDate.getMonth() + 1;  
  if (month < 10) month = "0" + month;  
  var date = rDate.getDate();  
  if (date < 10) date = "0" + date;  
  return (year + "-" + month + "-" + date);  
}
/*数组元素上移 下移BEGIN */
function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

// 上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
util.moveUp=function(arr, index) {
  swapArray(arr, index, index - 1);
}

// 下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
util.moveDown=function(arr, index) {
  swapArray(arr, index, index + 1);
}

//数字转中文
util.toChinesNum = (num) => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; 
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
  　　let strArr = temp.toString().split("").reverse();
  　　let newNum = "";
  　　for (var i = 0; i < strArr.length; i++) {
    　　newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
  　　}
   　 return newNum;
 }
 let overWan = Math.floor(num / 10000);
 let noWan = num % 10000;
 if (noWan.toString().length < 4) {
　　　　　　noWan = "0" + noWan;
　　　 }
 return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num)=='一十'?'十':getWan(num);
}

//数组元素排序:arr1.sort(util.sortBy('age'),true)
util.sortBy=(attr,rev)=>{
  //第二个参数没有传递，默认升序排列
  if(!rev){
    rev=1;
  }
  else{
    rev=(rev)?1:-1
  }
  return function(a,b){
     a=a[attr]
     b=b[attr]
     if(a<b){
       return rev*-1
     }
     if(a>b){
       return rev*1
     }
     return 0
  }
}

//浮点数加法运算
util.FloatAdd=(arg1,arg2)=>{
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  return (arg1*m+arg2*m)/m;
} 

//浮点数除法运算
util.FloatDiv=(arg1,arg2)=>{
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
   
  r1=Number(arg1.toString().replace(".",""));
  r2=Number(arg2.toString().replace(".",""));
  return Math.pow(10,t2-t1)*(r1/r2); 
}

/*数组元素上移 下移END  */
export default util;