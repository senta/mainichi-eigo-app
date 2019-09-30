import React, { FC } from "react"
import styledNative, { Styled } from "@emotion/native"
import { Text, TouchableOpacity } from "react-native"

import { Theme } from "../../types/app"
import { stringifyHLS } from "../../lib/color"

const styled = styledNative as Styled<Theme>

const DotWrapper = styled.TouchableOpacity`
  padding: 8px;
`

const Dot = styled.View`
  background-color: ${({ theme }) => stringifyHLS(...theme.hsl.foreground)};
  border-radius: 4px;
  width: 8;
  height: 8;
`

type Props = {
  playing: boolean
  onPress: () => void
}

export const SentenceControl: FC<Props> = ({ playing, onPress }) => {
  if (playing) {
    return (
      <TouchableOpacity onPress={onPress}>
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
