import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableHighlight
} from "react-native"
import { Audio } from "expo-av"

import eigo from "../../assets/data"
import StatusBarSpacer from "../StatusBarSpacer"
import Player from "../Player"

const playList = eigo.map(el => ({
  ...el,
  data: el.step2.map(item => ({ ...item, section: el.section }))
}))

const SectionHeader = ({ index, title }) => {
  const number = index < 10 ? `0${index}` : index
  return <Text style={styles.header}>{`${number}: ${title}`}</Text>
}

const SectonItem = ({ item, index, playing, onPress }) => {
  let style = styles.item
  if (playing) {
    style = { ...style, ...styles.itemHeighlight }
  }

  return (
    <TouchableHighlight
      onPress={() => onPress(index)}
      underlayColor="#FFFFFF30"
    >
      <View style={style}>
        <Text key={index} style={styles.itemText}>
          {item.en.join("/")}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

class Deck extends React.Component {
  initialState = {
    currentSection: 0,
    currentIndex: 0,
    currentStep: "step2", // step2 or step3
    playing: false
  }
  state = this.initialState
  playbackInstance = null
  sectionList = React.createRef()

  handlePressItem = (section, index) => {
    this.setState(
      {
        currentSection: section - 1,
        currentIndex: index,
        playing: true
      },
      this.playCurrentAudio
    )
  }

  handlePressPlayer = () => {
    this.setState(
      ({ playing }) => ({
        playing: !playing
      }),
      () => {
        const { playing } = this.state
        if (playing) {
          this.playCurrentAudio()
        } else {
          this.stopCurrentAudio()
        }
      }
    )
  }

  handlePlaybackStatusUpdate = status => {
    if (status.didJustFinish) {
      this.playNextAudio()
    }
  }

  playCurrentAudio = async () => {
    await this.stopCurrentAudio()

    const { currentSection, currentIndex } = this.state
    const current = playList[currentSection].data[currentIndex]
    const soundObject = new Audio.Sound()
    this.playbackInstance = soundObject
    try {
      await soundObject.loadAsync(current.audio, { shouldPlay: true })
      soundObject.setOnPlaybackStatusUpdate(this.handlePlaybackStatusUpdate)
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  playNextAudio = () => {
    this.setState(
      ({ currentSection, currentIndex }) => {
        playList[currentSection].data[currentIndex]
        if (currentIndex + 1 <= playList[currentSection].data.length - 1) {
          currentIndex += 1
        } else if (currentSection + 1 <= playList.length - 1) {
          currentIndex = 0
          currentSection += 1
        } else {
          currentIndex = 0
          currentSection = 0
        }

        return {
          currentSection,
          currentIndex
        }
      },
      () => {
        const { currentSection, currentIndex } = this.state
        this.playCurrentAudio()
        // Auto scroll is kinda annoying ... so, let's think a better way
        // this.sectionList.current.scrollToLocation({
        //   animated: true,
        //   itemIndex: currentIndex,
        //   sectionIndex: currentSection
        // })
      }
    )
  }

  stopCurrentAudio = async () => {
    if (this.playbackInstance != null) {
      await this.playbackInstance.stopAsync()
      await this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true
    })
  }

  render() {
    const { currentSection, currentIndex, playing } = this.state
    const current = playList[currentSection].data[currentIndex]

    return (
      <View style={styles.container}>
        <StatusBarSpacer />
        <SectionList
          ref={this.sectionList}
          renderItem={({ item, index, section }) => (
            <SectonItem
              item={item}
              index={index}
              onPress={index => this.handlePressItem(section.section, index)}
              playing={
                playing &&
                index == currentIndex &&
                section.section - 1 == currentSection
              }
            />
          )}
          renderSectionHeader={({ section: { section, title } }) => (
            <SectionHeader title={title} index={section} />
          )}
          sections={playList}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled
        />
        <View style={styles.player}>
          <Player
            title={current.en.join("/")}
            playing={playing}
            onPress={this.handlePressPlayer}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#353745",
    flex: 1
  },
  header: {
    fontSize: 18,
    padding: 8,
    color: "#7B7F8A",
    backgroundColor: "#262626"
  },
  item: {
    borderTopColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  itemHeighlight: {
    backgroundColor: "#74778F"
  },
  itemText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    margin: 18,
    color: "#E3E3E2"
  },
  player: {
    margin: 10,
    marginBottom: 20
  }
})

export default Deck
