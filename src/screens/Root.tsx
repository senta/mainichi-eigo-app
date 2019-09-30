import React, { FC, useState, useEffect } from "react"

import { ThemeProvider } from "emotion-theming"

import { Deck } from "../types/entity"
import { hasResources, loadDeck } from "../lib/AudioResource"

import { darkTheme, lightTheme } from "../components/styled/Theme"
import { Background } from "../components/styled/Background"

import { PlayerView } from "./Player"
import { Resouce } from "./Resource"

export const Root: FC = () => {
  const [theme, setTheme] = useState(darkTheme)

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Router />
      </Background>
    </ThemeProvider>
  )
}

const Router: FC = () => {
  const [has, setHas] = useState(hasResources())

  const deckId = "mock"
  const [deck, setDeck] = useState<Deck | null>(null)

  useEffect(() => {
    const deck = loadDeck(deckId)
    setDeck(deck)
  }, [deckId])

  if (deck) {
    return <PlayerView deck={deck} />
  }

  return <Resouce />
}
