import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { connect } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import { Toast } from '@ant-design/react-native'
import { WhiteSpace } from '@ant-design/react-native'
import { ThemeContext } from '../../theme/theme-context'
import BaseList from '../BaseList'
import AlertView from '../AlertView'

//设置
const SettingMeScreen = (props) => {

  const alert_view_seed = `确保在私密环境下，通过可信设备扫描种子二维码，迁移种子。
  确定要查看种子二维码？`

  const [visible, showModal] = useState(false)
  const { theme } = useContext(ThemeContext)

  const copyToClipboard = () => {
    Toast.success('拷贝成功！', 1)
    Clipboard.setString(props.avatar.get('Address'))
  }

  const viewSeedQrcodeAlert = () => {
    showModal(true)
  }

  const onClose = () => {
    showModal(false)
  }

  return (
    <View style={{
      backgroundColor: theme.base_view,
      height: '100%'
    }}>
      <View style={{ alignItems: 'center', backgroundColor: theme.base_body, padding: 24, marginTop: 12 }}>
        <QRCode
          value={props.avatar.get('Qrcode')}
          size={350}
          logo={require('../../assets/app.png')}
          logoSize={50}
          backgroundColor={theme.QR_code_view}
          color={theme.QR_code_text}
          logoBackgroundColor='grey'
        />
      </View>
      <WhiteSpace size='lg' />

      <BaseList data={[
        { title: props.avatar.get('Address'), icon: 'block', onpress: copyToClipboard },
        { title: props.avatar.get('Name'), onpress: () => { props.navigation.navigate('AvatarNameEdit') } },
        { title: '查看种子二维码', onpress: viewSeedQrcodeAlert },
        { title: '查看历史', onpress: () => { props.navigation.navigate('History') } },
      ]} />
      <AlertView
        visible={visible}
        onClose={onClose}
        msg={alert_view_seed}
        onPress={() => props.navigation.navigate('AvatarSeedQrcode')}
      />
    </View >
  )
}

const ReduxSettingMeScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SettingMeScreen)

export default ReduxSettingMeScreen