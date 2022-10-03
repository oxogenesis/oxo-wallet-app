import React, { useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { List, WhiteSpace } from '@ant-design/react-native'
import EmptyView from '../EmptyView'
import { ThemeContext } from '../../theme/theme-context'
import BaseAvatarList from '../BaseAvatarList'

//设置
const SettingAddressScreen = props => {

  const { theme } = useContext(ThemeContext)

  const lists = props.avatar.get('AddressArray').map(item => ({
    title: item.Name,
    onpress: () => props.navigation.push('AddressMark', { address: item.Address })
  }))


  return (
    <ScrollView
      style={{ flex: 1, height: '100%', backgroundColor: theme.base_view }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {
        props.avatar.get('AddressArray').length > 0 ?
          <View>
            <Text style={{
              paddingLeft: 12,
              color: theme.text2,
              borderColor: theme.line,
            }}>全部好友</Text>
            <WhiteSpace />
            <BaseAvatarList data={lists} />
          </View>
          :
          <EmptyView />
      }
    </ScrollView>
  )
}

const ReduxSettingAddressScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SettingAddressScreen)

export default ReduxSettingAddressScreen