import React, { FC } from "react"
import { FlatList, ListRenderItem } from "react-native"
import styledNative, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"
import { Section } from "../../types/entity"
import { stringifyHLS } from "../../lib/color"

import { ListItem } from "./ListItem"

const styled = styledNative as Styled<Theme>

type Props = {
  list: Section[]
  playingItemId?: number
  onSelect: (item: Section) => void
}

const SectionList = styled(FlatList as new () => FlatList<Section>)`
  flex: 1;
  width: 100%;
`

const ItemSeparator = styled.View`
  border-bottom-color: ${({ theme }) => stringifyHLS(...theme.hsl.foreground)};
  border-bottom-width: 0.5;
`

export const Playlist: FC<Props> = ({ list, playingItemId, onSelect }) => {
  const renderItem: ListRenderItem<Section> = ({ item }) => (
    <ListItem
      section={item}
      onSelect={onSelect}
      isPlaying={item.id === playingItemId}
    />
  )

  return (
    <SectionList
      data={list}
      keyExtractor={item => "" + item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}
