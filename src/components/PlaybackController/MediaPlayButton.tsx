import React, { FC } from "react"
import styledNative, { Styled } from "@emotion/native"
import { Text, TouchableOpacity } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useTheme } from "emotion-theming"

import { Theme } from "../../types/app"
import { stringifyHLS } from "../../lib/color"

const styled = styledNative as Styled<Theme>

type Props = {
  playing: boolean
  onPress: () => void
}

export const MediaPlayButton: FC<Props> = ({ playing, onPress }) => {
  const theme = useTheme() as Theme
  const icon = playing ? "controller-paus" : "controller-play"

  return (
    <TouchableOpacity onPress={onPress}>
      <Entypo
        name={icon}
        size={32}
        color={stringifyHLS(...theme.hsl.primary)}
      />
    </TouchableOpacity>
  )
}
