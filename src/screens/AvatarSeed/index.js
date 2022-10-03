import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import { AvatarRemove } from '../../lib/OXO'
import { Toast, Button } from '@ant-design/react-native'
import { ThemeContext } from '../../theme/theme-context'
import Clipboard from '@react-native-clipboard/clipboard'
import AlertView from '../AlertView'
import { styles } from '../../theme/style'

//地址标记
const AvatarSeedScreen = (props) => {

  const alert_remove_account = `！！！种子是账号的唯一凭证，只存储在本地，服务器不提供找回功能！！！
  ！！！移除账号前，请务必备份种子！！！
  确定要移除账号吗？`
  const { theme } = useContext(ThemeContext)
  const [visible, showModal] = useState(false)
  const [visible_remove_account, showRemoveAvatar] = useState(false)

  const copyToClipboard = () => {
    Toast.success('拷贝成功！', 1)
    Clipboard.setString(props.avatar.get('Seed'))
  }

  const copySeedAlert = () => {
    showModal(true)
  }

  const viewRemoveAvatar = () => {
    showRemoveAvatar(true)
  }

  const onClose = () => {
    showModal(false)
    showRemoveAvatar(false)
  }

  const removeAvatar = () => {
    AvatarRemove(props.avatar.get('Address'))
      .then((result) => {
        if (result) {
          props.dispatch({
            type: actionType.avatar.disableAvatar
          })
          props.navigation.navigate('AvatarList')
        }
      })
  }

  return (
    <View style={{
      backgroundColor: theme.base_view,
      height: '100%'
    }}>
      <TouchableOpacity onPress={() => { copySeedAlert() }}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          {props.avatar.get('Seed')}
        </Text>
      </TouchableOpacity>
      <Text style={{
        color: theme.text2
      }}>{`注意：查看种子，应回避具备视觉的生物或设备，应在私密可控环境下。`}</Text>

      <View style={styles.base_view_a}>
        <Button style={styles.btn_high} type="warning" onPress={() => viewRemoveAvatar()}>删除账号</Button>
      </View>

      <AlertView
        visible={visible}
        onClose={onClose}
        msg='确定要复制种子吗？'
        onPress={copyToClipboard}
      />
      <AlertView
        visible={visible_remove_account}
        onClose={onClose}
        msg={alert_remove_account}
        onPress={() => removeAvatar()}
      />
    </View>
  )
}

const ReduxAvatarSeedScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(AvatarSeedScreen)

export default ReduxAvatarSeedScreen