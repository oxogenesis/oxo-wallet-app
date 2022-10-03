import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button, WhiteSpace } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'
import { SYSTEM_MEDIA_CODE, SYSTEM_ISSUER_RESERVE, SYSTEM_MEDIA_RATE } from '../../lib/Const'

const SubjectProclaimScreen = (props) => {

  const { theme } = useContext(ThemeContext)
  const [subject, setSubject] = useState('')
  const [rate, setRate] = useState('')
  const [subjects, setSubjects] = useState([])
  const [error_msg, setErrorMsg] = useState('')

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let issuer_list = props.avatar.get('IssuerList')
      let ss = []
      issuer_list.forEach(issuer => {
        ss.push(issuer.Subject)
      })
      setSubjects(ss)
    })
  })

  const formatSubject = (s) => {
    s = s.toLocaleUpperCase()
    s = s.replace(/[^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, '')
    while (s.length != 0 && !/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(s[0])) {
      s = s.substring(1)
    }
    s = s.substring(0, 8)
    if (subjects.includes(s)) {
      setErrorMsg(`标的${s}已存在...`)
      setSubject('')
    } else {
      setErrorMsg('')
      setSubject(s)
    }
  }

  const subject_proclaim = () => {
    let s = subject
    let r = parseInt(rate)
    s = s.toLocaleUpperCase()
    s = s.replace(/[^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, '')
    while (s.length != 0 && !/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(s[0])) {
      s = s.substring(1)
    }
    s = s.substring(0, 8)
    if (s.length > 2 && rate > 0 && rate <= 1000000) {
      props.dispatch({
        type: actionType.avatar.SubjectProclaim,
        subject: s,
        rate: r
      })
      setErrorMsg('')
      setSubject('')
      props.navigation.replace('TabHome')
    } else {
      setErrorMsg('无效标的名称或比率')
    }
  }

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      <TextInput
        placeholderTextColor={theme.text2}
        style={{
          ...styles.input_view,
          color: theme.text1
        }}
        placeholder="标的名称：大写字母开头，大写字母及数字的组合，3到8位"
        value={subject}
        multiline={false}
        onChangeText={text => formatSubject(text)}
      />
      <TextInput
        placeholderTextColor={theme.text2}
        style={{
          ...styles.input_view,
          color: theme.text1
        }}
        placeholder="1标准单位=?最小单位：取值范围：1-1000000"
        value={rate}
        multiline={false}
        onChangeText={text => setRate(text)}
      />
      {
        error_msg.length > 0 &&
        <Text>{error_msg}</Text>
      }

      <WhiteSpace size='lg' />
      <Button
        style={styles.btn_high}
        type='primary'
        onPress={subject_proclaim}
      >
        声明标的
      </Button>

      <WhiteSpace size='lg' />
      <Text style={{
        paddingLeft: 12,
        color: theme.text2,
        borderBottomWidth: 1,
        borderColor: theme.line,
        paddingBottom: 12,
      }}>
        {`声明标的后，${SYSTEM_ISSUER_RESERVE / SYSTEM_MEDIA_RATE}个标准单位${SYSTEM_MEDIA_CODE}将锁定
声明标的后，你的账户将可以签发标的${subject}`}
      </Text>
    </View >
  )
}

const ReduxSubjectProclaimScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SubjectProclaimScreen)

export default ReduxSubjectProclaimScreen