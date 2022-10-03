import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { WhiteSpace, Button } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'

import { GetRate, timestamp_format, format_decimal, Epoch } from '../../lib/Util'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

const OfferScreen = (props) => {
  const [pay_issuer, setPayIssuer] = useState('')
  const [pay_subject, setPaySubject] = useState('')
  const [pay_amount, setPayAmount] = useState(0)
  const [pay_amount_display, setPayAmountDisplay] = useState('')
  const [pay_rate, setPayRate] = useState(1)

  const [get_issuer, setGetIssuer] = useState('')
  const [get_subject, setGetSubject] = useState('')
  const [get_amount, setGetAmount] = useState(0)
  const [get_amount_display, setGetAmountDisplay] = useState('')
  const [get_rate, setGetRate] = useState(1)

  const [created_at, setCreatedAt] = useState(Epoch)

  const { theme } = useContext(ThemeContext)


  const offer_cancel_alert = () => {
    let offer_sequence = props.route.params.offer_sequence
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
    props.navigation.goBack()
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let offer_sequence = props.route.params.offer_sequence
      let offer_list = props.avatar.get('OfferList')
      let subject_list = props.avatar.get('SubjectList')

      let offer = null
      for (let i = 0; i < offer_list.length; i++) {
        const tmp = offer_list[i]
        if (tmp.Sequence == offer_sequence) {
          offer = tmp
        }
      }
      if (offer != null) {
        console.log(offer)

        setPayIssuer(offer.PayIssuer)
        setPaySubject(offer.PaySubject)
        setPayAmount(offer.PayAmount)
        setPayAmountDisplay(offer.DisplayPayAmount)
        setPayRate(GetRate(offer.PaySubject, offer.PayIssuer, subject_list))
        setGetIssuer(offer.GetIssuer)
        setGetSubject(offer.GetSubject)
        setGetAmount(offer.GetAmount)
        setGetAmountDisplay(offer.DisplayGetAmount)
        setGetRate(GetRate(offer.GetSubject, offer.GetIssuer, subject_list))
        setCreatedAt(offer.CreatedAt)
      } else {
        props.navigation.goBack()
      }
    })
  })

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      <Text style={{ color: theme.text1, fontWeight: 'bold' }}>
        {`#${props.route.params.offer_sequence}@${timestamp_format(created_at)}`}
      </Text>
      <Text style={{ color: theme.text1, fontWeight: 'bold' }}>
        {`价格：1 ${get_subject} = ${format_decimal(pay_amount_display / get_amount_display, 4)} ${pay_subject}`}
      </Text>
      <WhiteSpace size='lg' />

      <Text style={{ color: 'grey' }}>
        {pay_issuer}
      </Text>
      <Text style={{ color: 'grey' }}>
        {`${pay_subject}`}
      </Text>
      <Text style={{ color: 'grey' }}>
        {`1标准单位=${pay_rate}最小单位`}
      </Text>
      <Text style={{ color: theme.text1, fontWeight: 'bold' }}>
        {`卖出${pay_amount_display}个标准单位`}
      </Text>
      <Text style={{ color: 'grey' }}>
        {`卖出${pay_amount}个最小单位`}
      </Text>
      <WhiteSpace size='lg' />

      <Text style={{ color: 'grey' }}>
        {get_issuer}
      </Text>
      <Text style={{ color: 'grey' }}>
        {`${get_subject}`}
      </Text>
      <Text style={{ color: 'grey' }}>
        {`1标准单位=${get_rate}最小单位`}
      </Text>
      <Text style={{ color: theme.text1, fontWeight: 'bold' }}>
        {`买入${get_amount_display}个标准单位`}
      </Text>
      <Text style={{ color: 'grey' }}>
        {`买入${get_amount}个最小单位`}
      </Text>
      <Button style={{
        height: 55,
        backgroundColor: theme.base_body,
        borderColor: theme.line,
      }}
        onPress={offer_cancel_alert}
      >
        <Text style={{ color: 'orange', }}>撤单</Text>
      </Button>
    </View >
  )
}

const ReduxOfferScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(OfferScreen)

export default ReduxOfferScreen