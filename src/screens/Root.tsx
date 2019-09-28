import React, { FC, useState } from "react"

import { ThemeProvider } from "emotion-theming"

import { hasResources } from "../lib/AudioResource"

import { PlayerView } from "./Player"
import { Resouce } from "./Resource"
import { Background } from "../components/styled/Background"

import { darkTheme, lightTheme } from "../components/styled/Theme"

export const Root: FC = () => {
  const [has, setHas] = useState(hasResources())
  const [theme, setTheme] = useState(darkTheme)

  return (
    <ThemeProvider theme={theme}>
      <Background>{has ? <PlayerView /> : <Resouce />}</Background>
    </ThemeProvider>
  )
}
