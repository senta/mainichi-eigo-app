import React from "react"
import { Text } from "react-native"
import nativeStyled, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"
import { stringifyHLS } from "../../lib/color"

import { Playlist } from "../Playlist/Playlist"
import { Section } from "../../types/entity"

const styled = nativeStyled as Styled<Theme>

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
const plyaing = data[7]

export const Player = () => (
  <Container>
    <Playlist
      list={data}
      playingItemId={plyaing.id}
      onSelect={item => console.log(item)}
    />
  </Container>
)
