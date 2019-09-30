import React, { FC, useState, useEffect, useMemo, useCallback } from "react"

import { Deck, Playback, Section } from "../types/entity"
import { Player } from "../components/Player/Player"

type Props = {
  deck: Deck
}

export const PlayerView: FC<Props> = ({ deck }) => {
  const [section, setSection] = useState<Playback["section"]>(null)
  const [sentence, setSentence] = useState<Playback["sentence"]>(null)
  const [playing, setPlaying] = useState<Playback["playing"]>(false)

  const playback: Playback = useMemo(
    () => ({
      section,
      step: "step2",
      sentence,
      playing
    }),
    [section, sentence, playing]
  )

  const handleChangeSection = useCallback((id: Section["id"]) => {
    setSection(id)
    setSentence(0)
    setPlaying(true)
  }, [])

  const handleChangeSentence = useCallback((index: number) => {
    setSentence(index)
    setPlaying(true)
  }, [])

  return (
    <Player
      sections={deck.section}
      playback={playback}
      onChangeSection={handleChangeSection}
      onChangeSentence={handleChangeSentence}
      onTogglePlay={setPlaying}
    />
  )
}
