import React, { FC, useState } from "react"
import { View, Text } from "react-native"
import nativeStyled, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"

import { Playlist } from "../Playlist/Playlist"
import { PlaybackController } from "../PlaybackController/PlaybackController"
import { Section, Playback } from "../../types/entity"

const styled = nativeStyled as Styled<Theme>

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

type Props = {
  sections: Section[]
  playback: Playback
  onChangeSection: (id: Section["id"]) => void
  onChangeSentence: (index: number) => void
  onTogglePlay: (playing: boolean) => void
}

export const Player: FC<Props> = ({
  sections,
  playback,
  onChangeSection,
  onChangeSentence,
  onTogglePlay
}) => {
  const section = sections[playback.sectionIndex || 0] || null
  const sentences = section ? section[playback.step] : []

  return (
    <Container>
      <View>
        <Text>Here in the title</Text>
      </View>
      <Playlist
        list={sections}
        playingItemIndex={playback.sectionIndex}
        onSelect={onChangeSection}
      />
      <View style={{ width: "100%" }}>
        <PlaybackController
          title={section && section.title}
          sentences={sentences}
          activeIndex={playback.sentenceIndex}
          playing={playback.playing}
          onChange={onChangeSentence}
          onTogglePlay={onTogglePlay}
        />
      </View>
    </Container>
  )
}
