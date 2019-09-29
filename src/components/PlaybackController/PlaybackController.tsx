import React, { FC, useState } from "react"
import styledNative, { Styled } from "@emotion/native"
import { ViewStyle, View, Text, TouchableOpacity } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useTheme } from "emotion-theming"

import { Theme } from "../../types/app"
import { Section } from "../../types/entity"
import { stringifyHLS } from "../../lib/color"
import { StyledText } from "../styled/Text"

const styled = styledNative as Styled<Theme>

type Props = {
  section: Section
  style?: ViewStyle
}

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

type PlayStateProps = {
  playing: boolean
  onPress: () => void
}

const PlayControl: FC<PlayStateProps> = ({ playing, onPress }) => {
  const theme = useTheme() as Theme
  const icon = playing ? "controller-paus" : "controller-play"

  return (
    <TouchableOpacity onPress={onPress}>
      <Entypo
        name={icon}
        size={32}
        color={stringifyHLS(...theme.hsl.foreground)}
      />
    </TouchableOpacity>
  )
}

const Dot = styled.View`
  background-color: ${({ theme }) => stringifyHLS(...theme.hsl.foreground)};
  border-radius: 4px;
  width: 8;
  height: 8;
`

const DotWrapper = styled.TouchableOpacity`
  padding: 8px;
`

const PhraseControl: FC<PlayStateProps> = ({ playing, onPress }) => {
  if (playing) {
    return (
      <TouchableOpacity>
        <Text>🙊</Text>
      </TouchableOpacity>
    )
  }
  return (
    <DotWrapper onPress={onPress}>
      <Dot />
    </DotWrapper>
  )
}

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8;
`

export const PlaybackController: FC<Props> = ({ section, style = null }) => {
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(0)
  const series = section.step2

  const currentPhrase = series[active]

  return (
    <Container style={style}>
      <StyledText size="large" numberOfLines={1}>
        {currentPhrase.text}
      </StyledText>
      <ButtonContainer>
        {series.map((sentence, i) => (
          <PhraseControl
            key={i}
            playing={i === active}
            onPress={() => {
              setActive(i)
            }}
          />
        ))}
        <PlayControl playing={playing} onPress={() => setPlaying(!playing)} />
      </ButtonContainer>
    </Container>
  )
}
