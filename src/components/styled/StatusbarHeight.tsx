import Constants from "expo-constants"
import nativeStyled, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"

const styled = nativeStyled as Styled<Theme>

export const StatusbarHeight = styled.View`
  height: ${Constants.statusBarHeight.toString()};
`
