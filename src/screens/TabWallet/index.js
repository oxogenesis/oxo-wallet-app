import React, { useContext, useEffect } from 'react'
import { WhiteSpace, Flex, Button } from '@ant-design/react-native'
import { View, Text,  ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { SYSTEM_MEDIA_CODE, SYSTEM_MEDIA_RATE, SYSTEM_MEDIA_ISSUER } from '../../lib/Const'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

import { ShowAmount, AddressToName } from '../../lib/Util'

//钱包
const TabWalletScreen = (props) => {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    return props.navigation.addListener('focus', () => {

    })
  })

  const navigate_to_setting_subject = () => {
    props.navigation.navigate('SettingSubject')
  }

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      {
        !props.avatar.get('ConnStatus') &&
        <View style={{
          alignItems: 'center',
          backgroundColor: theme.off_line_view,
          height: 55,
          lineHeight: 55,
        }} >
          <Text style={{
            lineHeight: 55,
            fontSize: 16,
            color: theme.off_line_text
          }}>
            当前网络不可用，请检查你的网络设置
          </Text>
        </View>
      }

      <Text style={{ color: 'grey', fontWeight: 'bold' }}>
        {props.avatar.get('Address')}
      </Text>
      <Text style={{ color: 'grey', fontWeight: 'bold' }}>
        {`OwnerCount:${props.avatar.get('OwnerCount')}`}
      </Text>
      <Text style={{ color: 'grey', fontWeight: 'bold' }}>
        {`Sequence:${props.avatar.get('Sequence')}`}
      </Text>

      <ScrollView
        style={styles.scroll_view}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <WhiteSpace />
        <TouchableOpacity onPress={() => { props.navigation.navigate('SystemMedia') }}>
          <View style={{ ...styles.avatar_list, backgroundColor: theme.base_body }}          >
            <Flex>
              <Flex.Item style={{ backgroundColor: "yellow", flex: 0.25 }}>
                <Text style={{ ...styles.base_text_md, fontWeight: 'bold' }} ellipsizeMode={"tail"} numberOfLines={1}>
                  {SYSTEM_MEDIA_CODE}
                </Text>
              </Flex.Item>
              <Flex.Item >
                <Text style={{ ...styles.base_text_md, color: theme.text1 }}>
                  {`持有${ShowAmount(props.avatar.get('Balance'), SYSTEM_MEDIA_RATE)}`}
                </Text>
                <Text style={styles.base_text_id}>
                  {`锁定${ShowAmount(props.avatar.get('Reserve'), SYSTEM_MEDIA_RATE)}`}
                </Text>
                <Text style={styles.base_text_id}>{SYSTEM_MEDIA_ISSUER}</Text>
              </Flex.Item>
            </Flex>
          </View>
        </TouchableOpacity>
        <WhiteSpace size='lg' />

        {
          props.avatar.get('HolderList').length > 0 ?
            props.avatar.get('HolderList').map((item, index) => (
              <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SubjectHolder', { subject_id: item.SubjectID }) }}>
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
                      {
                        item.Rate ?
                          <>
                            <Text style={{ ...styles.base_text_md, color: theme.text1 }}>
                              {`持有${item.DisplayBalance}`}
                            </Text>
                            <Text style={styles.base_text_id}>
                              {`锁定${item.DisplayReserve}`}
                            </Text>
                          </>
                          :
                          <>
                            <Text style={{ ...styles.base_text_md, color: theme.text1 }}>
                              {`持有${item.Balance}`}
                            </Text>
                            <Text style={styles.base_text_id}>
                              {`锁定${item.Reserve}`}
                            </Text>
                          </>
                      }
                      <Text style={styles.base_text_id}>{AddressToName(props.avatar.get('AddressMap'), item.Issuer)}</Text>
                    </Flex.Item>
                  </Flex>
                </View>
              </TouchableOpacity>
            ))
            :
            <Button style={styles.btn_high}
              type='primary'
              onPress={navigate_to_setting_subject}
            >
              信任标的
            </Button>
        }
        <WhiteSpace size='lg' />

        {
          props.avatar.get('IssuerList').length > 0 &&
          props.avatar.get('IssuerList').map((item, index) => (
            <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SubjectIssuer', { subject: item.Subject }) }}>
              <View style={{
                ...styles.avatar_list,
                backgroundColor: theme.base_body
              }}
              >
                <Flex>
                  <Flex.Item style={{ backgroundColor: "green", flex: 0.25 }}>
                    <Text style={{ ...styles.base_text_md, fontWeight: 'bold' }} ellipsizeMode={"tail"} numberOfLines={1}>
                      {item.Subject}
                    </Text>
                  </Flex.Item>
                  <Flex.Item >
                    <Text style={{ ...styles.base_text_md, color: theme.text1 }}>
                      {`负债${item.DisplayOweAmount}`}
                    </Text>
                  </Flex.Item>
                </Flex>
              </View>
            </TouchableOpacity>
          ))
        }
        <WhiteSpace size='lg' />

        {
          props.avatar.get('OfferList').length > 0 &&
          props.avatar.get('OfferList').map((item, index) => (
            <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('Offer', { offer_sequence: item.Sequence }) }}>
              <View style={{
                ...styles.avatar_list,
                backgroundColor: theme.base_body
              }}
              >
                <Flex>
                  <Flex.Item style={{ flex: 0.1 }}>
                    <Text style={{ color: theme.text1, fontSize: 18, fontWeight: 'bold' }} ellipsizeMode={"tail"} numberOfLines={1}>
                      {`#${item.Sequence}`}
                    </Text>
                  </Flex.Item>
                  <Flex.Item style={{ backgroundColor: "orange", flex: 0.4 }}>
                    <Text style={{ ...styles.base_text_md, color: theme.text1 }}>
                      {`${item.DisplayPayAmount}`}
                    </Text>
                    <Text style={styles.base_text_id}>
                      {item.PaySubject}
                    </Text>
                  </Flex.Item>
                  <Flex.Item style={{ flex: 0.1 }}>
                    <Text style={{ color: theme.text1, fontSize: 18, fontWeight: 'bold' }} ellipsizeMode={"tail"} numberOfLines={1}>
                      {`  =>`}
                    </Text>
                  </Flex.Item>
                  <Flex.Item style={{ backgroundColor: "green", flex: 0.4 }}>
                    <Text style={{ ...styles.base_text_md, color: theme.text1 }}>
                      {`${item.DisplayGetAmount}`}
                    </Text>
                    <Text style={styles.base_text_id}>
                      {item.GetSubject}
                    </Text>
                  </Flex.Item>
                </Flex>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View >
  )
}

const ReduxTabWalletScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(TabWalletScreen)

export default ReduxTabWalletScreen