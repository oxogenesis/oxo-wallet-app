import React, { useContext, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import Clipboard from '@react-native-clipboard/clipboard'
import { Button, WhiteSpace, Toast } from '@ant-design/react-native'
import BaseList from '../BaseList'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'
import { CheckId } from '../../lib/Util'
import { MaxRefLevel, UserState } from '../../lib/Const'

//登录界面
const GiveawayScreen = (props) => {
  const { theme } = useContext(ThemeContext)

  const [name, setName] = useState(undefined)
  const [id, setId] = useState(undefined)
  const [phone, setPhone] = useState(undefined)
  const [ref, setRef] = useState(undefined)
  const [error_msg, setMsg] = useState('')

  const apply_giveaway = () => {
    if (ref == null || ref.trim() == '') {
      setMsg(`邀请码无效...`)
      return
    }
    if (name == null || name.trim() == '') {
      setMsg(`姓名不能为空...`)
      return
    }
    if (!CheckId(id.trim())) {
      setMsg(`身份证号无效...`)
      return
    }
    if (phone == null || phone.trim() == '') {
      setMsg(`手机号无效...`)
      return
    }

    props.dispatch({
      type: actionType.avatar.ApplyGiveaway,
      name: name,
      id: id,
      phone: phone,
      ref: ref
    })
    props.navigation.goBack()
  }

  const copyToClipboard = () => {
    Toast.success('拷贝成功！', 1)
    Clipboard.setString(props.avatar.get('Address'))
  }

  const toastLevel = () => {
    Toast.success('最多可以邀请18人', 1)
  }

  const toastRate = () => {
    Toast.success('邀请1人利率为万5，之后每多邀请人再增加万1', 1)
  }

  const toastDay = () => {
    Toast.success('从认证成功开始派息1000天', 1)
  }

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      {
        props.avatar.get('User').IsVerified ?
          < View >
            <WhiteSpace size='lg' />
            <BaseList data={[
              { title: `邀请码：${props.avatar.get('User').Code}`, icon: 'block', onpress: copyToClipboard },
              { title: `邀请用户数量：${props.avatar.get('User').Level}/${MaxRefLevel}`, onpress: toastLevel },
              { title: `每日派息利率：${props.avatar.get('User').Rate}`, onpress: toastRate },
              { title: `剩余派息天数：${props.avatar.get('User').Day}`, onpress: toastDay },
            ]} />
            <WhiteSpace size='lg' />
          </View>
          :
          <View>
            <View style={{
              flexDirection: "row",
              paddingTop: 5,
              height: 55,
              borderBottomWidth: 1,
              borderColor: theme.line,
              backgroundColor: theme.base_body,
              paddingLeft: 6,
              paddingRight: 6
            }} >
              <Text style={{
                lineHeight: 55,
                color: theme.text1,
              }}>
                {`为了防止机器人批量领取，领取空投需要提供邀请码及个人信息。`}
              </Text>
            </View>
            <View style={{
              flexDirection: "row",
              paddingTop: 5,
              height: 55,
              borderBottomWidth: 1,
              borderColor: theme.line,
              backgroundColor: theme.base_body,
              paddingLeft: 6,
              paddingRight: 6
            }} >
              <Text style={{
                lineHeight: 55,
                color: theme.text1,
              }}>
                {`赠送活动持续180天或赠送账户1万个。`}
              </Text>
            </View>
            <WhiteSpace size='lg' />

            {
              props.avatar.get('User').Status == UserState.Verify &&
              <>
                <Text style={styles.required_text}>提交成功</Text>
                <WhiteSpace size='lg' />
              </>
            }

            {
              props.avatar.get('User').Status == UserState.BakVerify &&
              <>
                <Text style={styles.required_text}>等待审核</Text>
                <WhiteSpace size='lg' />
              </>
            }

            <View>
              <TextInput
                placeholderTextColor={theme.text2}
                style={{
                  ...styles.input_view,
                  color: theme.text1
                }}
                placeholder="邀请码"
                value={ref}
                onChangeText={text => setRef(text)}
              />
              <TextInput
                placeholderTextColor={theme.text2}
                style={{
                  ...styles.input_view,
                  color: theme.text1
                }}
                placeholder="姓名"
                value={name}
                onChangeText={text => setName(text)}
              />
              <TextInput
                placeholderTextColor={theme.text2}
                style={{
                  ...styles.input_view,
                  color: theme.text1
                }}
                placeholder="身份证"
                value={id}
                onChangeText={text => setId(text)}
              />
              <TextInput
                placeholderTextColor={theme.text2}
                style={{
                  ...styles.input_view,
                  color: theme.text1
                }}
                placeholder="手机号"
                value={phone}
                onChangeText={text => setPhone(text)}
              />
              <WhiteSpace size='lg' />
              {
                error_msg.length > 0 &&
                <View>
                  <Text style={styles.required_text}>{error_msg}</Text>
                  <WhiteSpace size='lg' />
                </View>
              }
              <Button style={styles.btn_high} type='primary' onPress={apply_giveaway}>
                提交
              </Button>
            </View>
          </View>
      }
    </View >
  )
}

const ReduxGiveawayScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(GiveawayScreen)

export default ReduxGiveawayScreen