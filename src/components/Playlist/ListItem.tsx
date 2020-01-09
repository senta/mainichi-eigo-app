import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import styledNative, { Styled } from "@emotion/native"
import { useTheme } from "emotion-theming"
import { Ionicons } from "@expo/vector-icons"

import { Theme } from "../../types/app"
import { Section } from "../../types/entity"
import { stringifyHLS } from "../../lib/color"
import { StyledText } from "../../components/styled/Text"

const styled = styledNative as Styled<Theme>

type ItemProps = {
  section: Section
  isPlaying?: boolean
  onSelect: () => void
}

const ItemContainer = styled.TouchableOpacity`
  height: 48;
  padding-horizontal: 16;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Icon: FC = () => {
  const theme = useTheme() as Theme

  return (
    <View style={{ height: 24 }}>
      <Ionicons
        name="ios-volume-high"
        size={24}
        color={stringifyHLS(...theme.hsl.primary)}
      />
    </View>
  )
}

export const ListItem: FC<ItemProps> = ({
  section,
  isPlaying = false,
  onSelect
}) => {
  return (
    <ItemContainer onPress={onSelect}>
      <>
        <View style={{ flex: 1 }}>
          <StyledText
            style={{ marginRight: isPlaying ? 16 : 0 }}
            size="medium"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {/* TODO: highlight when it's playing (TextNormal, TextPlaying) */}
            {section.title}
          </StyledText>
        </View>
        {isPlaying && <Icon />}
      </>
    </ItemContainer>
  )
}
