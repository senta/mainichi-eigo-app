import nativeStyled, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"
import { stringifyHLS } from "../../lib/color"

const styled = nativeStyled as Styled<Theme>

export const Background = styled.View`
  flex: 1;
  background-color: ${({ theme }) => stringifyHLS(...theme.hsl.background)};
`
