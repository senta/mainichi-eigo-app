import React, { Component } from "react"
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native"

const images = {
  play: require("./play.png"),
  pause: require("./pause.png"),
  stop: require("./stop.png")
}

class Player extends Component {
  render() {
    const { title, playing, onPress } = this.props

    return (
      <TouchableHighlight
        style={styles.button}
        onPress={onPress}
        underlayColor="#FFFFFFFF"
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Image
            style={styles.buttonImage}
            source={playing ? images.stop : images.play}
          />
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 30,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "#F6F6F4",
    color: "#7B7F8A",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12
  },
  button: {
    borderRadius: 30
  },
  buttonImage: {
    height: 40,
    width: 40
    // flex: 1,
    // alignSelf: "stretch"
  }
})

export default Player
