import styled, { Styled } from "@emotion/native"

import { Theme } from "../../types/app"
import { stringifyHLS } from "../../lib/color"

type Props = {
  size?: keyof Valueof<Pick<Theme, "fontSize">>
  family?: keyof Valueof<Pick<Theme, "fontFamily">>
}

export const StyledText = (styled as Styled<Theme, Props>).Text`
  font-family: ${({ theme, family }) => theme.fontFamily[family || "normal"]};
  font-size: ${({ theme, size }) =>
    theme.fontSize[size || "medium"].toString()};
  color: ${({ theme }) => stringifyHLS(...theme.hsl.foreground)};
`
