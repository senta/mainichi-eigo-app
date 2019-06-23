import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"

const Card = ({ note }) => (
  <View style={styles.container}>
    {note.en.map(txt => (
      <Text style={styles.english}>{txt}</Text>
    ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderRadius: 8
  },
  english: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
})

export default Card
