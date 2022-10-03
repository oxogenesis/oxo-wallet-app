import React, { useContext, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import AlertView from '../AlertView'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'

import { SYSTEM_MEDIA_CODE, SYSTEM_OWNER_RESERVE, SYSTEM_MEDIA_RATE } from '../../lib/Const'
import { AddressToName } from '../../lib/Util'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

const SubjectHolderScreen = (props) => {
  const [issuer, setIssuer] = useState('')
  const [subject, setSubject] = useState('')
  const [balance, setBalance] = useState(0)
  const [reserve, setReserve] = useState(0)
  const [rate, setRate] = useState(undefined)

  const [alert] = useState(`确定要取消信任${issuer}签发的${subject}？
  取消信任后，${SYSTEM_OWNER_RESERVE / SYSTEM_MEDIA_RATE}个标准单位${SYSTEM_MEDIA_CODE}将被解锁
  取消信任后，你的账户将无法接收标的${subject}.${issuer}`)
  const [alert_visible, showAlert] = useState(false)


  const { theme } = useContext(ThemeContext)

  const onClose = () => {
    showAlert(false)
  }

  const trust_remove_alert = () => {
    showAlert(true)
  }

  const trust_remove = () => {
    props.dispatch({
      type: actionType.avatar.TrustRemove,
      issuer: issuer,
      subject: subject
    })
    props.navigation.goBack()
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let subject_id = props.route.params.subject_id
      let holder_list = props.avatar.get('HolderList')
      holder_list.forEach(holder => {
        if (holder.SubjectID == subject_id) {
          setIssuer(holder.Issuer)
          setSubject(holder.Subject)
          setBalance(holder.Balance)
          setReserve(holder.Reserve)
          if (holder.Rate == null) {
            props.dispatch({
              type: actionType.avatar.InquireIssuer,
              issuer: holder.Issuer,
              subject: holder.Subject
            })
          } else {
            setRate(holder.Rate)
          }
        }
      })
    })
  })

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      <Text style={{ color: 'blue', fontWeight: 'bold' }} onPress={() => props.navigation.push('AddressMark', { address: issuer })}>
        {`${AddressToName(props.avatar.get('AddressMap'), issuer)}`}
      </Text>
      <Text style={{ color: theme.text1 }}>{`${subject}`}</Text>
      {
        rate ?
          <>
            <Text style={{ color: theme.text1 }}>
              {`1标准单位=${rate}最小单位`}
            </Text>
            <Text style={{ color: theme.text1 }}>
              {`当前持有${balance * 1.0 / rate}个标准单位`}
            </Text>
            <Text style={{ color: 'grey' }}>
              {`当前持有${balance}个最小单位`}
            </Text>
            <Text style={{ color: theme.text1 }}>
              {`当前锁定${reserve * 1.0 / rate}个标准单位`}
            </Text>
            <Text style={{ color: 'grey' }}>
              {`当前锁定${reserve}个最小单位`}
            </Text>
          </>
          :
          <>
            <Text style={{ color: 'grey' }}>
              {`当前持有${balance}个最小单位`}
            </Text>
            <Text style={{ color: 'grey' }}>
              {`当前锁定${reserve}个最小单位`}
            </Text>
          </>
      }
      {
        balance == 0 ?
          <Button style={{
            height: 55,
            backgroundColor: theme.base_body,
            borderColor: theme.line,
          }}
            onPress={trust_remove_alert}
          >
            <Text style={{ color: 'orange', }}>取消信任</Text>
          </Button>
          :
          <Button style={{
            height: 55,
            backgroundColor: theme.base_body,
            borderColor: theme.line,
          }}
            disabled={true}
          >
            <Text style={{ color: 'orange', }}>当持有量为0时，可以取消信任</Text>
          </Button>
      }
      <AlertView
        visible={alert_visible}
        onClose={onClose}
        msg={alert}
        onPress={trust_remove}
      />
    </View >
  )
}

const ReduxSubjectHolderScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SubjectHolderScreen)

export default ReduxSubjectHolderScreen