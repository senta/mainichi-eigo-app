import React, { FC } from "react"
import styledNative, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"
import { Sentence } from "../../types/entity"
import { stringifyHLS } from "../../lib/color"
import { StyledText } from "../styled/Text"

import { SentenceControl } from "./PhraseControl"
import { MediaPlayButton } from "./MediaPlayButton"

const styled = styledNative as Styled<Theme>

const Container = styled.View`
  padding-vertical: 24;
  padding-horizontal: 16;
  border-radius: 3px;
  background-color: ${({ theme }) =>
    stringifyHLS(
      theme.hsl.background[0],
      theme.hsl.background[1],
      theme.hsl.background[2] + 10,
      0.9
    )};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
`

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8;
`

type Props = {
  sentences: Sentence[]
  activeIndex: number | null
  playing: boolean
  onChange: (index: number) => void
  onTogglePlay: (playing: boolean) => void
}

export const PlaybackController: FC<Props> = ({
  sentences,
  activeIndex = null,
  playing,
  onChange,
  onTogglePlay
}) => {
  const currentSentence = activeIndex != null ? sentences[activeIndex] : null

  return (
    <Container>
      <StyledText size="large" numberOfLines={1}>
        {currentSentence && currentSentence.text}
      </StyledText>
      <ButtonContainer>
        {sentences.map((_, i) => (
          <SentenceControl
            key={i}
            playing={i === activeIndex}
            onPress={() => onChange(i)}
          />
        ))}
        <MediaPlayButton
          playing={playing}
          onPress={() => onTogglePlay(!playing)}
        />
      </ButtonContainer>
    </Container>
  )
}
