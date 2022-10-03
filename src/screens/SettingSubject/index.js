import React, { useContext, useState, useEffect } from 'react'
import { WhiteSpace, Flex } from '@ant-design/react-native'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import EmptyView from '../EmptyView'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import { SYSTEM_MEDIA_CODE, SYSTEM_OWNER_RESERVE, SYSTEM_MEDIA_RATE } from '../../lib/Const'

import { AddressToName } from '../../lib/Util'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

const SettingSubjectScreen = (props) => {

  const { theme } = useContext(ThemeContext)
  const [subject_list, setSubjectList] = useState([])

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      props.dispatch({
        type: actionType.avatar.InquireSubjectBook
      })

      let holder_list = props.avatar.get('HolderList')
      let holder_subject_ids = []
      holder_list.forEach(holder => {
        holder_subject_ids.push(`${holder.Subject}.${holder.Issuer}`)
      })

      let issuer_list = props.avatar.get('IssuerList')
      let issuer_subject_ids = []
      issuer_list.forEach(issuer => {
        issuer_subject_ids.push(`${issuer.Subject}.${issuer.Issuer}`)
      })

      let sl = props.avatar.get('SubjectList')
      sl = sl.filter((subject) => {
        return !holder_subject_ids.includes(subject.ID) && !issuer_subject_ids.includes(subject.ID)
      })
      setSubjectList(sl)
    })
  })

  const trust_create_alert = (issuer, subject) => {
    Alert.alert(
      '提示',
      `确定要信任${issuer}签发的${subject}？
信任后，${SYSTEM_OWNER_RESERVE / SYSTEM_MEDIA_RATE}个标准单位${SYSTEM_MEDIA_CODE}将被锁定
信任后，你的账户将可以接收标的${subject}.${issuer}`,
      [
        { text: '确认', onPress: () => trust_create(issuer, subject) },
        { text: '取消', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  const trust_create = (issuer, subject) => {
    props.dispatch({
      type: actionType.avatar.TrustCreate,
      issuer: issuer,
      subject: subject
    })
    props.navigation.goBack()
  }

  return (
    <View style={{
      ...styles.base_view_r,
      backgroundColor: theme.base_view
    }}>
      <ScrollView
        style={styles.scroll_view}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}>
        <WhiteSpace />
        <View>
          <Text style={{
            paddingLeft: 12,
            color: theme.text2,
            borderBottomWidth: 1,
            borderColor: theme.line,
            paddingBottom: 12,
          }}>
            暂未信任标的列表
          </Text>
        </View>

        {
          subject_list.length > 0 ?
            subject_list.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => { trust_create_alert(item.Issuer, item.Subject) }}>
                <View style={{
                  ...styles.avatar_list,
                  backgroundColor: theme.base_body
                }}
                >
                  <Flex>
                    <Flex.Item style={{ backgroundColor: "orange", flex: 0.25 }}>
                      <Text style={{ ...styles.base_text_md, fontWeight: 'bold' }} ellipsizeMode={"tail"} numberOfLines={1}>
                        {item.Subject}
                      </Text>
                    </Flex.Item>
                    <Flex.Item >
                      <Text style={{ ...styles.base_text_md, color: theme.text1 }} ellipsizeMode={"tail"} numberOfLines={1}>
                        {AddressToName(props.avatar.get('AddressMap'), item.Issuer)}
                      </Text>
                    </Flex.Item>
                  </Flex>
                </View>
              </TouchableOpacity>
            ))
            :
            <EmptyView pTop={1} />
        }
        <WhiteSpace size='lg' />
      </ScrollView>
    </View >
  )
}

const ReduxSettingSubjectScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SettingSubjectScreen)

export default ReduxSettingSubjectScreen