import React, { useContext, useState, useRef, useEffect } from 'react'
import { Button, WhiteSpace } from '@ant-design/react-native'
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import RNPickerSelect from 'react-native-picker-select'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

import { SYSTEM_MEDIA_CODE, SYSTEM_MEDIA_RATE, SYSTEM_MEDIA_ID, ISSUER_SUBJECT_AMOUNT } from '../../lib/Const'
import { timestamp_format, ShowAmount, DisplaySubject } from '../../lib/Util'

const TabTradeScreen = (props) => {

  const pay_subject_select_placeholder = {
    label: '支付(计价标的)',
    value: null,
    color: 'orange',
    fontWeight: 'bold'
  }
  const get_subject_select_placeholder = {
    label: '获得(商品标的)',
    value: null,
    color: 'green',
    fontWeight: 'bold'
  }

  const { theme } = useContext(ThemeContext)

  //pay
  const pay_issuer = useRef(null)
  const pay_subject = useRef(null)
  const [pay_amount_display, setPayAmountDisplay] = useState(null)
  const pay_amount = useRef(null)
  const [pay_rate, setPayRate] = useState(1)
  const [pay_subject_id, setPaySubjectId] = useState(null)

  const [pay_available, setPayAvailable] = useState(null)
  const [pay_amount_placeholder, setPayAmountPlaceholder] = useState(null)
  //get
  const get_issuer = useRef(null)
  const get_subject = useRef(null)
  const [get_amount_display, setGetAmountDisplay] = useState(null)
  const get_amount = useRef(null)
  const [get_rate, setGetRate] = useState(1)
  const [get_subject_id, setGetSubjectId] = useState(null)

  const [msg, setMsg] = useState(null)
  const [subject_ids, setSubjectIds] = useState([])

  const pay_button_flag = useRef(true)
  const get_button_flag = useRef(true)
  const price = useRef(null)
  const [button_flag, setButtonFlag] = useState(true)

  const offer_book_job = useRef(null)

  const getOfferBook = () => {
    let pay_id = `${pay_issuer.current}.${pay_subject.current}`
    let get_id = `${get_issuer.current}.${get_subject.current}`
    if (pay_issuer.current != null && get_issuer.current != null && pay_subject.current != null && get_subject.current != null && pay_id != get_id) {
      props.dispatch({
        type: actionType.avatar.InquireOfferBook,
        pay_issuer: pay_issuer.current,
        pay_subject: pay_subject.current,
        get_issuer: get_issuer.current,
        get_subject: get_subject.current
      })
    }
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let address_map = props.avatar.get('AddressMap')
      let sids = [{ label: SYSTEM_MEDIA_CODE, value: SYSTEM_MEDIA_ID, pay_available: props.avatar.get('Balance') - props.avatar.get('Reserve'), rate: SYSTEM_MEDIA_RATE }]
      let holder_list = props.avatar.get('HolderList')
      holder_list.forEach(holder => {
        sids.push({ label: DisplaySubject(holder.Subject, holder.Issuer, address_map), value: holder.SubjectID, pay_available: holder.Balance - holder.Reserve, rate: holder.Rate })
      })
      setSubjectIds(sids)

      offer_book_job.current = setInterval(() => {
        getOfferBook()
      }, 5000)
    })
  })

  useEffect(() => {
    return props.navigation.addListener('blur', () => {
      clearInterval(offer_book_job.current)
    })
  })

  const offer_create = () => {
    props.dispatch({
      type: actionType.avatar.OfferCreate,
      pay_issuer: pay_issuer.current,
      pay_subject: pay_subject.current,
      pay_amount: pay_amount.current,
      get_issuer: get_issuer.current,
      get_subject: get_subject.current,
      get_amount: get_amount.current
    })
    setPayAmountDisplay(null)
    setGetAmountDisplay(null)
    setMsg(null)
    setButtonFlag(true)
  }

  const offer_cancel_alert = (offer_sequence) => {
    Alert.alert(
      '提示',
      `确定要撤销订单#${offer_sequence}？`,
      [
        { text: '确认', onPress: () => offer_cancel(offer_sequence) },
        { text: '取消', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  const offer_cancel = (offer_sequence) => {
    props.dispatch({
      type: actionType.avatar.OfferCancel,
      offer_sequence: offer_sequence
    })
  }

  const change_pay_subject = (psi) => {
    if (psi == null) {
      setPaySubjectId(null)
      setPayAvailable(null)
      pay_issuer.current = null
      pay_subject.current = null
      setPayAmountPlaceholder(null)
      setPayRate(null)
    } else {
      let pa = 0
      let pr = 1
      subject_ids.forEach(subject => {
        if (subject.value == psi) {
          pa = subject.pay_available
          pr = subject.rate
        }
      })
      // console.log(pa)
      // console.log(pr)
      // console.log(pa * 1.0 / pr)
      let pap = `最大值为${pa * 1.0 / pr}`
      let [ps, pi] = psi.split('.')
      setPaySubjectId(psi)
      setPayAvailable(pa)
      pay_issuer.current = pi
      pay_subject.current = ps
      setPayAmountPlaceholder(pap)
      setPayRate(pr)
    }
    setPayAmountDisplay(null)
    pay_button_flag.current = true
    pay_amount.current = null

    setMsg(null)
    change_current_offer_pair()
  }

  const change_get_subject = (gsi) => {
    if (gsi == null) {
      setGetSubjectId(null)
      get_issuer.current = null
      get_subject.current = null
      setGetRate(null)
    } else {
      let gr = 1
      subject_ids.forEach(subject => {
        if (subject.value == gsi) {
          gr = subject.rate
        }
      })
      let [gs, gi] = gsi.split('.')
      setGetSubjectId(gsi)
      get_issuer.current = gi
      get_subject.current = gs
      setGetRate(gr)
    }

    setGetAmountDisplay(null)
    get_button_flag.current = true
    get_amount.current = null

    setMsg(null)
    change_current_offer_pair()
  }

  const check_pay_amount = (pad) => {
    pad = pad.replace(/[^0123456789.]/g, '')
    let pa = parseInt(pad * pay_rate)
    console.log(pad)
    console.log(pa)
    if (pa > pay_available) {
      setPayAmountDisplay(ShowAmount(pay_available, pay_rate))
      pay_amount.current = pay_available
      pay_button_flag.current = false
      console.log(`pay_button_flag.current1:${pay_button_flag.current}`)
    } else if (pa >= 1) {
      setPayAmountDisplay(pad)
      pay_amount.current = pa
      pay_button_flag.current = false
      console.log(`pay_button_flag.current2:${pay_button_flag.current}`)
    } else {
      setPayAmountDisplay(null)
      pay_amount.current = null
      pay_button_flag.current = true
      console.log(`pay_button_flag.current3:${pay_button_flag.current}`)
    }
    check_button_flag()
  }

  const check_get_amount = (gad) => {
    gad = gad.replace(/[^0123456789.]/g, '')
    let ga = parseInt(gad * get_rate)
    console.log(gad)
    console.log(ga)
    if (ga >= 1 && ga <= ISSUER_SUBJECT_AMOUNT) {
      get_amount.current = ga
      setGetAmountDisplay(gad)
      get_button_flag.current = false
      console.log(`get_button_flag.current1:${get_button_flag.current}`)
    } else {
      get_amount.current = null
      setGetAmountDisplay(null)
      get_button_flag.current = true
      console.log(`get_button_flag.current2:${get_button_flag.current}`)
    }
    check_button_flag()
  }

  const check_button_flag = () => {
    console.log(`pay_button_flag.current:${pay_button_flag.current}`)
    console.log(`get_button_flag.current:${get_button_flag.current}`)
    console.log(`pay_subject_id:${pay_subject_id}`)
    console.log(`get_subject_id:${get_subject_id}`)
    if (pay_subject_id == null || get_subject_id == null || pay_subject_id == get_subject_id) {
      setButtonFlag(true)
      setMsg('计价标的/商品标的不能相同...')
    } else if (pay_button_flag.current || get_button_flag.current) {
      setButtonFlag(true)
      setMsg('无效价格...')
    } else {
      setButtonFlag(false)
      price.current = pay_amount.current * get_rate / get_amount.current / pay_rate
      setMsg(`价格：${price.current}`)
    }
  }

  const change_current_offer_pair = () => {
    props.dispatch({
      type: actionType.avatar.updateCurrentOfferList,
      local_flag: true,
      pay_issuer: pay_issuer.current,
      pay_subject: pay_subject.current,
      get_issuer: get_issuer.current,
      get_subject: get_subject.current
    })
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

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.5 }}>
          <RNPickerSelect
            onValueChange={(value) => change_pay_subject(value)}
            style={{
              inputAndroid: {
                color: 'orange',
              },
              icon: {
                backgroundColor: theme.text1,
                color: theme.text1
              },
            }}
            value={pay_subject_id}
            items={subject_ids}
            placeholder={pay_subject_select_placeholder}
          />
          <TextInput
            placeholderTextColor={theme.text2}
            style={{
              ...styles.input_view,
              color: 'orange'
            }}
            placeholder={pay_amount_placeholder}
            value={pay_amount_display}
            multiline={false}
            onChangeText={text => check_pay_amount(text)}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <RNPickerSelect
            onValueChange={(value) => change_get_subject(value)}
            style={{
              inputAndroid: {
                color: 'green',
              },
              icon: {
                backgroundColor: theme.text1,
                color: theme.text1
              },
            }}
            value={get_subject_id}
            items={subject_ids}
            placeholder={get_subject_select_placeholder}
          />
          <TextInput
            placeholderTextColor={theme.text2}
            style={{
              ...styles.input_view,
              color: 'green'
            }}
            value={get_amount_display}
            multiline={false}
            onChangeText={text => check_get_amount(text)}
          />
        </View>
      </View>
      {
        msg != null &&
        <Text style={{ color: theme.text1, fontWeight: 'bold' }}>{msg}</Text>
      }
      <Button
        style={styles.btn_high}
        type='primary'
        disabled={button_flag}
        onPress={offer_create}
      >
        下单
      </Button>

      <FlatList
        data={props.avatar.get('CurrentOfferList')}
        keyExtractor={item => `${item.Sequence}`}
        renderItem={
          ({ item }) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ backgroundColor: "grey", flex: 0.15 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {`${item.DisplayPayAmount}`}
                </Text>
                <Text style={{ backgroundColor: "yellow", flexDirection: "row", flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {`${item.PaySubject}==>${item.GetSubject}`}
                </Text>
                <Text style={{ backgroundColor: "grey", flex: 0.15 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {`${item.DisplayGetAmount}`}
                </Text>
                <Text style={{ backgroundColor: "yellow", flex: 0.25 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {timestamp_format(item.CreatedAt)}
                </Text>
                <TouchableOpacity
                  style={{ flex: 0.15 }}
                  onPress={() => { offer_cancel_alert(item.Sequence) }}
                >
                  <Text style={{ color: 'red', fontWeight: 'bold' }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`撤单#${item.Sequence}`}
                  </Text>
                </TouchableOpacity>
              </View >
            )
          }
        }
      ></FlatList>

      <View style={{ flexDirection: "row" }}>
        <View style={{ backgroundColor: "orange", flex: 0.5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`买量`}
            </Text>
            <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`买价`}
            </Text>
          </View>
          <View >
            <FlatList
              data={props.avatar.get('BuyBook')}
              keyExtractor={item => `${item.CreatedAt}`}
              renderItem={
                ({ item }) => {
                  return (
                    <View
                      style={{ flexDirection: "row" }}
                    >
                      <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
                        {`${item.GetAmount}`}
                      </Text>
                      <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
                        {`${item.Price}`}
                      </Text>
                    </View >
                  )
                }
              }
            ></FlatList>
          </View>
        </View>
        <View style={{ backgroundColor: "green", flex: 0.5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`卖价`}
            </Text>
            <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`卖量`}
            </Text>
          </View>
          <View >
            <FlatList
              data={props.avatar.get('SellBook')}
              keyExtractor={item => `${item.CreatedAt}`}
              renderItem={
                ({ item }) => {
                  return (
                    <View
                      style={{ flexDirection: "row" }}
                    >
                      <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
                        {`${item.Price}`}
                      </Text>
                      <Text style={{ flex: 0.5 }} ellipsizeMode={"tail"} numberOfLines={1}>
                        {`${item.PayAmount}`}
                      </Text>
                    </View >
                  )
                }
              }
            ></FlatList>
          </View>
        </View>
      </View>
    </View >
  )
}

const ReduxTabTradeScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(TabTradeScreen)

export default ReduxTabTradeScreen