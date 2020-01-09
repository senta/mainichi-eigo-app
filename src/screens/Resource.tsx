import React from "react"
import { StyleSheet, Text, View } from "react-native"

export function Resouce() {
  return (
    <View style={styles.container}>
      <Text>
        Resouce view
        https://s3.amazonaws.com/shared.senta.me/mainichi13c7c4d24d9a763dca370de67f9542a6/mainichi.zip
        https://s3.amazonaws.com/shared.senta.me/mainichi13c7c4d24d9a763dca370de67f9542a6/sample.zip
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
