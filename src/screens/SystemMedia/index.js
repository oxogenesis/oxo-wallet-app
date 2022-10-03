import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { SYSTEM_MEDIA_RATE } from '../../lib/Const'
import { ThemeContext } from '../../theme/theme-context'
import { styles } from '../../theme/style'

const SystemMediaScreen = (props) => {

  const { theme } = useContext(ThemeContext)

  return (
    <View style={{
      ...styles.base_view,
      backgroundColor: theme.base_view
    }}>
      <Text style={{ color: theme.text1 }}>{`OXO`}</Text>
      <Text style={{ color: theme.text1 }}>{`1标准单位=${SYSTEM_MEDIA_RATE}最小单位`}</Text>
      <Text style={{ color: theme.text1 }}>{`当前持有${props.avatar.get('Balance') * 1.0 / SYSTEM_MEDIA_RATE}个标准单位`}</Text>
      <Text style={{ color: 'grey' }}>
        {`当前持有${props.avatar.get('Balance')}个最小单位`}
      </Text>
      <Text style={{ color: theme.text1 }}>{`当前锁定${props.avatar.get('Reserve') * 1.0 / SYSTEM_MEDIA_RATE}个标准单位`}</Text>
      <Text style={{ color: 'grey' }}>
        {`当前锁定${props.avatar.get('Reserve')}个最小单位`}
      </Text>
    </View >
  )
}

const ReduxSystemMediaScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(SystemMediaScreen)

export default ReduxSystemMediaScreen