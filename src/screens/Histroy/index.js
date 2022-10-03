import * as React from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import { actionType } from '../../redux/actions/actionType'
import { SYSTEM_MEDIA_CODE, SYSTEM_OWNER_RESERVE, TxResultCode } from '../../lib/Const'

import { DisplaySubject, timestamp_format, AddressToName } from '../../lib/Util'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { my_styles } from '../../theme/style'

function Tx(props) {
  switch (props.tx.TxType) {
    case "Payment":
      return (
        <View>
          {
            props.tx.TRC == TxResultCode.trcPaymentOK ?
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 支付 (-${props.tx.AccurateFee})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <View>
                  <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                    <View style={{ flex: 0.05 }}>
                      <MCIcons
                        name={'arrow-collapse-right'}
                        size={16}
                      />
                    </View>
                    <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} onPress={() => props.navigation.push('AddressMark', { address: props.tx.DestAddress })}>
                      {`${AddressToName(props.avatar.get('AddressMap'), props.tx.DestAddress)}`}
                    </Text>
                  </View><View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                    <Text style={{ flex: 0.05 }}></Text>
                    <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={2}>
                      {`${props.tx.AccurateAmount} ${DisplaySubject(props.tx.Subject, props.tx.Issuer, props.address_map)}`}
                    </Text>
                  </View>
                </View>
              </>
              :
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 支付 (-${props.tx.AccuratePenalty})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <Text style={{ backgroundColor: "red", color: 'blue', fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {props.tx.TRC}
                </Text>
              </>
          }
        </View>
      )
    case "Receive":
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`#${props.tx.Sequence} 接收`}
            </Text>
            <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`@${timestamp_format(props.tx.CreatedAt)}`}
            </Text>
          </View>
          <View>
            <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
              <View style={{ flex: 0.05 }}>
                <MCIcons
                  name={'arrow-collapse-left'}
                  color='red'
                  size={16}
                />
              </View>
              <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} onPress={() => props.navigation.push('AddressMark', { address: props.tx.Address })}>
                {`${AddressToName(props.avatar.get('AddressMap'), props.tx.Address)}`}
              </Text>
            </View><View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
              <Text style={{ flex: 0.05 }}></Text>
              <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={2}>
                {`${props.tx.AccurateAmount} ${DisplaySubject(props.tx.Subject, props.tx.Issuer, props.address_map)}`}
              </Text>
            </View>
          </View>
        </View>
      )
    case "TrustCreate":
      return (
        <View>
          {
            props.tx.TRC == TxResultCode.trcTrustCreateOK ?
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 信任标的 (-${props.tx.AccurateFee})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                  <View style={{ flex: 0.05 }}>
                    <MCIcons
                      name={'eye-outline'}
                      size={16}
                    />
                  </View>
                  <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`${DisplaySubject(props.tx.Subject, props.tx.Issuer, props.address_map)}`}
                  </Text>
                </View>
              </>
              :
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 信任标的 (-${props.tx.AccuratePenalty})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <Text style={{ backgroundColor: "red", color: 'blue', fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {props.tx.TRC}
                </Text>
              </>
          }
        </View>
      )
    case "TrustRemove":
      return (
        <View>
          {
            props.tx.TRC == TxResultCode.trcTrustRemoveOK ?
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 取消信任 (-${props.tx.AccurateFee})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                  <View style={{ flex: 0.05 }}>
                    <MCIcons
                      name={'eye-off-outline'}
                      size={16}
                    />
                  </View>
                  <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`${DisplaySubject(props.tx.Subject, props.tx.Issuer, props.address_map)}`}
                  </Text>
                </View>
              </>
              :
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 取消信任 (-${props.tx.AccuratePenalty})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <Text style={{ backgroundColor: "red", color: 'blue', fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {props.tx.TRC}
                </Text>
              </>
          }
        </View>
      )
    case "SubjectProclaim":
      return (
        <View>
          {
            props.tx.TRC == TxResultCode.trcSubjectProclaimOK ?
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 声明标的 (-${props.tx.AccurateFee})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                  <View style={{ flex: 0.05 }}>
                    <MCIcons
                      name={'fingerprint'}
                      size={16}
                    />
                  </View>
                  <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`${props.tx.Subject}`}
                  </Text>
                </View>
              </>
              :
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 声明标的 (-${props.tx.AccuratePenalty})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <Text style={{ backgroundColor: "red", color: 'blue', fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {props.tx.TRC}
                </Text>
              </>
          }
        </View>
      )
    case "SubjectRevoke":
      return (
        <View>
          {
            props.tx.TRC == TxResultCode.trcSubjectRevokeOK ?
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 注销标的 (-${props.tx.AccurateFee})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                  <View style={{ flex: 0.05 }}>
                    <MCIcons
                      name={'fingerprint-off'}
                      size={16}
                    />
                  </View>
                  <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`${props.tx.Subject}`}
                  </Text>
                </View>
              </>
              :
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 注销标的 (-${props.tx.AccuratePenalty})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <Text style={{ backgroundColor: "red", color: 'blue', fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {props.tx.TRC}
                </Text>
              </>
          }
        </View>
      )
    case "OfferCreate":
      return (
        <View>
          {
            props.tx.TRC == TxResultCode.trcOfferCreateOK ?
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 报单 (-${props.tx.AccurateFee})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <View>
                  <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                    <View style={{ flex: 0.05 }}>
                      <MCIcons
                        name={'tag-outline'}
                        size={16}
                      />
                    </View>
                    <View style={{ flex: 0.05 }}>
                      <MCIcons
                        name={'arrow-collapse-right'}
                        size={16}
                      />
                    </View>
                    <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.90 }} ellipsizeMode={"tail"} numberOfLines={1}>
                      {`${props.tx.AccuratePayAmount} ${DisplaySubject(props.tx.PaySubject, props.tx.PayIssuer, props.address_map)}`}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
                    <Text style={{ flex: 0.05 }}></Text>
                    <View style={{ flex: 0.05 }}>
                      <MCIcons
                        name={'arrow-collapse-left'}
                        size={16}
                      />
                    </View>
                    <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.90 }} ellipsizeMode={"tail"} numberOfLines={1}>
                      {`${props.tx.AccurateGetAmount} ${DisplaySubject(props.tx.GetSubject, props.tx.GetIssuer, props.address_map)}`}
                    </Text>
                  </View>
                </View>
              </>
              :
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`#${props.tx.Sequence} 报单 (-${props.tx.AccuratePenalty})`}
                  </Text>
                  <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                    {`@${timestamp_format(props.tx.CreatedAt)}`}
                  </Text>
                </View>
                <Text style={{ backgroundColor: "red", color: 'blue', fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {props.tx.TRC}
                </Text>
              </>
          }
        </View>
      )
    case "OfferCancel":
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ backgroundColor: "green", fontWeight: 'bold', flex: 0.7 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`#${props.tx.Sequence} 撤单 (-${props.tx.AccurateFee})`}
            </Text>
            <Text style={{ backgroundColor: "yellow", fontWeight: 'bold', flex: 0.3 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`@${timestamp_format(props.tx.CreatedAt)}`}
            </Text>
          </View>
          <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
            <View style={{ flex: 0.05 }}>
              <MCIcons
                name={'tag-off-outline'}
                size={16}
              />
            </View>
            <Text style={{ color: 'blue', fontWeight: 'bold', flex: 0.95 }} ellipsizeMode={"tail"} numberOfLines={1}>
              {`${props.tx.OfferSequence}`}
            </Text>
          </View>
        </View>
      )
    default:
      return (
        <View>
        </View>
      )
  }
}

