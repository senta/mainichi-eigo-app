import React, { FC, useState, useEffect } from "react"

import { ThemeProvider } from "emotion-theming"

import { Deck } from "../types/entity"
import { hasResources, loadDeck } from "../lib/AudioResource"

import { lightTheme, darkTheme } from "../components/styled/Theme"
import { Background } from "../components/styled/Background"
import { StatusbarHeight } from "../components/styled/StatusbarHeight"

import { PlayerView } from "./Player"
import { Resouce } from "./Resource"

export const App: FC = () => {
  const [theme, setTheme] = useState(lightTheme)

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <StatusbarHeight />
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
