import React, { useState } from "react"
import { Text } from "react-native"
import nativeStyled, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"
import { stringifyHLS } from "../../lib/color"

import { Playlist } from "../Playlist/Playlist"
import { PlaybackController } from "../PlaybackController/PlaybackController"
import { Section } from "../../types/entity"

const styled = nativeStyled as Styled<Theme>

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Spacer = styled.View`
  height: 130;
`

const section = (index: number): Section => ({
  id: index,
  title: `Section ${index} - the title can be a very very very long text. It could be like a small novel.`,
  description: "this is description for 1",
  step2: [
    {
      audio: "",
      text: ["Hello world"]
    },
    {
      audio: "",
      text: ["Good morning"]
    },
    {
      audio: "",
      text: ["How are you?"]
    },
    {
      audio: "",
      text: ["How was your trip?"]
    },
    {
      audio: "",
      text: ["Do you enjoy rock and roll?"]
    },
    {
      audio: "",
      text: ["Do your parents live near you?"]
    },
    {
      audio: "",
      text: ["Are you hungly?"]
    }
  ],
  step3: [
    {
      audio: "",
      text: ["Hello world"]
    },
    {
      audio: "",
      text: ["Good morning"]
    },
    {
      audio: "",
      text: ["How are you?"]
    },
    {
      audio: "",
      text: ["How was your trip?"]
    }
  ]
})

const data: Section[] = new Array(30).fill(null).map((_, i) => section(i))

export const Player = () => {
  const [playing, setPlaying] = useState(data[0])

  return (
    <Container>
      <Playlist
        list={data}
        playingItemId={playing.id}
        onSelect={item => setPlaying(item)}
      />
      <Spacer />
      <PlaybackController
        style={{ position: "absolute", bottom: 16, left: 8, right: 8 }}
        section={playing}
      />
    </Container>
  )
}
