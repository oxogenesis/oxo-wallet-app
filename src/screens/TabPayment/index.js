import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button, WhiteSpace } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import RNPickerSelect from 'react-native-picker-select'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

import { SYSTEM_MEDIA_CODE, SYSTEM_MEDIA_RATE, SYSTEM_MEDIA_ID, ISSUER_SUBJECT_AMOUNT, SYSTEM_ACCOUNT_RESERVE, SYSTEM_MEDIA_ISSUER } from '../../lib/Const'
import { ShowAmount, DisplaySubject } from '../../lib/Util'

const TabPaymentScreen = (props) => {
  const target_select_placeholder = {
    label: '请选择接收账号...',
    value: null,
    color: '#9EA0A4',
  }
  const subject_select_placeholder = {
    label: '请选择标的...',
    value: null,
    color: '#9EA0A4',
  }

  const { theme } = useContext(ThemeContext)

  const [target, setTarget] = useState(null)
  const [subject_id, setSubjectId] = useState(null)

  const [amount_display, setAmountDisplay] = useState(null)
  const [amount, setAmount] = useState(0)
  const [rate, setRate] = useState(1)

  const [available, setAvailable] = useState(0)
  const [amount_placeholder, setAmountPlaceholder] = useState(null)
  const [button_flag, setButtonFlag] = useState(true)
  const notice_msg = `如果对方账户尚未激活，至少需要支付${SYSTEM_ACCOUNT_RESERVE / SYSTEM_MEDIA_RATE}个${SYSTEM_MEDIA_CODE}，才能激活...`

  useEffect(() => {
    return props.navigation.addListener('focus', () => {

    })
  })

  const checkTarget = (dest_address) => {
    setTarget(dest_address)
    if (dest_address == null) {
      setSubjectId(null)
    } else {
      setTarget(dest_address)
      setSubjectId(null)
      setButtonFlag(true)

      props.dispatch({
        type: actionType.avatar.InquireDestSubject,
        target: dest_address
      })
    }
  }

  const changeSubject = (si) => {
    setSubjectId(si)
    if (si != null) {
      let slist = props.avatar.get('PayTarget').SubjectList
      for (let i = 0; i < slist.length; i++) {
        let subject = slist[i]
        if (subject.value == si) {
          let available = subject.available
          let rate = subject.rate
          let amount_placeholder = `最大可支付额度为${ShowAmount(available, rate)}`
          setAvailable(available)
          setAmountPlaceholder(amount_placeholder)
          setAmountDisplay(null)
          setAmount(0)
          setRate(rate)
          setButtonFlag(true)
          break
        }
      }
    }
  }

  const checkAmount = (ad) => {
    ad = ad.replace(/[^0123456789.]/g, '').trim()
    // console.log(ad)
    let a = parseInt(ad * rate)
    // console.log(a)
    if (a > available) {
      setAmountDisplay(ShowAmount(available, rate))
      setAmount(available)
      setButtonFlag(false)
    } else if (a > 0) {
      setAmountDisplay(ad)
      setAmount(a)
      setButtonFlag(false)
    } else {
      setAmountDisplay(ad)
      setButtonFlag(true)
    }
  }

  const payment = () => {
    if (target.trim() != '') {
      let [subject, issuer] = subject_id.split('.')
      props.dispatch({
        type: actionType.avatar.Payment,
        dest_address: target,
        issuer: issuer,
        subject: subject,
        amount: parseInt(amount)
      })
      setTarget(null)
      setSubjectId(null)
      setAmountDisplay(null)
      setSubjectId(SYSTEM_MEDIA_ID)
      setAmountPlaceholder(null)
      setButtonFlag(true)
    } else {
    }
  }

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      {
        !props.avatar.get('ConnStatus') &&
        <View style={{
          alignItems: 'center',
          backgroundColor: theme.off_line_view,
          height: 55,
          lineHeight: 55,
        }} >
          <Text style={{
            lineHeight: 55,
            fontSize: 16,
            color: theme.off_line_text
          }}>
            当前网络不可用，请检查你的网络设置
          </Text>
        </View>
      }

      {
        props.avatar.get('PayTarget') &&
        <View>
          <RNPickerSelect
            onValueChange={(value) => checkTarget(value)}
            style={{
              inputAndroid: {
                color: theme.text1,
              },
              icon: {
                backgroundColor: theme.text1,
                color: theme.text1
              },
            }}
            value={target}
            items={props.avatar.get('PayTarget').TargetList}
            placeholder={target_select_placeholder}
          />
          {
            target != null &&
            <View>
              <Text style={{ color: theme.text1 }}>{target}</Text>
              <RNPickerSelect
                onValueChange={(value) => changeSubject(value)}
                style={{
                  inputAndroid: {
                    color: theme.text1,
                  },
                  icon: {
                    backgroundColor: theme.text1,
                    color: theme.text1
                  },
                }}
                value={subject_id}
                items={props.avatar.get('PayTarget').SubjectList}
                placeholder={subject_select_placeholder}
              />
              {
                subject_id != null &&
                <View>
                  <TextInput
                    placeholderTextColor={theme.text2}
                    style={{
                      ...styles.input_view,
                      color: theme.text1
                    }}
                    placeholder={amount_placeholder}
                    value={amount_display}
                    multiline={false}
                    onChangeText={text => checkAmount(text)}
                  />
                  {
                    subject_id == SYSTEM_MEDIA_ID &&
                    <Text style={{ color: theme.text1 }}>{notice_msg}</Text>
                  }
                  <WhiteSpace size='lg' />
                  <Button
                    style={styles.btn_high}
                    type='primary'
                    disabled={button_flag}
                    onPress={payment}
                  >
                    支付
                  </Button>
                </View>
              }
            </View>
          }
        </View>
      }
    </View >
  )
}

const ReduxTabPaymentScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(TabPaymentScreen)

export default ReduxTabPaymentScreen