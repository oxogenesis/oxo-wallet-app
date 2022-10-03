import React, { useContext, useState, useEffect } from 'react'
import { Button, WhiteSpace, Flex } from '@ant-design/react-native'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AvatarDerive } from '../../lib/OXO'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import { styles } from '../../theme/style'
import EmptyView from '../EmptyView'
import { ThemeContext } from '../../theme/theme-context'
// import { useNavigation, useRoute } from '@react-navigation/native'

//登录界面
const AvatarListScreen = (props) => {
  const { theme } = useContext(ThemeContext)
  const [avatarList, setList] = useState([])

  const loadAvatarList = () => {
    try {
      AsyncStorage.getItem('<#Avatars#>').then(result => {
        if (result != null) {
          let avatar_list = JSON.parse(result)
          setList(avatar_list)

          avatar_list = avatar_list.map(avatar => {
            return { "Name": avatar.Name, "Address": avatar.Address }
          })
          props.dispatch({
            type: actionType.avatar.setAvatarList,
            avatar_list: avatar_list
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      loadAvatarList()
    })
  })


  const enableAvatar = (address, name) => {
    let avatar = avatarList.filter(item => item.Address == address)[0]
    AvatarDerive(avatar.Save, props.master.get('MasterKey'))
      .then(result => {
        if (result) {
          props.dispatch({
            type: actionType.avatar.enableAvatar,
            seed: result,
            name: name
          })

          let pay_target = {
            TargetList: [],
            SubjectList: []
          }

          avatarList.forEach(avatar => {
            if (address != avatar.Address) {
              pay_target.TargetList.push({ label: avatar.Name, value: avatar.Address })
            }
          })

          props.dispatch({
            type: actionType.avatar.setPayTarget,
            pay_target: pay_target
          })
          console.log(pay_target)
          props.navigation.replace('Loading')
        }
      })
  }

  const lock = () => {
    props.dispatch({
      type: actionType.master.setMasterKey,
      MasterKey: null
    })
    props.navigation.navigate('Unlock')
  }

  return (
    <View style={{
      ...styles.base_view_r,
      backgroundColor: theme.base_view
    }}>
      <ScrollView
        style={styles.scroll_view}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <WhiteSpace />
        {
          avatarList.length > 0 ?
            avatarList.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => enableAvatar(item.Address, item.Name)}>
                <View style={{
                  ...styles.avatar_list,
                  backgroundColor: theme.base_body
                }}
                >
                  <Flex>
                    <Flex.Item style={{ flex: 0.1 }}>
                      <Image style={styles.img_md} source={require('../../assets/app.png')}></Image>
                    </Flex.Item>
                    <Flex.Item >
                      <Text style={{
                        ...styles.base_text_md,
                        color: theme.text1
                      }}>{item.Name}</Text>
                      <Text style={styles.base_text_id}>{item.Address}</Text>
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
      <View style={styles.base_view_a}>
        <Button style={styles.btn_high} type="warning" onPress={() => lock()}>安全退出</Button>
      </View>
    </View>
  )
}


const ReduxAvatarListScreen = connect((state) => {
  return {
    master: state.master,
    avatar: state.avatar
  }
})(AvatarListScreen)

export default ReduxAvatarListScreen

// export default function (props) {
//   const navigation = useNavigation()
//   const route = useRoute()
//   return <ReduxAvatarListScreen{...props} navigation={navigation} route={route} />
// }