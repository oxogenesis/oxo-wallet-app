import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import IconAnt from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import MasterKeyScreen from '../MasterKey'
import UnlockScreen from '../Unlock'
import AvatarListScreen from '../AvatarList'
import LoadingScreen from '../Loading'
import AvatarCreateScreen from '../AvatarCreate'
import AvatarNameEditScreen from '../AvatarNameEdit'
import AvatarSeedScreen from '../AvatarSeed'
import AvatarSeedQrcodeScreen from '../AvatarSeedQrcode'
import AvatarCreateFromScanSeedQrcodeScreen from '../AvatarCreateFromScanSeedQrcode'
import TabHomeScreen from '../TabHome'
import SystemMediaScreen from '../SystemMedia'
import SubjectHolderScreen from '../SubjectHolder'
import SubjectIssuerScreen from '../SubjectIssuer'
import OfferScreen from '../Offer'
import AddressMarkScreen from '../AddressMark'
import AddressAddFromQrcodeScreen from '../AddressAddFromQrcode'
import AddressEditScreen from '../AddressEdit'
import AddressScanScreen from '../AddressScan'
import SettingMeScreen from '../SettingMe'
import GiveawayScreenScreen from '../Giveaway'
import SettingNetworkScreen from '../SettingNetwork'
import SettingAddressScreen from '../SettingAddress'
import SettingSubjectScreen from '../SettingSubject'
import SubjectProclaimScreen from '../SubjectProclaim'
import HistoryScreen from '../Histroy'
import { ThemeContext } from '../../theme/theme-context'
const Stack = createStackNavigator()

const StackView = (props) => {
  const { theme } = useContext(ThemeContext)

  const headerStyleOption = {
    headerStyle: {
      backgroundColor: theme.tab_view,
    },
    headerTitleStyle: {
      color: theme.tab_text,
    },
    headerTintColor: theme.tab_text
  }

  return (
    <Stack.Navigator initialRouteName="MasterKey">
      <Stack.Screen
        name="MasterKey"
        component={MasterKeyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Unlock"
        component={UnlockScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AvatarList"
        component={AvatarListScreen}
        options={
          ({ route, navigation }) => ({
            title: "账户列表",
            headerLeft: false,
            ...headerStyleOption,
            headerRight: () => (
              <IconAnt
                name={'adduser'}
                size={32}
                color={theme.text1}
                onPress={() => navigation.navigate('AvatarCreate')
                }
              />)
          })
        } />
      <Stack.Screen
        name="TabHome"
        component={TabHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AvatarCreate"
        component={AvatarCreateScreen}
        options={
          ({ route, navigation }) => ({
            title: "创建账户",
            ...headerStyleOption,
            headerRight: () => (
              <IconAnt
                name={'qrcode'}
                size={32}
                color={theme.text1}
                onPress={() => navigation.navigate('AvatarCreateFromScanSeedQrcode')
                }
              />)
          })
        } />
      <Stack.Screen
        name="AvatarCreateFromScanSeedQrcode"
        component={AvatarCreateFromScanSeedQrcodeScreen}
        options={
          ({ route, navigation }) => ({
            title: '种子扫描',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="SystemMedia"
        component={SystemMediaScreen}
        options={
          ({ route, navigation }) => ({
            title: "交易媒介",
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="SubjectHolder"
        component={SubjectHolderScreen}
        options={
          ({ route, navigation }) => ({
            title: "持有标的",
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="SubjectIssuer"
        component={SubjectIssuerScreen}
        options={
          ({ route, navigation }) => ({
            title: "签发标的",
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="Offer"
        component={OfferScreen}
        options={
          ({ route, navigation }) => ({
            ...headerStyleOption,
            title: "交易指令",
          })
        } />
      <Stack.Screen
        name="SubjectProclaim"
        component={SubjectProclaimScreen}
        options={
          ({ route, navigation }) => ({
            ...headerStyleOption,
            title: "创建标的"
          })
        } />
      <Stack.Screen
        name="AddressMark"
        component={AddressMarkScreen}
        options={
          ({ route, navigation }) => ({
            title: '用户信息',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="AddressScan"
        component={AddressScanScreen}
        options={
          ({ route, navigation }) => ({
            title: '地址扫描',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="AddressAddFromQrcode"
        component={AddressAddFromQrcodeScreen}
        options={
          ({ route, navigation }) => ({
            title: '扫描二维码标记地址',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="AddressEdit"
        component={AddressEditScreen}
        options={
          ({ route, navigation }) => ({
            title: '编辑用户标记',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="AvatarSeed"
        component={AvatarSeedScreen}
        options={
          ({ route, navigation }) => ({
            title: '！！！查看种子！！！',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="AvatarSeedQrcode"
        component={AvatarSeedQrcodeScreen}
        options={
          ({ route, navigation }) => ({
            title: '！！！种子二维码！！！',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="AvatarNameEdit"
        component={AvatarNameEditScreen}
        options={
          ({ route, navigation }) => ({
            title: '修改昵称',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="SettingMe"
        component={SettingMeScreen}
        headerBackTitle='返回'
        options={
          ({ route, navigation }) => ({
            title: '账户设置',
            ...headerStyleOption,
          })
        } />

      <Stack.Screen
        name="GiveawayScreen"
        component={GiveawayScreenScreen}
        headerBackTitle='返回'
        options={
          ({ route, navigation }) => ({
            title: '免费获赠交易媒介',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="SettingNetwork"
        component={SettingNetworkScreen}
        options={
          ({ route, navigation }) => ({
            title: '网络设置',
            ...headerStyleOption,
          })
        } />
      <Stack.Screen
        name="SettingAddress"
        component={SettingAddressScreen}
        options={
          ({ route, navigation }) => ({
            title: '地址管理',
            ...headerStyleOption,
            headerRight: () => (
              <IconAnt
                name={'qrcode'}
                size={32}
                color={theme.text1}
                onPress={() => navigation.navigate('AddressScan')
                }
              />)
          })
        } />
      <Stack.Screen
        name="SettingSubject"
        component={SettingSubjectScreen}
        options={
          ({ route, navigation }) => ({
            title: '标的管理',
            ...headerStyleOption,
            headerRight: () => (
              <Ionicons
                name={'cash-outline'}
                size={32}
                color={theme.text1}
                onPress={() => navigation.navigate('SubjectProclaim')
                }
              />)
          })
        } />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={
          ({ route, navigation }) => ({
            title: '历史',
            ...headerStyleOption,
          })
        } />
    </Stack.Navigator>
  )
}

export default StackView