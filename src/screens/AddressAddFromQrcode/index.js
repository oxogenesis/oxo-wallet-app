import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import { Button, WhiteSpace } from '@ant-design/react-native'
import { styles } from '../../theme/style'
import { ThemeContext } from '../../theme/theme-context'

const AddressAddFromQrcodeScreen = (props) => {
  const [name, setName] = useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [error_msg, setMsg] = useState('')
  const { theme } = useContext(ThemeContext)

  const markAddress = () => {
    let newName = name.trim()
    let avatar_list = props.avatar.get("AvatarList").map(avatar => avatar.Address)
    if (newName == '' || address == newName) {
      setMsg('昵称不能为空，地址与昵称不能相同...')
      return
    } else if (avatar_list.includes(address)) {
      setMsg('不能标记自己...')
      return
    }
    props.dispatch({
      type: actionType.avatar.addAddressMark,
      address: address,
      name: newName
    })
    props.navigation.goBack()
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      if (props.route.params && props.route.params.address) {
        setAddress(props.route.params.address)
      } else {
        props.navigation.goBack()
      }
    })
  })

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view,
      padding: 0,
    }}>
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
          {address}
        </Text>
      </View>
      <WhiteSpace size='lg' />
      <TextInput
        placeholderTextColor={theme.text2}
        style={{
          ...styles.input_view,
          color: theme.text1
        }}
        placeholder="昵称"
        value={name}
        onChangeText={text => setName(text)}
      />
      <WhiteSpace size='md' />
      {
        error_msg.length > 0 &&
        <View>
          <Text style={styles.required_text}>{error_msg}</Text>
          <WhiteSpace size='lg' />
        </View>
      }
      <Button type='primary' style={{ height: 55 }}
        onPress={markAddress}>标记地址</Button>
    </View>
  )
}

const ReduxAddressAddFromQrcodeScreen = connect((state) => {
  return {
    master: state.master,
    avatar: state.avatar
  }
})(AddressAddFromQrcodeScreen)

export default ReduxAddressAddFromQrcodeScreen