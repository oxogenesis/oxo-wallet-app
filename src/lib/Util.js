import { SYSTEM_MEDIA_ISSUER, SYSTEM_MEDIA_CODE, SYSTEM_MEDIA_RATE } from './Const'

function CheckId(id_card) {
  let isValid = false
  if (18 === id_card.length) {
    let year = +id_card.substring(6, 10)
    let month = +id_card.substring(10, 12)
    let day = +id_card.substring(12, 14)

    let birthday = new Date(year, month - 1, day)

    if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {
      let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]// 加权因子
      let Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]// 身份证验证位值.10代表X
      // 验证校验位
      let _id_card = Array.from(id_card) // reset: let _id_card = [...id_card]
      if (_id_card[17].toLowerCase() === 'x') {
        _id_card[17] = 10// 将最后位为x的验证码替换为10方便后续操作
      }
      let sum = 0 // 声明加权求和变量
      for (let i = 0; i < 17; i++) {
        sum += Wi[i] * _id_card[i]// 加权求和
      }
      let i = sum % 11// 得到验证码所位置
      if (+_id_card[17] === Y[i]) {
        isValid = true
      }
    }
  }
  return isValid
}

function add0(m) { return m < 10 ? '0' + m : m }

function timestamp_format(timestamp) {
  let time = new Date(timestamp)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()

  timestamp = new Date()
  let tmp = ''
  if (y != timestamp.getFullYear()) {
    tmp += y + '-' + add0(m) + '-' + add0(d) + ' '
  } else {
    tmp += add0(m) + '-' + add0(d) + ' '
  }
  return tmp + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

function format_decimal(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index != -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}

function AddressToName(address_map, address) {
  if (address_map[address] != null) {
    return address_map[address]
  } else {
    return address
  }
}

function DisplaySubject(subject, issuer, address_map) {
  if (issuer == SYSTEM_MEDIA_ISSUER) {
    return SYSTEM_MEDIA_CODE
  } else if (address_map[issuer] != null) {
    return `${subject}.${address_map[issuer]}`
  } else {
    return `${subject}.${issuer}`
  }
}

function AccurateAmount(amount, subject, issuer, subject_list) {
  let rate = GetRate(subject, issuer, subject_list)
  return amount * 1.0 / rate
}

function DisplayAmount(amount, subject, issuer, subject_list) {
  let rate = GetRate(subject, issuer, subject_list)
  return ShowAmount(amount, rate)
}

// !!!return could not jump out of forEach 
function GetRate(subject, issuer, subject_list) {
  if (issuer == SYSTEM_MEDIA_ISSUER) {
    return SYSTEM_MEDIA_RATE
  } else {
    for (let i = 0; i < subject_list.length; i++) {
      const item = subject_list[i]
      if (item.Issuer == issuer && item.Subject == subject) {
        return item.Rate
      }
    }
  }
}

function ShowAmount(amount, rate) {
  if (rate == null) {
    // subject just proclaimed
    return format_decimal(0, 4)
  } else {
    return format_decimal(amount * 1.0 / rate, 4)
  }
}

export {
  CheckId,
  timestamp_format,
  format_decimal,
  AddressToName,
  DisplaySubject,
  AccurateAmount,
  DisplayAmount,
  ShowAmount,
  GetRate
}