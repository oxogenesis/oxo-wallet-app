import React, { useContext, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import AlertView from '../AlertView'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'

import { SYSTEM_MEDIA_CODE, SYSTEM_ISSUER_RESERVE, SYSTEM_MEDIA_RATE } from '../../lib/Const'

import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

const SubjectIssuerScreen = (props) => {

  const [subject, setSubject] = useState('')
  const [owe_amount, setOweAmount] = useState(0)
  const [rate, setRate] = useState(1)
  const [alert] = useState(`确定要注销标的${subject}？
  注销标的后，${SYSTEM_ISSUER_RESERVE / SYSTEM_MEDIA_RATE}个标准单位${SYSTEM_MEDIA_CODE}将被解锁
  注销标的后，你的账户将无法签发标的${subject}`)
  const [alert_visible, showAlert] = useState(false)
  const { theme } = useContext(ThemeContext)

  const onClose = () => {
    showAlert(false)
  }

  const subject_revoke_alert = () => {
    showAlert(true)
  }

  const subject_revoke = () => {
    props.dispatch({
      type: actionType.avatar.SubjectRevoke,
      subject: subject
    })
    props.navigation.goBack()
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let sb = props.route.params.subject
      let issuer_list = props.avatar.get('IssuerList')
      issuer_list.forEach(issuer => {
        if (issuer.Subject == sb) {
          setSubject(issuer.Subject)
          setOweAmount(issuer.OweAmount)
          setRate(issuer.Rate)
        }
      })
    })
  })

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      <Text style={{ color: theme.text1 }}>{`${subject}`}</Text>
      <Text style={{ color: theme.text1 }}>{`1标准单位=${rate}最小单位`}</Text>
      <Text style={{ color: theme.text1 }}>{`当前签发${owe_amount * 1.0 / rate}个标准单位`}</Text>
      <Text style={{ color: 'grey' }}>
        {`当前签发${owe_amount}个最小单位`}
      </Text>
      {
        owe_amount == 0 ?
          <Button style={{
            height: 55,
            backgroundColor: theme.base_body,
            borderColor: theme.line,
          }}
            onPress={subject_revoke_alert}
          >
            <Text style={{ color: 'orange', }}>注销标的</Text>
          </Button>
          :
          <Button style={{
            height: 55,
            backgroundColor: theme.base_body,
            borderColor: theme.line,
          }}
            disabled={true}
          >
            <Text style={{ color: 'orange', }}>当签发数量为0时，可以注销标的</Text>
          </Button>
      }
      <AlertView
        visible={alert_visible}
        onClose={onClose}
        msg={alert}
        onPress={subject_revoke}
      />
    </View >
  )
}

const ReduxSubjectIssuerScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SubjectIssuerScreen)

export default ReduxSubjectIssuerScreen