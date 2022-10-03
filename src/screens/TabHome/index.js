import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'

import TabWalletScreen from '../TabWallet'
import TabPaymentScreen from '../TabPayment'
import TabTradeScreen from '../TabTrade'
import TabSettingScreen from '../TabSetting'

import IconAnt from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { ThemeContext } from '../../theme/theme-context'


const Tab = createBottomTabNavigator()

//登录后界面
const TabHomeScreen = (props) => {
  const { theme } = useContext(ThemeContext)
  return (
    <Tab.Navigator
      initialRouteName={'TabWallet'}
      backBehavior={'initialRoute'}
      screenOptions={{
        tabBarActiveTintColor: theme.tab_selected_text,
        tabBarInactiveTintColor: theme.tab_text,
        tabBarActiveBackgroundColor: theme.tab_view,
        tabBarInactiveBackgroundColor: theme.tab_view,
        tabBarStyle: [
          {
            display: "flex",
            height: 60
          },
          null
        ]
      }}>
      <Tab.Screen name="TabWallet" component={TabWalletScreen} options={{
        tabBarLabel: '钱包',
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return <IconAnt
            name={'wallet'}
            size={32}
            color={color}
          />
        }
      }} />
      <Tab.Screen name="TabPayment" component={TabPaymentScreen} options={{
        tabBarLabel: '支付',
        headerShown: false,
        tabBarIcon: ({ color, focusd }) => (
          <Ionicons
            name={'cash-outline'}
            size={32}
            color={color}
          />
        )
      }} />
      <Tab.Screen name="TabTrade" component={TabTradeScreen} options={{
        tabBarLabel: '交易',
        headerShown: false,
        tabBarIcon: ({ color, focusd }) => (
          <IconAnt
            name={'sync'}
            size={32}
            color={color}
          />
        )
      }} />
      <Tab.Screen name="TabSetting" component={TabSettingScreen} options={{
        tabBarLabel: '设置',
        headerShown: false,
        tabBarIcon: ({ color, focusd }) => (
          <IconAnt
            name={'setting'}
            size={32}
            color={color}
          />
        )
      }} />
    </Tab.Navigator>
  )
}

const ReduxTabHomeScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(TabHomeScreen)

export default function (props) {
  const navigation = useNavigation()
  const route = useRoute()
  return <ReduxTabHomeScreen{...props} navigation={navigation} route={route} />
}