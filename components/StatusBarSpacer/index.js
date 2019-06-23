import React from "react"
import { StyleSheet, View, Platform } from "react-native"

const StatusBarSpacer = ({ style = {} }) => {
  return <View style={{ ...styles.bar, ...style }} />
}

const styles = StyleSheet.create({
  bar: {
    height: Platform.OS === "ios" ? 36 : 0
  }
})

export default StatusBarSpacer
