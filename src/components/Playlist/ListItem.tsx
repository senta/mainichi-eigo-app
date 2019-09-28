import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import styled, { Styled } from "@emotion/native"
import { useTheme } from "emotion-theming"
import { Ionicons } from "@expo/vector-icons"

import { Theme } from "../../types/app"
import { Section } from "../../types/entity"
import { stringifyHLS } from "../../lib/color"
import { StyledText } from "../../components/styled/Text"

type ItemProps = {
  section: Section
  isPlaying?: boolean
  onSelect: (item: Section) => void
}

const ItemContainer = (styled as Styled<Theme>).TouchableHighlight`
  padding-vertical: 16;
  padding-horizontal: 16;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Icon: FC = () => {
  const theme = useTheme() as Theme

  return (
    <Ionicons
      name="ios-volume-high"
      size={24}
      color={stringifyHLS(...theme.hsl.foreground)}
    />
  )
}

export const ListItem: FC<ItemProps> = ({
  section,
  isPlaying = false,
  onSelect
}) => {
  return (
    <ItemContainer onPress={() => onSelect(section)} activeOpacity={0.8}>
      <>
        <View style={{ flex: 1 }}>
          <StyledText
            style={{ marginRight: isPlaying ? 16 : 0 }}
            size="medium"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {section.title}
          </StyledText>
        </View>
        {isPlaying && <Icon />}
      </>
    </ItemContainer>
  )
}