class ItemSeparator extends React.Component {
  render() {
    return (
      <View style={{ height: 1, backgroundColor: 'black' }} />
    )
  }
}

class HistroyScreen extends React.Component {

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      let sequence = this.props.avatar.get('Sequence')
      let tx_list = this.props.avatar.get('TxList')
      let affect_cursor = this.props.avatar.get('AffectCursor')
      let length = 0
      tx_list.forEach(tx => {
        if (tx.TxType != 'Receive') {
          length += 1
        }
      })
      if (length < sequence) {
        this.props.dispatch({
          type: actionType.avatar.InquireTx,
          sequence: length + 1
        })
      } else if (length == 0 || (tx_list[0].TxType != 'Receive' && affect_cursor < tx_list[0].CreatedAt)) {
        this.props.dispatch({
          type: actionType.avatar.InquireAffect
        })
      }
    })
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  render() {
    return (
      <View style={my_styles.TabSheet}>
        <FlatList
          data={this.props.avatar.get('TxList')}
          keyExtractor={item => `${item.Address}#${item.Sequence}`}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={
            ({ item }) => {
              return (
                <Tx tx={item} avatar={this.props.avatar} navigation={this.props.navigation} address_map={this.props.avatar.get('AddressMap')} />
              )
            }
          }
        >
        </FlatList>
      </View >
    )
  }
}

const ReduxHistroyScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(HistroyScreen)

export default ReduxHistroyScreen