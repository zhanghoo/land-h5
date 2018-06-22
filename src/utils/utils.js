// 格式化时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 查询链接参数
export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.hash.split('?')
    // console.log(r[1])
    if (r[1]) {
        let result = r[1].match(reg)
        // console.log(result, reg)
        if (result != null) {
            return unescape(result[2])
        } else {
            return null
        }
    } else {
        return null
    }
}

// 去掉空格
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
