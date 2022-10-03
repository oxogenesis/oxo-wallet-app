import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import Clipboard from '@react-native-clipboard/clipboard'
import { Button, WhiteSpace, Toast } from '@ant-design/react-native'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'
import BaseList from '../BaseList'

//地址标记
const AddressMarkScreen = (props) => {
  const { theme } = useContext(ThemeContext)

  const delAddressMark = () => {
    props.dispatch({
      type: actionType.avatar.delAddressMark,
      address: props.avatar.get('CurrentAddressMark').Address
    })
    props.navigation.goBack()
  }

  const loadAddressMark = () => {
    props.dispatch({
      type: actionType.avatar.setCurrentAddressMark,
      address: props.route.params.address
    })
  }

  const copyToClipboard = () => {
    Clipboard.setString(props.avatar.get('CurrentAddressMark').Address)
    Toast.success('拷贝成功！', 1)
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      loadAddressMark()
    })
  })

  const current = props.avatar.get('CurrentAddressMark')
  const { Name, Address, IsMark } = current || {}

  return (
    <View style={{
      height: '100%',
      backgroundColor: theme.base_view
    }}>
      <WhiteSpace size='lg' />
      {
        current &&
        <>
          <BaseList data={[
            { title: Address, icon: 'block', onpress: copyToClipboard },
            { title: Name, onpress: () => props.navigation.replace('AddressEdit', { address: Address }) },
          ]} />

          <WhiteSpace size='lg' />

          {
            IsMark && <WhiteSpace size='lg' />
          }

          {
            IsMark && <Button style={{
              height: 55,
              backgroundColor: theme.base_body,
              borderColor: theme.line,
            }}
              onPress={delAddressMark}
            ><Text style={{
              color: 'red',
            }}>删除</Text></Button>
          }
          {
            IsMark && <WhiteSpace size='lg' />
          }

          {
            !IsMark &&
            <Button
              style={styles.btn_high}
              type='primary'
              onPress={() => props.navigation.replace('AddressAdd',
                { address: Address })}
            >
              标记地址
            </Button>
          }
        </>
      }
    </View>
  )

}

const ReduxAddressMarkScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(AddressMarkScreen)

export default function (props) {
  const navigation = useNavigation()
  const route = useRoute()
  return <ReduxAddressMarkScreen{...props} navigation={navigation} route={route} />
}