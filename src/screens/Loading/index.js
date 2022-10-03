import React, { useContext, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { actionType } from '../../redux/actions/actionType'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

//设置
const LoadingScreen = (props) => {
  const { theme } = useContext(ThemeContext)
  const [state, setState] = useState('')

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let self_address = props.avatar.get('Address')
      let name = props.avatar.get('Name')

      setState('Loading Account...')
      AsyncStorage.getItem(`${self_address}#Account`).then(json => {
        // console.log(json)
        if (json != null) {
          let Account = JSON.parse(json)
          props.dispatch({
            type: actionType.avatar.setAccount,
            sequence: Account.Sequence,
            balance: Account.Balance,
            reserve: Account.Reserve,
            owner_count: Account.OwnerCount,
            created_at: Account.CreatedAt,
            updated_at: Account.UpdatedAt,
            holder_list: Account.HolderList,
            issuer_list: Account.IssuerList,
            offer_list: Account.OfferList
          })
        }
      })

      setState('Loading SubjectList...')
      AsyncStorage.getItem("SubjectList").then(json => {
        // console.log(json)
        if (json != null) {
          let SubjectList = JSON.parse(json)
          props.dispatch({
            type: actionType.avatar.setSubjectList,
            subject_list: SubjectList
          })
        }
      })

      setState('Loading AddressMap...')
      AsyncStorage.getItem(`AddressMap`).then(json => {
        let pay_target = props.avatar.get('PayTarget')
        // console.log(pay_target)
        if (json != null) {
          let AddressMap = JSON.parse(json)
          AddressMap[self_address] = name
          props.dispatch({
            type: actionType.avatar.setAddressBook,
            address_map: AddressMap
          })

          Object.keys(AddressMap).forEach(address => {
            if (self_address != address) {
              pay_target.TargetList.push({ label: `${AddressMap[address]}`, value: address })
            }
          })
        } else {
          let address_map = {}
          address_map[self_address] = name
          props.dispatch({
            type: actionType.avatar.setAddressBook,
            address_map: address_map
          })
        }
        // console.log(pay_target)
        props.dispatch({
          type: actionType.avatar.setPayTarget,
          pay_target: pay_target
        })
      })

      setState('Loading TxList...')
      AsyncStorage.getItem(`${self_address}#TxList`).then(json => {
        // console.log(json)
        if (json != null) {
          let TxList = JSON.parse(json)
          props.dispatch({
            type: actionType.avatar.setTxList,
            tx_list: TxList
          })
        } else {
          props.dispatch({
            type: actionType.avatar.setTxList,
            tx_list: []
          })
        }
      })

      setState('Loading User...')
      let User = { IsOnline: false, IsVerified: false, Status: '' }
      AsyncStorage.getItem(`${self_address}#User`).then(json => {
        // console.log(json)
        if (json != null) {
          User = JSON.parse(json)
        }
        props.dispatch({
          type: actionType.avatar.setUser,
          user: User
        })
      })

      props.navigation.replace('TabHome')
    })
  })

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_body
    }}>
      <Text style={{
        color: theme.text1
      }}>
        {state}
      </Text>
    </View >
  )
}

const ReduxLoadingScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(LoadingScreen)

export default ReduxLoadingScreen