import React, { FC, useState } from "react"
import { View } from "react-native"
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

const Spacer = styled.View`
  height: 140;
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
  const section = sections.find(el => el.id === playback.sectionIndex) || null
  const sentences = section ? section[playback.step] : []

  return (
    <Container>
      <Playlist
        list={sections}
        playingItemIndex={playback.sectionIndex}
        onSelect={onChangeSection}
      />
      <Spacer />
      <View style={{ position: "absolute", bottom: 16, left: 8, right: 8 }}>
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
