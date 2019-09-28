import { Platform } from "react-native"
import { Theme } from "../../types/app"

const common: Pick<Theme, "fontFamily" | "fontSize"> = {
  fontSize: {
    small: 11,
    medium: 15,
    large: 21
  },
  fontFamily: {
    normal: Platform.OS === "ios" ? "System" : "Roboto"
  }
}

export const darkTheme: Theme = {
  ...common,
  hsl: {
    background: [231, 15, 18],
    foreground: [60, 10, 96],
    primary: [210, 79, 46]
  }
}

export const lightTheme: Theme = {
  ...common,
  hsl: {
    background: [60, 10, 96],
    foreground: [231, 15, 18],
    primary: [210, 79, 46]
  }
}
