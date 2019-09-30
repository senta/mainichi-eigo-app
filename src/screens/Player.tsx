import React, { FC, useState, useEffect, useMemo, useCallback } from "react"

import { Deck, Playback, Section } from "../types/entity"
import { Player } from "../components/Player/Player"
import { deckPlayer } from "../lib/DeckPlayer"

type Props = {
  deck: Deck
}

export const PlayerView: FC<Props> = ({ deck }) => {
  const [playback, setPlayback] = useState<Playback>({
    playing: false,
    sentenceIndex: null,
    sectionIndex: null,
    step: "step2"
  })

  const player = useMemo(() => deckPlayer(deck), [deck])
  const handlePlayerStateChange = useCallback((playback: Playback) => {
    setPlayback(playback)
  }, [])

  useEffect(() => {
    player.on(handlePlayerStateChange)
    return () => {
      player.off(handlePlayerStateChange)
    }
  }, [player])

  const handleChangeSection = useCallback((index: number) => {
    player.setSection(index)
  }, [])

  const handleChangeSentence = useCallback((index: number) => {
    player.setSentence(index)
  }, [])

  const handleTogglePlay = useCallback((playing: boolean) => {
    if (playing) {
      player.play()
    } else {
      player.stop()
    }
  }, [])

  return (
    <Player
      sections={deck.section}
      playback={playback}
      onChangeSection={handleChangeSection}
      onChangeSentence={handleChangeSentence}
      onTogglePlay={handleTogglePlay}
    />
  )
}
